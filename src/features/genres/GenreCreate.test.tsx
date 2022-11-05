import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreCreate } from "./GenreCreate";
import { mockCategories } from "./mocks";

const handlers = [
  rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("all") === "true") {
      return res(ctx.json(mockCategories), ctx.status(200), ctx.delay(150));
    }
  }),
];

const server = setupServer(...handlers);

describe("GenreCreate", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render genre create page", () => {
    const { asFragment } = renderWithProviders(<GenreCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit success", async () => {
    renderWithProviders(<GenreCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Genre created successfully")
      ).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Genre not created")).toBeInTheDocument();
    });
  });
});

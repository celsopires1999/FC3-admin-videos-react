import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreEdit } from "./GenreEdit";
import { mockCategories, mockGenre } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/genres/`, (_, res, ctx) => {
    return res(ctx.json(mockGenre), ctx.delay(150));
  }),
  rest.put(
    `${baseUrl}/genres/f288d0f4-1a6b-42bc-9252-7fcc3b3e94aa`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.delay(150));
    }
  ),
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("all") === "true") {
      return res(ctx.json(mockCategories), ctx.status(200), ctx.delay(150));
    }
  }),
];

const server = setupServer(...handlers);

describe("GenreEdit", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render genre edit page", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Terror");
    });

    fireEvent.change(name, { target: { value: "Comedy" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(
        `${baseUrl}/genres/f288d0f4-1a6b-42bc-9252-7fcc3b3e94aa`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Terror");
    });

    fireEvent.change(name, { target: { value: "Comedy" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre not updated");
      expect(text).toBeInTheDocument();
    });
  });
});

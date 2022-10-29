import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  screen,
  waitFor,
  renderWithProviders,
} from "../../utils/test-utils";
import { CategoryCreate } from "./CategoryCreate";
import { baseUrl } from "../api/apiSlice";

const handlers = [
  rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CategoryCreate", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render category create page", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryCreate />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test description" } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Category created successfully")
      ).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CategoryCreate />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test description" } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Category not created")).toBeInTheDocument();
    });
  });
});

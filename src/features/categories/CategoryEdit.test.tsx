import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CategoryEdit } from "./CategoryEdit";

const category = {
  data: {
    id: "260926c6-4e76-40e0-9170-b9907f0d37b0",
    name: "Category 1",
    description: "Description 1",
    is_active: false,
    deleted_at: null,
    created_at: "2022-01-17 00:44:21",
    updated_at: "2022-01-17 00:44:21",
  },
};

export const handlers = [
  rest.get(`${baseUrl}/categories/`, (_, res, ctx) => {
    return res(ctx.json(category), ctx.delay(150));
  }),
  rest.put(
    `${baseUrl}/categories/260926c6-4e76-40e0-9170-b9907f0d37b0`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

describe("CategoryEdit", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render category edit page", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Success updating category");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(
        `${baseUrl}/categories/260926c6-4e76-40e0-9170-b9907f0d37b0`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    renderWithProviders(<CategoryEdit />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Error updating category");
      expect(text).toBeInTheDocument();
    });
  });
});

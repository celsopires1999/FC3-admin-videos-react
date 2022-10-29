import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CategoryList } from "./CategoryList";
import { categoryResponse, categoryResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),

  rest.delete(
    `${baseUrl}/categories/06fe24ca-71cc-4d55-9a64-82f953501b34`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("CategoryList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render category list page", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<CategoryList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const name = screen.getByText("Docker");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Docker");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);
    await waitFor(() => {
      const name = screen.getByText("LightSlateGray");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Docker");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");

    fireEvent.change(input, { target: { value: "Chocolate" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete category success", async () => {
    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const name = screen.getByText("Docker");
      expect(name).toBeInTheDocument();
    });
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Category deleted successfully");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle delete category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/categories/06fe24ca-71cc-4d55-9a64-82f953501b34`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const name = screen.getByText("Docker");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Category not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});

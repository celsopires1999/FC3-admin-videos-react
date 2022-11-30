import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreList } from "./GenreList";
import { mockGenreResponsePage1, mockGenreResponsePage2 } from "./mocks";

const handlers = [
  rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "1") {
      return res(ctx.json(mockGenreResponsePage1), ctx.delay(150));
    }
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(mockGenreResponsePage2), ctx.delay(150));
    }
  }),

  rest.delete(
    `${baseUrl}/genres/f288d0f4-1a6b-42bc-9252-7fcc3b3e94aa`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("GenreList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render genre list page", () => {
    const { asFragment } = renderWithProviders(<GenreList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<GenreList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText("Terror");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const error = screen.getByText("Error fetching genres");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Terror");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);
    await waitFor(() => {
      const name = screen.getByText("MediumTurquoise");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Terror");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");

    fireEvent.change(input, { target: { value: "Chocolate" } });
    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete category success", async () => {
    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText("Terror");
      expect(name).toBeInTheDocument();
    });
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Genre deleted successfully");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle delete category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/genres/f288d0f4-1a6b-42bc-9252-7fcc3b3e94aa`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const name = screen.getByText("Terror");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Genre not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});

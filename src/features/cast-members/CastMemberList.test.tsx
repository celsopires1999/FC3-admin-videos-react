import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberList } from "./CastMemberList";
import { castMemberResponsePage1, castMemberResponsePage2 } from "./mocks";

const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "1") {
      return res(ctx.json(castMemberResponsePage1), ctx.delay(150));
    }
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(castMemberResponsePage2), ctx.delay(150));
    }
  }),

  rest.delete(
    `${baseUrl}/cast_members/01a20423-248f-48a4-82d6-6b17a11961b8`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("CastMemberList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render cast member list page", () => {
    const { asFragment } = renderWithProviders(<CastMemberList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<CastMemberList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText("Effertz");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const error = screen.getByText("Error fetching cast members");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<CastMemberList />);

    await waitFor(() => {
      const name = screen.getByText("Effertz");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);
    await waitFor(() => {
      const name = screen.getByText("O'Hara");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<CastMemberList />);

    await waitFor(() => {
      const name = screen.getByText("Effertz");
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
    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText("Effertz");
      expect(name).toBeInTheDocument();
    });
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Cast Member deleted successfully");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle delete category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/cast_members/01a20423-248f-48a4-82d6-6b17a11961b8`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<CastMemberList />);
    await waitFor(() => {
      const name = screen.getByText("Effertz");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Cast Member not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});

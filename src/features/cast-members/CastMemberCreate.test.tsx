import { CastMemberCreate } from "./CastMemberCreate";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  screen,
  waitFor,
  renderWithProviders,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";

const handlers = [
  rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CastMemberCreate", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("should render cast member create page", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CastMemberCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Cast Member created successfully")
      ).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CastMemberCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Cast Member not created")).toBeInTheDocument();
    });
  });
});

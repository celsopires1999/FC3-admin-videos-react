import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CastMemberEdit } from "./CastMemberEdit";

const castMember = {
  data: {
    id: "01a20423-248f-48a4-82d6-6b17a11961b8",
    name: "John Doe",
    type: 2,
    deleted_at: null,
    created_at: "2022-01-17 00:44:21",
    updated_at: "2022-09-29 03:12:42",
  },
};

export const handlers = [
  rest.get(`${baseUrl}/cast_members/`, (_, res, ctx) => {
    return res(ctx.json(castMember), ctx.delay(150));
  }),
  rest.put(
    `${baseUrl}/cast_members/01a20423-248f-48a4-82d6-6b17a11961b8`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

describe("CastMemberEdit", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render cast member edit page", () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should handle submit", async () => {
    renderWithProviders(<CastMemberEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("John Doe");
    });

    fireEvent.change(name, { target: { value: "Mary Doe" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast Member updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(
        `${baseUrl}/cast_members/01a20423-248f-48a4-82d6-6b17a11961b8`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<CastMemberEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("John Doe");
    });

    fireEvent.change(name, { target: { value: "Mary Doe" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast Member not updated");
      expect(text).toBeInTheDocument();
    });
  });
});

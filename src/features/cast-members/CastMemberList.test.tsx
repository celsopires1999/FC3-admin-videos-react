import { renderWithProviders } from "../../utils/test-utils";
import { CastMemberList } from "./CastMemberList";

describe("CastMemberList", () => {
  it("should render cast member list page", () => {
    const { asFragment } = renderWithProviders(<CastMemberList />);
    expect(asFragment()).toMatchSnapshot();
  });
});

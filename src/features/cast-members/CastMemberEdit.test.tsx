import { renderWithProviders } from "../../utils/test-utils";
import { CastMemberEdit } from "./CastMemberEdit";

describe("CastMemberEdit", () => {
  it("should render cast member edit page", () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
});

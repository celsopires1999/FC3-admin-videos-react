import { renderWithProviders } from "../../utils/test-utils";
import { CastMemberCreate } from "./CastMemberCreate";

describe("CastMemberCreate", () => {
  it("should render cast member create page", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);
    expect(asFragment()).toMatchSnapshot();
  });
});

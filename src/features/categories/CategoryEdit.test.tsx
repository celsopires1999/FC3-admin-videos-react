import { renderWithProviders } from "../../utils/test-utils";
import { CategoryEdit } from "./CategoryEdit";

describe("CategoryEdit", () => {
  it("should render category edit page", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("should render header correctly", () => {
    const { asFragment } = render(<Header toggle={() => {}} mode={"dark"} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

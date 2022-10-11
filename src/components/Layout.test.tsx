import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("should render layout correctly", () => {
    const { asFragment } = render(<Layout>"Test"</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });
});

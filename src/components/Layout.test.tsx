import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("should render layout correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Layout>"Test"</Layout>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

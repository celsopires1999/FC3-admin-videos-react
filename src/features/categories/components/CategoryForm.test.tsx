import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";

describe("CategoryForm", () => {
  const category = {
    id: "06fe24ca-71cc-4d55-9a64-82f953501b34",
    name: "some name",
    description: "some description",
    is_active: true,
    deleted_at: null,
    created_at: "2022-09-30 14:34:13",
    updated_at: "2022-09-30 14:34:13",
  };
  const Props = {
    category: category,
    isDisabled: false,
    isLoading: false,
    handleSubmit: () => {},
    handleChange: () => {},
    handleToggle: () => {},
  };
  it("should render the category form with data", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render the category form on disabled", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the category form on loading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render the category form without isDisabled and isLoading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={undefined} isLoading={undefined} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

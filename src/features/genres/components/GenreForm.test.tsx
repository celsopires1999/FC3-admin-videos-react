import { renderWithProviders } from "../../../utils/test-utils";
import { mockCategories, mockGenre } from "../mocks";
import { GenreForm, Props as GenreFormProps } from "./GenreForm";

const Props: GenreFormProps = {
  genre: mockGenre.data,
  categories: mockCategories.data,
  isDisabled: false,
  isLoading: false,
  handleSubmit: () => {},
  handleChange: () => {},
};

describe("GenreForm", () => {
  it("should render with data correctly", () => {
    const { asFragment } = renderWithProviders(<GenreForm {...Props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render without data correctly", () => {
    const { asFragment } = renderWithProviders(
      <GenreForm
        {...Props}
        genre={{
          id: "",
          name: "",
          categories: undefined as any,
          deleted_at: "",
          created_at: "",
          updated_at: "",
        }}
        categories={undefined as any}
        isDisabled={undefined as any}
        isLoading={undefined as any}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with loading state", () => {
    const { asFragment } = renderWithProviders(
      <GenreForm {...Props} isLoading />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

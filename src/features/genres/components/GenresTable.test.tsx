import { renderWithProviders } from "../../../utils/test-utils";
import { genreResponsePage1, genreWithoutCategories } from "../mocks";
import { GenresTable, Props as GenresTableProps } from "./GenresTable";

const Props: GenresTableProps = {
  data: genreResponsePage1,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: () => {},
  handleFilterChange: () => {},
  handleOnPageSizeChange: () => {},
  handleDelete: () => {},
};

describe("GenresTable", () => {
  it("should render genres table with empty data", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable {...Props} data={{ data: [], meta: {} } as any} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render genres table with data", () => {
    const { asFragment } = renderWithProviders(<GenresTable {...Props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render genres table with fetching", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable {...Props} isFetching />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render genres table without categories", () => {
    const { asFragment } = renderWithProviders(
      <GenresTable {...Props} data={genreWithoutCategories} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

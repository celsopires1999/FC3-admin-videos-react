import { GridFilterModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoriesTable } from "./CategoriesTable";

describe("CategoriesTable", () => {
  const apiResult = {
    data: [
      {
        id: "06fe24ca-71cc-4d55-9a64-82f953501b34",
        name: "some name",
        description: "some description",
        is_active: true,
        deleted_at: null,
        created_at: "2022-09-30 14:34:13",
        updated_at: "2022-09-30 14:34:13",
      },
      {
        id: "07bcf27a-838e-4a05-a8a3-4c7182b9ec81",
        name: "some name with is_active is false",
        description: "some description with is_active is false",
        is_active: false,
        deleted_at: null,
        created_at: "2022-01-17 00:44:21",
        updated_at: "2022-01-17 00:44:21",
      },
    ],
    links: {
      first: "http://localhost:8000/api/categories?page=1",
      last: "http://localhost:8000/api/categories?page=1",
      prev: null,
      next: "http://localhost:8000/api/categories?page=1",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "http://localhost:8000/api/categories",
      per_page: 15,
      to: 2,
      total: 2,
    },
  };

  const Props = {
    data: apiResult,
    perPage: 10,
    isFetching: false,
    rowsPerPage: [10, 20, 30],
    handleOnPageChange: (page: number) => {},
    handleFilterChange: (filterModel: GridFilterModel) => {},
    handleOnPageSizeChange: (perPage: number) => {},
    handleDelete: (id: string) => {},
  };

  it("should render categories table with data", () => {
    const { asFragment } = render(<CategoriesTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render categories table without data", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={undefined} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render categories table on fetching", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

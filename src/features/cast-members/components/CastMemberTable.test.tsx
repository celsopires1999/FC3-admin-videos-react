import { GridFilterModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMembersTable } from "./CastMembersTable";

describe("CastMembersTable", () => {
  const Props = {
    data: {
      data: [
        {
          id: "01a20423-248f-48a4-82d6-6b17a11961b8",
          name: "Effertz",
          type: 2,
          deleted_at: null,
          created_at: "2022-01-17 00:44:21",
          updated_at: "2022-09-29 03:12:42",
        },
        {
          id: "02cb9153-64fd-46b9-b5fe-38fd2f655d00",
          name: "Dickens",
          type: 1,
          deleted_at: null,
          created_at: "2022-01-17 00:44:21",
          updated_at: "2022-01-17 00:44:21",
        },
      ],
      links: {
        first: "http://localhost:8000/api/cast_members?page=1",
        last: "http://localhost:8000/api/cast_members?page=1",
        prev: null,
        next: "http://localhost:8000/api/cast_members?page=1",
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: "http://localhost:8000/api/cast_members",
        per_page: 15,
        to: 1,
        total: 1,
      },
    },
    perPage: 10,
    isFetching: false,
    rowsPerPage: [10, 20, 30],
    handleOnPageChange: (page: number) => {},
    handleFilterChange: (filterModel: GridFilterModel) => {},
    handleOnPageSizeChange: (perPage: number) => {},
    handleDelete: (id: string) => {},
  };

  it("renders cast member table with data", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders CastMembersTable with fetching", () => {
    const { asFragment } = render(<CastMembersTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders cast member table with empty data", () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} data={{ data: [], meta: {} } as any} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

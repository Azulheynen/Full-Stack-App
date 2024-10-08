import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersApiSlice";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const columns = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "roles", label: "Roles", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

const UserTable = () => {
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery(
    "usersList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const usersArray = Array.isArray(users) ? users : [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;
    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    const rows = usersArray.map((user) => ({
      username: user.username,
      roles: user.roles.toString().replaceAll(",", ", "),
      actions: (
        <IconButton
          color="primary"
          onClick={() => navigate(`/dash/users/${user.id}`)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      ),
    }));

    content = (
      <div className="table-container">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            zIndex: 2,
            backgroundColor: "transparent",
            borderRadius: "10px",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: "calc(80vh - 64px)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,
              backgroundColor: "#f9f8ee",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                style={{
                  borderRadius: " 0  0  10px 10px ",
                  position: "sticky",
                  textalign: "center",
                }}
              >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                      style={{
                        backgroundColor: "#82b1b8",
                        minWidth: column.minWidth,
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontFamily: "Oswald",
                        fontColor: "0c2c53",
                        fontSize: "1.5em",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align || "center"}
                          style={{
                            backgroundColor: "#fefae0",
                            placeContent: "center",
                            borderBottom: "1px solid #ddd",
                            padding: "16px",
                            fontFamily: "Oswald",
                            fontSize: "1.5rem",
                            color: "#014651",
                          }}
                        >
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            sx={{
              backgroundColor: "#82b1b8",
              "& .MuiTablePagination-caption": {
                fontSize: "2rem",
                color: "c6daf2",
              },
              "& .MuiSelect-select": {
                padding: "10px",
              },

              zIndex: 2,
              fontFamily: "Oswald",
              fontSize: "1.5em",
              color: "#0c2c53",
              borderRadius: " 0  0  10px 10px ",
            }}
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
    // }
  }
  return content;
};

export default UserTable;

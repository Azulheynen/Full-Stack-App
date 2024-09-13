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
import { useGetNotesQuery } from "./notesApiSlice"; // Adjust this import based on your file structure

const columns = [
  { id: "status", label: "Status", minWidth: 120 },
  { id: "created", label: "Created", minWidth: 150 },
  { id: "updated", label: "Updated", minWidth: 150 },
  { id: "title", label: "Title", minWidth: 200 },
  { id: "username", label: "Owner", minWidth: 150 },
  { id: "edit", label: "Edit", minWidth: 100 },
];

const NotesList = () => {
  const navigate = useNavigate();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
    const { ids, entities } = notes;

    const rows = ids.map((noteId) => {
      const note = entities[noteId] || {};
      const created = new Date(note.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      const updated = new Date(note.updatedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      return {
        status: note.completed ? (
          <span style={{ color: "green" }}>Completed</span>
        ) : (
          <span style={{ color: "red" }}>Open</span>
        ),
        created,
        updated,
        title: note.title || "N/A",
        username: note.username || "N/A",
        edit: (
          <IconButton
            color="primary"
            onClick={() => navigate(`/dash/notes/${noteId}`)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
        ),
      };
    });

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
            padding: "8em",
            borderRadius: "10px",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: "calc(80vh - 64px)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                style={{
                  borderRadius: " 0  0  10px 10px ",
                  position: "sticky",
                  textalign: "left",
                }}
              >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{
                        backgroundColor: "#82b1b8",
                        minWidth: column.minWidth,
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontFamily: "Oswald",
                        fontSize: "1.5em",
                        color: "#014651",
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
                          align="left"
                          style={{
                            backgroundColor: "#fff",
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
                fontSize: "1.2rem",
                color: "blue",
              },
              "& .MuiSelect-select": {
                padding: "10px",
              },

              zIndex: 2,
              fontFamily: "Oswald",
              fontSize: "1.5em",
              color: "#405f1e",
              borderRadius: " 0  0  10px 10px ",
            }}
            rowsPerPageOptions={[10, 25, 100]}
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
  }

  return content;
};

export default NotesList;

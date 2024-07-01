import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
  },
  deleteButton: {
    zIndex: 1,
  },
}));

function AdminUserTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USER" });
  }, [dispatch]);

  const allUser = useSelector((store) => store.allUser);
  const [editUsername, setEditUsername] = useState("");
  const [editUserAdmin, setEditUserAdmin] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(0);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: "UPDATE_USER",
      payload: {
        id: clickedUserId,
        username: editUsername,
        admin: editUserAdmin,
      },
    });
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleShow = (user) => {
    setShow(true);
    setEditUsername(user.username);
    setEditUserAdmin(user.admin);
    setClickedUserId(user.id);
  };

  // For future feature
  // const handleDelete = (userId) => {
  //   dispatch({ type: 'DELETE_USER', payload: { user: userId } });
  // };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (isAdmin) => {
    setEditUserAdmin(isAdmin);
    setAnchorEl(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Admin</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleShow(user)}
                className={classes.tableRow}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{String(user.admin)}</TableCell>
                {/* For future feature */}
                {/* <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id);
                    }}
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={show} onClose={handleCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <Button onClick={handleMenuClick}>
            Admin: {editUserAdmin ? "True" : "False"}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(editUserAdmin)}
          >
            <MenuItem onClick={() => handleMenuClose(false)}>False</MenuItem>
            <MenuItem onClick={() => handleMenuClose(true)}>True</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminUserTable;

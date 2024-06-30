import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AdminUserTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER' });
  }, [dispatch]);

  const allUser = useSelector((store) => store.allUser);
  const [editUsername, setEditUsername] = useState('');
  const [editUserAdmin, setEditUserAdmin] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(0);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: 'UPDATE_USER',
      payload: { id: clickedUserId, username: editUsername, admin: editUserAdmin },
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

  const handleDelete = (userId) => {
    dispatch({ type: 'DELETE_USER', payload: { user: userId } });
  };

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((user) => (
              <TableRow key={user.id} onClick={() => handleShow(user)}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{String(user.admin)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>
                    Delete
                  </Button>
                </TableCell>
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
            Admin: {editUserAdmin ? 'True' : 'False'}
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

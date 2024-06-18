import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AdminUserTable() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'FETCH_ALL_USER'})
     }, []);
  const allUser = useSelector((store) => store.allUser);
  const [editUsername, setEditUsername] = useState('');
  const [editUserAdmin, setEditUserAdmin] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(0);
  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false);
    dispatch({type: 'UPDATE_USER', payload:{id:clickedUserId, username: editUsername, admin: editUserAdmin }})
  
  };
  const handleCancel = () => {
    setShow(false);

  
  };
  const handleShow = (user) => {
    setShow(true);
  setEditUsername(user.username);
  setEditUserAdmin(user.admin);
  setClickedUserId(user.id)};

     function handleDelete(ingId) {
        console.log(ingId)
        dispatch({type: 'DELETE_USER', payload: {user: ingId} })
     }

  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>username</th>
                <th>password</th>
                <th>admin</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                {allUser.map((user) => <tr  onClick={()=>handleShow(user)} key={user.id}><td>{user.username}</td><td>{user.password}</td><td>{user.admin}</td><td><button onClick={()=> handleDelete(uI.user_ing_id)} >Delete</button></td></tr>)}
               
                
            </tbody>
        </table>
        <p>{editUserAdmin}</p>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          
          <input value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
          <DropdownButton id="dropdown-basic-button" title='Admin'>
      <Dropdown.Item  onClick={(e) => setEditUserAdmin(false)}>False</Dropdown.Item>
      <Dropdown.Item  onClick={(e) => setEditUserAdmin(true)}>True</Dropdown.Item>
     
    </DropdownButton>
      
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
}

export default AdminUserTable;
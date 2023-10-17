import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import EditUserForm from "./components/EditUserForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./hooks/useModal";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    image: "",
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    axios("http://localhost:8082/users")
      .then((response) =>
        response.data.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          image: user.image,
        }))
      )
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const editUser = (user) => {
    setEditing(true);
    toggle();
    setCurrentUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      image: user.image,
      phone: user.phone
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    toggle();
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {editing ? (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <EditUserForm
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          }
        />
      ) : (<div></div>
      )}
      <UserList
        users={currentUsers}
        editUser={editUser}
        deleteUser={deleteUser}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </>
  );
};

export default App;

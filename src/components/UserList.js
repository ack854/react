import React, { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const UserList = (props) => {
  const { state } = useLocation();
  console.log(state);
  console.log("toast");
  useEffect(() => {
    if (state && state.isUpdated) {
      toast.success("User updated sucessfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, []);
  const navigate = useNavigate();
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { editUser, deleteUser } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  const goToEdit = (user) => {
    console.log("edit", user);
    navigate("/edit", { state: { user: user } });
  };

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table style={{ background: "#b9b9b9", marginTop: "10px" }}>
          <thead style={{ background: "#ffffff" }}>
            <tr>
              <th></th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("firstName")}
                  className={getClassNamesFor("firstName")}
                >
                  First Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("lastName")}
                  className={getClassNamesFor("lastName")}
                >
                  Last Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("username")}
                  className={getClassNamesFor("username")}
                >
                  Username
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  Email
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("phone")}
                  className={getClassNamesFor("phone")}
                >
                  Phone
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.image}
                      alt={user.firstName + " " + user.lastName}
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <IconButton
                      style={{ color: "#247ba0" }}
                      aria-label="edit"
                      onClick={() => {
                        editUser(user);
                        goToEdit(user);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      style={{ color: "#e33838" }}
                      aria-label="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Users</td>
              </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserList;

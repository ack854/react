import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [user, setUser] = useState(state.user);

  useEffect(() => {
    setUser(state.user);
  }, [state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const updateUser = (id, user) => {
    console.log(user);
    axios
      .put(`http://localhost:8082/users/${id}`, user)
      .then((response) => (response.status === 200 ? 
            navigate('/', { state: { isUpdated: true} }) : null));
  };

  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20%",
    paddingRight: "20%" }}>
      <form
        onSubmit={(event) => {
          console.log(user);
          event.preventDefault();
          updateUser(user.id, user);
        }}
      >
        <div className="form-group">
          <h2 style={{backgroundColor:'#dddddd', textAlign:'center'}}>Edit User</h2>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            pattern="[a-zA-Z]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            pattern="[a-zA-Z]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            pattern="[a-zA-Z0-9\-]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button style={{ cursor: "pointer" }} className="modal-button">
          Update user
        </button>
      </form>
    </div>
  );
};

export default EditUser;

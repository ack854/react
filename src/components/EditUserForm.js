import React, { useState, useEffect } from "react";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        console.log(user);
        event.preventDefault();
        props.updateUser(user.id, user);
      }}
    >
      <div className="form-group">
        <h2>Edit User</h2>
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
          pattern="[a-zA-Z0-9-]+"
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
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
      <button className="modal-button">Update user</button>
    </form>
  );
};

export default EditUserForm;

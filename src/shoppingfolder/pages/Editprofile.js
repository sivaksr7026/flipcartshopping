import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Editprofile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`https://shoopingbackend.azurewebsites.net/employees/edit/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.data;
        setValues({
          username: user.username, 
          email: user.email,
          phone: user.phone,
        });
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `https://shoopingbackend.azurewebsites.net/employees/update/${id}`,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Profile updated successfully", {
      closeButton: false,
    });

    navigate("/profile");
  } catch (error) {
    if (error.response) {
      toast.error(
        error.response.data.message || "Email already exists",
        { closeButton: false }
      );
      navigate(`/edit/${id}`);
    } else {
      toast.warning(
        "Technical server issue. Please try again later",
        { closeButton: false }
      );
    }

    navigate(`/edit/${id}`);
  }
};

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Edit account</h2>

        <input
          type="text"
          placeholder="Enter UserName"
          value={values.username}
          onChange={(e) =>
            setValues({ ...values, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={values.email}
          onChange={(e) =>
            setValues({ ...values, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Enter PhoneNumber"
          value={values.phone}
          onChange={(e) =>
            setValues({ ...values, phone: e.target.value })
          }
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Editprofile;

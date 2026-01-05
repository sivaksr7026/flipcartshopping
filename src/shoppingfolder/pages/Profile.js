import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  //console.log('token',token)
  //console.log('loggedUser',loggedUser)

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
   

    if (loggedUser.role === "admin") {
      fetchEmployees();
    } else {
      fechprofile();
     // setEmployees([loggedUser]);
    }
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "https://shoopingbackend.azurewebsites.net/employees/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(res.data);
      //console.log(employees)
    } catch {
      //toast.error("Invalid token");
    }
  };


  const fechprofile = async () => {
    try {
      const res = await axios.get(
        "https://shoopingbackend.azurewebsites.net/employees/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees([res.data]);
    } catch {
      //toast.error("Invalid token");
    }
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this profile?")) return;

  try {
    await axios.delete(
      `https://shoopingbackend.azurewebsites.net/employees/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Profile deleted successfully", {
      closeButton: false,
    });

    // Remove deleted employee from state
    setEmployees(prevEmployees =>
      prevEmployees.filter(employee => employee._id !== id)
    );

  } catch (error) {
    toast.error("Profile delete failed", {
      closeButton: false,
    });
  }
};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
   if (!loggedUser) return <h2>No user logged in</h2>;

   

  return (
    <div className="">
      <div className="container">
       <button className="btn create-btn" onClick={handleLogout}>
          Logout
        </button>
        <h2>
          {loggedUser.role === "admin"
            ? "Employee List"
            : "My Profile"}
        </h2>

       
      </div>
     <div className="">
      <table className="crud-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && <h2>No data found</h2>}

          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.username}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.role}</td>
              <td>
                <Link to={`/edit/${emp._id}`}>
                  <button className="btn edit-btn">Edit</button>
                </Link>

                {loggedUser.role === "admin" && (
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
  
};

export default Profile;

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [modalSubmit, setModalSubmit] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/employees");
        setData(res.data);
      } catch (err) {
        console.log(err);
        setMessage("Error fetching employees");
      }
    };
    fetchData();
  }, [modalEdit, modalSubmit]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/new-employee", {
        name,
        email,
        department,
      });
      setName("");
      setEmail("");
      setDepartment("");
      setModalSubmit(false);
      setMessage("User Created");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      // Refetch data to reflect the new employee
      const res = await axios.get("http://localhost:8080/api/employees");
      setData(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Error creating user");
    }
  };

  const handleEdit = async (id) => {
    try {
      // Fetch the employee data by id
      const response = await axios.get(
        `http://localhost:8080/api/employee/${id}`
      );
      const { name, email, department } = response.data; // Assuming your API returns employee details

      // Update state with the fetched data and open the edit modal
      setName(name);
      setEmail(email);
      setDepartment(department);
      setEditId(id); // Set the editId to keep track of which employee is being edited
      setModalEdit(true); // Ensure modalEdit is set to true to open the edit modal
    } catch (err) {
      console.log(err);
      setMessage("Error fetching user for editing");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/update-employee/${editId}`, {
        name,
        email,
        department,
      });
      setMessage("User Updated");
      setName("");
      setEmail("");
      setDepartment("");
      setModalEdit(false); // Close the edit modal after successful update
      setTimeout(() => {
        setMessage("");
      }, 3000);
      // Refetch data to reflect the changes
      const res = await axios.get("http://localhost:8080/api/employees");
      setData(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Error updating user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-employee/${id}`);
      setMessage("User Deleted");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      // Refetch data to reflect the deletion
      const res = await axios.get("http://localhost:8080/api/employees");
      setData(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Error deleting user");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-xl p-3 text-white bg-blue-800">
          Employee Management Platform
        </h1>
      </div>
      {message && <p className="text-center">{message}</p>}
      <div className="p-5">
        <button
          className="text-lg p-2 rounded rounded-3xl bg-green-300"
          onClick={() => setModalSubmit(true)}
        >
          Add Employee
        </button>
        {modalSubmit && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <div className="w-96 border rounded-md p-1 border-gray-800 bg-amber-100">
                <h1 className="text-center bg-amber-200">
                  Enter Employee Details
                </h1>
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleCreate}
                >
                  <div className="p-1 flex justify-between">
                    <label>Employee Name : </label>
                    <input
                      type="text"
                      value={name}
                      className="border border-gray-400 pl-3  w-56 rounded-xl"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="p-1 flex justify-between">
                    <label>Employee Email : </label>
                    <input
                      type="text"
                      value={email}
                      className="border border-gray-400 pl-3  w-56 rounded-xl"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="p-1 flex justify-between">
                    <label>Employee Dept. : </label>
                    <input
                      type="text"
                      value={department}
                      className="border border-gray-400 pl-3 w-56 rounded-xl"
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 p-2 w-40 rounded-3xl text-white"
                  >
                    Create Employee
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 p-2 w-40 rounded-3xl mt-2 text-white"
                    onClick={() => setModalSubmit(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
        {modalEdit && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <div className="w-96 border rounded-md p-1 border-gray-800 bg-amber-100">
                <h1 className="text-center bg-amber-200">
                  Edit Employee Details
                </h1>
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleSubmitEdit}
                >
                  <div className="p-1 flex justify-between">
                    <label>Employee Name : </label>
                    <input
                      type="text"
                      value={name}
                      className="border border-gray-400 pl-3  w-56 rounded-xl"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="p-1 flex justify-between">
                    <label>Employee Email : </label>
                    <input
                      type="text"
                      value={email}
                      className="border border-gray-400 pl-3  w-56 rounded-xl"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="p-1 flex justify-between">
                    <label>Employee Dept. : </label>
                    <input
                      type="text"
                      value={department}
                      className="border border-gray-400 pl-3 w-56 rounded-xl"
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 p-2 w-40 rounded-3xl text-white"
                  >
                    Update Employee
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 p-2 w-40 rounded-3xl mt-2 text-white"
                    onClick={() => setModalEdit(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <table className="min-w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 p-2">Name</th>
              <th className="border border-gray-800 p-2">Email</th>
              <th className="border border-gray-800 p-2">Department</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.id} className="bg-amber-100">
                <td className="border border-gray-800 p-2 text-center">
                  {emp.name}
                </td>
                <td className="border border-gray-800 p-2 text-center">
                  {emp.email}
                </td>
                <td className="border border-gray-800 p-2 text-center">
                  {emp.department}
                </td>
                <td className="border border-gray-800 p-2 text-center">
                  <button
                    className="bg-gray-600 border rounded-md border-gray-800 p-2 text-white"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 border rounded-md border-gray-800 p-2 text-white ml-2"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

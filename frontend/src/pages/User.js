import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    assignedTo: ""
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  };

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // 🔥 Create Task (FULL FIXED)
  const createTask = async () => {
    console.log("FORM DATA 👉", form); // ✅ debug

    // ✅ Validation
    if (!form.title || !form.description || !form.priority || !form.assignedTo) {
      alert("Please fill ALL fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/tasks", form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("SUCCESS 👉", res.data);

      alert("Task created successfully 🎉");

      // reset form
      setForm({
        title: "",
        description: "",
        priority: "",
        assignedTo: ""
      });

      fetchTasks();

    } catch (err) {
      console.log("ERROR 👉", err.response?.data); // ✅ real backend error
      alert(err.response?.data?.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

          {/* Create Task Form */}
          <div style={{
            background: "#1e1e2f",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 0 15px #7b2cbf",
            marginBottom: "30px"
          }}>
            <h3><FaPlus /> Create Task</h3>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e)=>setForm({...form, title:e.target.value})}
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e)=>setForm({...form, description:e.target.value})}
            />

            <select
              value={form.priority}
              onChange={(e)=>setForm({...form, priority:e.target.value})}
            >
              <option value="">Select Priority</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            {/* Users Dropdown */}
            <select
              value={form.assignedTo}
              onChange={(e)=>setForm({...form, assignedTo:e.target.value})}
            >
              <option value="">Select User</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Button */}
            {user?.role !== "employee" && (
              <button onClick={createTask} disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
              </button>
            )}
          </div>

          {/* Task List */}
          <h3>My Tasks</h3>

          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
                  padding: "15px",
                  margin: "10px 0",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px #7b2cbf"
                }}
              >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
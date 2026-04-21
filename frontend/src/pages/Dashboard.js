import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard({ theme, setTheme }) {
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    assignedTo: ""
  });

  // 🔹 FETCH TASKS
  const fetchTasks = async () => {
    const res = await API.get("/tasks/my", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  // 🔹 FETCH USERS
  const fetchUsers = async () => {
    const res = await API.get("/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // 🔹 CREATE TASK
  const createTask = async () => {
    if (!form.title || !form.assignedTo) {
      alert("Fill required fields");
      return;
    }

    await API.post("/tasks", form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setForm({
      title: "",
      description: "",
      priority: "",
      assignedTo: ""
    });

    fetchTasks();
  };

  // 🔥 DAY 5: UPDATE STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchTasks();
  };

  // 🔥 DAY 5: DELETE TASK
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchTasks();
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar theme={theme} />

      {/* Main */}
      <div
        style={{
          flex: 1,
          background: theme === "dark" ? "#0f0f1a" : "#f5f5f5",
          color: theme === "dark" ? "white" : "black",
          minHeight: "100vh"
        }}
      >
        <Navbar theme={theme} setTheme={setTheme} />

        <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
          <h2>Dashboard</h2>

          {/* FORM */}
          <div
            style={{
              background: theme === "dark" ? "#1e1e2f" : "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "30px"
            }}
          >
            <h3>Create Task</h3>

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
              <option value="">Priority</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>

            <select
              value={form.assignedTo}
              onChange={(e)=>setForm({...form, assignedTo:e.target.value})}
            >
              <option>Select User</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <button onClick={createTask}>Create Task</button>
          </div>

          {/* TASKS */}
          <h3>My Tasks</h3>

          {tasks.map(task => (
            <div
              key={task._id}
              style={{
                background: theme === "dark" ? "#1e1e2f" : "#ffffff",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "10px"
              }}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>

              {/* 🔥 DAY 5 BUTTONS */}
              <div style={{ marginTop: "10px" }}>
                
                {/* Update Status */}
                <button onClick={() => updateStatus(task._id, "completed")}>
                  Mark Completed
                </button>

                {/* Delete */}
                <button 
                  onClick={() => deleteTask(task._id)}
                  style={{ marginLeft: "10px", background: "red" }}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
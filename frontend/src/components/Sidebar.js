import { FaTasks, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar({ theme }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: theme === "dark" ? "#0f0f1a" : "#f0f0f0",
        color: theme === "dark" ? "white" : "black",
        padding: "20px"
      }}
    >
      <h2 style={{ color: "#9d4edd" }}>TaskManager</h2>

      <div
        onClick={() => navigate("/dashboard")}
        style={{ margin: "20px 0", cursor: "pointer" }}
      >
        <FaTasks /> Tasks
      </div>

      <div
        onClick={() => navigate("/users")}
        style={{ cursor: "pointer" }}
      >
        <FaUsers /> Users
      </div>
    </div>
  );
}

export default Sidebar;
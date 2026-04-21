import { useNavigate } from "react-router-dom";

function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: theme === "dark" ? "#1a1a2e" : "#ffffff",
        color: theme === "dark" ? "white" : "black",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={{ color: "#9d4edd" }}>TaskManager</h3>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
        {/* 🌙 THEME BUTTON */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            background: "#7b2cbf",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          {theme === "dark" ? "🌙" : "☀"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            background: "#ff4d6d",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await API.post("/auth/register", form);
    alert("Registered!");
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})} />

        <input placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})} />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
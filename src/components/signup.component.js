import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export default function SignUp() {
    const [regError, setRegError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    console.log(email, password);

    useEffect(() => {
      if (localStorage.getItem("token")) navigate("/home");
    }, []);

    const HandleRegister = async (e) => {
      e.preventDefault();

      try {

        const request = await fetch("https://autumn-delicate-wilderness.glitch.me/v1/auth/register", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email: `${email}`,
            password: `${password}`,
          })
        });

        const response = await request.json();
        (request.status === 200) ? navigate("/home") : setRegError(response.message);


        console.log(response);


      } catch(err) {
          console.log(err);
          setRegError("Something went wrong");
      }
    }



    return (
      <form onSubmit={HandleRegister}>
        <h3>Sign Up</h3>
        {regError && <p>{regError}</p>}

        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" onChange={text => setEmail(text.target.value)} placeholder="Enter email"/>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" onChange={text => setPassword(text.target.value)} placeholder="Enter password"/>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>

        <p className="forgot-password text-right">Already registered <a href="/sign-in">sign in?</a></p>

      </form>
    )
  }
// }

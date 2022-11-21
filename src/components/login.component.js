import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, []);

  const HandleLogin = async (e) => {
    e.preventDefault();

    try {

      const request = await fetch("https://autumn-delicate-wilderness.glitch.me/v1/auth/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        })
      });

      const response = await request.json();
      (request.status === 200) ? console.log(response) : setLoginError(response.message);

      const token = response.token;
      const success = response.msg;

      if (token && success) {
          localStorage.setItem("token", token);
          navigate("/home");
      }


    } catch(err) {
        console.log(err);
        setLoginError("Something went wrong");
    }
  }



  
    return (
      <form onSubmit={HandleLogin}>
        <img src="LogoCA.png"alt="Ca LOGO" width={'500px'}></img>
        <h3>Sign In</h3>
        {loginError && <p>{loginError}</p>}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(text) => setEmail(text.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(text) => setPassword(text.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="/">password?</a>
        </p>
      </form>
    )
  }

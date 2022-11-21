import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();
    
    const HandleLogout = () => {
        localStorage.removeItem("token");
        navigate("/sign-in");
    };

   
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/sign-in");
        }
    }, []);

    return (
       <div>
       <div style={{ padding: "10px 20px", textAlign: "center", color: "white"}}>
              <h1 style={{ padding: "30px 20px", textAlign: "center", color: "Green"}}>Home Page</h1>
              <button style={{ padding: "10px 20px", itemsAlign: "center", color: "black"}} onClick={HandleLogout}>Sign Out</button>
       </div>
       </div>
       
    )
  }
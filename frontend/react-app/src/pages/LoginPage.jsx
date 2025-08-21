import React, {useState} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function LoginPage(){
    const [form,setForm] = useState({
        username: '',
        password: ''
    })
    const [message,setMessage]  = useState('')
    const navigate = useNavigate();
    
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setForm((f )=> ({...f,[name]:value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
         try {
           const response = await api.post('token/',form)
           const access = response.data.access;
           const refresh = response.data.refresh;
           localStorage.setItem('accessToken', access);
           localStorage.setItem('refreshToken', refresh);
           setMessage('Login Successfull');
           setTimeout(() => {
           navigate('/');
         }, 2000);
        } catch (error) {
            console.error(error);
            alert("Login Failled")
            setMessage("Invalid creditials")
        }
    }

    return(
        <>
          <div>
      <h2>Login here</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}

    </div>

        </>
    );
}
export default LoginPage;
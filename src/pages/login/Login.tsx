import { useState } from "react";
import "./login.scss";
import { Button, Checkbox, Input } from "antd";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { wordFormatter } from "@/utils/helpers";
import useNotification from "@/hooks/useNotification";
import userApis from "@/apis/userApis";

const Login = () => {
  document.title = 'Login'
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {notifySuccess, notifyError} = useNotification()
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  async function handleUserLogin(){
    setLoading(true)
    try {
      const response = await userApis.loginUser('/login', formData)
      localStorage.setItem('token',response.data.token)
      navigate('/users-list')
      notifySuccess('Login Successful')
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      notifyError(wordFormatter(err?.response?.data.error as string))
    }finally{
      setLoading(false)
    }
  }

  function handleForm(e: { target: { name: string; value: string; }; }){
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  return (
    <section className="login-page">
      <div className="login-container">
        <Input
          placeholder="Email"
          prefix={<i className="flex items-center fi fi-rs-user"></i>}
          name="email"
          onChange={handleForm}
        />
        <Input.Password
          placeholder="Password"
          prefix={<i className="flex items-center fi fi-rr-lock"></i>}
          name="password"
          onChange={handleForm}
        />
        <Checkbox>Remember Me</Checkbox>
        <Button className="login-btn" onClick={handleUserLogin} loading={loading} disabled={!formData.email || !formData.password}>Log in</Button>
      </div>
    </section>
  );
};

export default Login;

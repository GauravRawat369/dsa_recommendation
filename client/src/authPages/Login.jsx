import React , {useState}from 'react'
import { Link } from "react-router-dom";
import '../App.css'
import {
  Form,
  FormGroup,
  FormItem,
  Input,
  Label,
  Button,
} from "@ui5/webcomponents-react";
import useLogin from '../hooks/useLogin.js';
const Login = () => {
    const [inputs,setInputs] = useState({
        email:'',
        password:''
    })
    const {loading,login} = useLogin()
    const HandleSubmit =async (e) => {
        e.preventDefault();
        console.log(inputs);
        await login(inputs)
    }
  return (
    <div className='Login-page'>
        <div className='login-details'>
        <Form
  headerText="Login Page"
      labelSpan="S12 M4 L4 XL4"
  layout="S1 M1 L2 XL2"
>
  <FormGroup headerText="Personal Data">
    <FormItem labelContent={<Label>Email</Label>}>
      <Input 
        type="email"
        required
        value={inputs.email}
              onChange={(e) => setInputs({...inputs, email: e.target.value})}
      />
    </FormItem>
    <FormItem labelContent={<Label>Password</Label>}>
      <Input
        type="password"
        required
        value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
      />
    </FormItem>
    <FormItem>
            <Link to="/auth/signup" style={{ textDecoration: "none" }}>
              Create new account?
            </Link>
          </FormItem>
  </FormGroup>
</Form>
<Button
        design="Emphasized"
        onClick={HandleSubmit}
        style={{
          width: "200px",
          marginLeft: "20px",
        }}
      >
        Submit
      </Button>
        </div>
        <div className="company-logo">

        </div>
      </div>
  )
}

export default Login
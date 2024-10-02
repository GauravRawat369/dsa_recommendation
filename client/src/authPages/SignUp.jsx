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
import useSignup from '../hooks/useSignup.js';
const SignUp = () => {
    const [inputs,setInputs] = useState({
        username: "",
        email:'',
        password:''
    })
    const {loading,signup} = useSignup();
    const HandleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs)
    }
  return (
    <div className='Login-page'>
        <div className='login-details'>
        <Form
  headerText="SignUp Page"
      labelSpan="S12 M4 L4 XL4"
  layout="S1 M1 L2 XL2"
>
  <FormGroup headerText="Personal Data">
  <FormItem labelContent={<Label>Name</Label>}>
      <Input 
        type="text"
        required
        value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
      />
    </FormItem>
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
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              Already have account?
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

export default SignUp
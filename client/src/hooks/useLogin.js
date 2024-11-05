import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';
const useLogin = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext() 
    const login =async ({email,password})=>{
        const success = handleInputErrros({email,password})
        if(!success)return;
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/login`,{email,password})
            const data = res.data;
            if(data.error){
                throw new Error(data.error)
            }
            //setting user data to localStorage
            localStorage.setItem("Dsa-user",JSON.stringify(data))
            setAuthUser(data)
            toast.success('Login Successfull')
        } catch (error) {
            console.log("Error in useLogin hook : ",error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,login}
}
export default useLogin;


function handleInputErrros({email,password}){
    if(!email || !password)
    {
        console.log("incomplete input")
        toast.error("Please fill all the fields")
        return false;
    }
    return true;
}
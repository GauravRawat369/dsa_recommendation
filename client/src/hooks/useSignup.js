import  { useState } from 'react'
// import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext() 
    const signup =async ({username,email,password})=>{
        const success = handleInputErrros({username,email,password})
        if(!success)return;
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/signup`,{username,email,password})
            const data = res.data;
            console.log(data)
            if(data.error){
                throw new Error(data.error)
            }
            //setting user data to localStorage
            localStorage.setItem("Dsa-user",JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            console.log("Error in useSignup hook : ",error)
            // toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,signup}
};

export default useSignup

function handleInputErrros({username,email,password}){
    if(!username || !email || !password)
    {
        // toast.error("Please fill all the fields")
        console.log("incomplete input")
        return false;
    }
    return true;
}
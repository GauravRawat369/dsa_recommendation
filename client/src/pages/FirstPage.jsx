import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import leetcode from '../assets/leetcode.png'
import gfg from '../assets/gfg.png'
import codingninja from '../assets/codingninja.png'
const FirstPage = () => {
  const navigate = useNavigate();
  return (
    <div className='first-page'>
        <div >
        <img src={leetcode} style={{height:"100px"}} alt="" /> 
        <img src={gfg} style={{height:"100px",margin:"0 15px"}} alt="" /> 
        <img src={codingninja} style={{height:"100px"}} alt="" /> 
      </div>
      <h1>Practice DSA in a best way</h1>
      <div className="card">
        <button onClick={() => {navigate('/home')}}>
          Start Coding
        </button>
        <p>
          Master your weak area's and get report 
        </p>
      </div>
      <p className="read-the-docs">
        Love Babbar + Striver + Appna College + Arsh
      </p>
    </div>
  )
}
export default FirstPage
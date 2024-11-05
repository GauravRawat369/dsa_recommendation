
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserProgress } from '../context/UserProgressContext.jsx';
import  toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
  const { state, dispatch } = useUserProgress(); // Access global state and dispatch
  const [question, setQuestion] = useState(null);
  const [attempts, setAttempts] = useState('');

  // Fetch the first question when the component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Function to fetch the next question
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/next-question`, {
        params: { userId: state.userId }
      });
      setQuestion(res.data);
    } catch (error) {
      console.error("Error fetching the question", error);
    }
  };

  // Function to submit the number of attempts and fetch the next question
  const submitAttempts = async () => {
    if (!attempts) {
      toast.error('Please enter the number of attempts.');
      return;
    }
    else if(attempts <= 0){
      toast.error('Number of attempts cannot be negative or zero.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/questions/submit-attempts', {
        userId: state.userId,
        questionId: question.id,  // Assuming each question has a unique 'id' field
        attempts: parseInt(attempts)
      });
      const data = res.data;
      if(data.error){
        throw new Error(data.error)
      }
      toast.success("successfully submitted")

      // Update the global state with the solved question
      dispatch({
        type: 'ADD_SOLVED_QUESTION',
        payload: { questionId: question.id, attempts: parseInt(attempts) }
      });

      // Update weak areas in global state
      dispatch({
        type: 'UPDATE_WEAK_AREAS',
        payload: { topic: question.topic, attempts: parseInt(attempts) }
      });

      // Clear input and fetch next question
      setAttempts('');
      fetchQuestion();
    } catch (error) {
      console.error("Error submitting attempts", error);
    }
  };

  return (
    <div className='problem-page'>
      {question && (
        <div className='problem-page-sub-div'>
          <h3>{question.problem}</h3>
          <a href={question.link} target="_blank" rel="noopener noreferrer">
            Solve this problem
          </a>
          <br />
          <input 
          style={{
            width:"300px",
            height:"30px",
            background:"black",
            color:"white",
            margin:"15px 5px",
            border: "2px solid white",
            padding:"5px 5px",
          }}
            type="number" 
            value={attempts} 
            onChange={(e) => setAttempts(e.target.value)} 
            placeholder="Enter attempts" 
          />
          <button onClick={submitAttempts}>Submit</button>
          <Toaster
        position="top-center"
        reverseOrder={false}
      />
        </div>
      )}
    </div>
  );
};

export default HomePage;

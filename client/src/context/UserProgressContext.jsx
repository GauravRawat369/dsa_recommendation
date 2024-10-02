import React, { createContext, useContext, useReducer } from 'react';

// Initial state for user progress
const initialState = {
  userId: '123',
  solvedQuestions: [],
  totalSolved: 0,
  weakAreas: {}
};

// Create a context
const UserProgressContext = createContext();

// Define actions for state management
const userProgressReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SOLVED_QUESTION':
      return {
        ...state,
        solvedQuestions: [...state.solvedQuestions, action.payload],
        totalSolved: state.totalSolved + 1
      };
    case 'UPDATE_WEAK_AREAS':
      return {
        ...state,
        weakAreas: {
          ...state.weakAreas,
          [action.payload.topic]: (state.weakAreas[action.payload.topic] || 0) + action.payload.attempts
        }
      };
    default:
      return state;
  }
};

// Create a provider component
export const UserProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userProgressReducer, initialState);

  return (
    <UserProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </UserProgressContext.Provider>
  );
};

// Custom hook to use user progress state
export const useUserProgress = () => useContext(UserProgressContext);

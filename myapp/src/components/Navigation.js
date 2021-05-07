import React from 'react';
 
import { NavLink } from 'react-router-dom';
import './styles.css'
 
const Navigation = () => {
    return (
       <div className = "NavBar">
          <NavLink className = "NavLink" to="/CreateQuiz">Create Quiz</NavLink>
          {/* <NavLink className = "NavLink" to="/SubmitQuiz/:id">Submit Quiz</NavLink> */}
          <NavLink className = "NavLink" to="/SummaryAll">Summary of All Quizzes</NavLink>
          <NavLink className = "NavLink" to="/SummaryOne">Summary of a Quiz</NavLink>
       </div> 
       );
}
 
export default Navigation;
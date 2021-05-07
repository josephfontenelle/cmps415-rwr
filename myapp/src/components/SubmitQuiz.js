import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const SubmitQuiz = ({match}) => {

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [studentName, setStudentName] = useState(""); 
    
  

  // axios get
  const [quiz, setQuiz] = useState({});

  // change to true when all the data is finally loaded into DOM
  const [quizIsLoaded, setQuizIsLoaded] = useState(false);
  
  // change to true if api returns an error. eg 404 not found
  const [quizError, setQuizError] = useState(false);

  useEffect(() => {
      getQuiz();
  }, [])

  const getQuiz = () => {
      axios.get(`http://localhost:8080/quiz/${match.params.id}`)
      .then((response) => {
          setQuiz(response.data.quiz);
          setQuizIsLoaded(true);
      })
      .catch(error => {
          console.log(error);
          // change quizError state to true because there was an error
          setQuizError(true);
      })
  }

  // return 'loading...' if data is still being fetched from backend. 
  if(!quizIsLoaded) {
      return <div>Loading data...</div>
  }
  // if program gets here, then we have data!

  // if that data is an error, return. 'error message'
  if(quizError) {
      return <div>Error fetching quiz</div>
  }


  // axios post 

  function SubmitQuiz(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/quiz/${match.params.id}`,
      data: {
        
        studentName: studentName,
        quiz_id: match.params.id,
        answers:
          "A.)" +
          answer1 +
          ", " +
          "B.)" +
          answer2 +
          ", " +
          "C.)" +
          answer3 +
          ", " +
          "D.)" +
          answer4,
      },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then(function () {
        alert("Successfully submitted application.");
      })
      .catch(function (error) {
        alert("Failed to submit application.");
        console.log(error);
      });
  }


  return (
    <div>
      <h1>Submit a Quiz</h1>
      <form action="/action_page.php">
        <label for="studentName">Student Name:</label>
        &nbsp;&nbsp;
        <input
          required
          type="studentName"
          id="studentName"
          name="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter Student Name"
        />
        <br />
        <br />

        
        <div>
            {
                quiz.questions.map((question, i) => (
                    <div key={i}>
                        <p><b>Text:</b> {question.text}</p>
                        <p><b>Type:</b> {question.type}</p>
                        <p><b>Options:</b> {question.options}</p>
                        <br></br>
                        
                    </div>
                ))
            }
        </div>

        <label for="answer1">Answer 1:</label>
        &nbsp;&nbsp;
        <input
          required
          type="text"
          id="answer1"
          name="answer1"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          placeholder="Answer 1"
        />
        <br />
        <p className="answer2">
          <label for="answer2">Answer 2:</label>&nbsp;&nbsp;
          <input
            required
            type="text"
            id="answer2"
            name="answer2"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Answer 2"
          />
          <br />
          <br></br>
          <label for="answer3">Answer 3:</label> &nbsp;&nbsp;
          <input
            required
            type="text"
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
            name="answer3"
            id="answer3"
            placeholder="hi"
          />
          <br />
          <br></br>
          <label for="answer3">Answer 4:</label> &nbsp;&nbsp;
          <input
            required
            type="answer4"
            id="answer4"
            name="answer4"
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
            placeholder="ex. A).Blue"
          />
          
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          variant="primary"
          onClick={(e) => {
            SubmitQuiz(e);
          }}
          type="submit"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default SubmitQuiz;

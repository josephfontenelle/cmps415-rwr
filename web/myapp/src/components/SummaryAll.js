import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import CreateQuiz from './CreateQuiz';


 
const SummaryAll = () => {

    const [quizzes, setQuizzes] = useState([]);

    // change to true when all the data is finally loaded into DOM
    const [quizzesIsLoaded, setQuizzesIsLoaded] = useState(false);
    
    // change to true if api returns an error. eg 404 not found
    const [quizzesError, setQuizzesError] = useState(false);

    useEffect(() => {
        getQuizzes();
    }, [])

    const getQuizzes = () => {
        axios.get(`http://localhost:8080/quizzes`)
        .then((response) => {
            setQuizzes(response.data.quizzes);
            setQuizzesIsLoaded(true);
        })
        .catch(error => {
            console.log(error);
            // change quizzesError state to true because there was an error
            setQuizzesError(true);
        })
    }

    // return 'loading...' if data is still being fetched from backend. 
    if(!quizzesIsLoaded) {
        return <div>Loading data...</div>
    }
    // if program gets here, then we have data!

    // if that data is an error, return. 'error message'
    if(quizzesError) {
        return <div>Error fetching quizzes</div>
    }

    // if this is reached, then we have quizzes data with no error!
    return (
       <div>
          <h1>Quizzes</h1>
           <div>

               {
                   quizzes.length < 1 ? ('no quizzes found') : (
                       <div>
                           {
                               quizzes.map((quiz) => (
                                   <div key={quiz._id}>
                                        <p><b>Id:</b> {quiz._id}</p>
                                        <p><b>Title:</b> {quiz.title}</p>
                                        <p><b>Description:</b> {quiz.description}</p>
                                        <br></br>
                                        <p>Questions</p>
                                        {
                                            quiz.questions.length > 0 ? (
                                                quiz.questions.map((question, i)=> (
                                                    <div key={i}>
                                                    <p><b>Question:</b> {question.text}</p>
                                                    <p><b>Type:</b> {question.type}</p>
                                                    <p><b>Options:</b> {question.options}</p><br></br>
                                                    </div>
                                                ))
                                            ) : (
                                                'no questions'
                                            )
                                        }
                                   </div>
                               ))
                           }
                       </div>
                   )
               }
           </div>
       </div>
    );
}
 
export default SummaryAll;

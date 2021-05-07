
 
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'; 



 
// const SummaryOne = () => {

//     const [submission, setsubmission] = useState({});

//     // change to true when all the data is finally loaded into DOM
//     const [submissionIsLoaded, setsubmissionsIsLoaded] = useState(false);
    
//     // change to true if api returns an error. eg 404 not found
//     const [submissionError, setsubmissionError] = useState(false);

//     useEffect(() => {
//         getsubmission();
//     }, {})

//     const getsubmission = () => {
        
//         axios.get(`http://localhost:8080/quiz/${e.quiz._id}`)
//         .then((response) => {
//             setsubmission(response.data.quiz_id.submission);
//             setsubmissionsIsLoaded(true);
//         })
//         .catch(error => {
//             console.log(error);
//             // change submissionzesError state to true because there was an error
//             setsubmissionError(true);
//         })
//     }

//     // return 'loading...' if data is still being fetched from backend. 
//     if(!submissionIsLoaded) {
//         return <div>Loading data...</div>
//     }
//     // if program gets here, then we have data!

//     // if that data is an error, return. 'error message'
//     if(submissionError) {
//         return <div>Error fetching submissionzes</div>
//     }

//     // if this is reached, then we have submissionzes data with no error!
//     return (
//        <div>
//           <h1>Submission</h1>
//            <li>{submission}</li>
//            </div>

//     );
// }
 

 
// export default SummaryOne;


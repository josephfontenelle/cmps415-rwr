import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const CreateQuiz = () => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState([]);

  function SubmitQuiz(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/new/",
      data: {
      
        title: title,
        description: description,
      
      questions:{
         text: text,
        type: type,
        options: options,
      } 
      
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
      <h1>Create a Quiz</h1>
      <p className="description">
        All quizzes have title, description, and a set of 4 questions<br></br>
        Each question has a type, text, and options if needed<br></br>
      </p>
      <p className="description2">
        Question type includes: <br></br> &nbsp;&nbsp;1) true/false <br></br>
        &nbsp;&nbsp;2) Multiple Choice (single-select)<br></br>
        &nbsp;&nbsp;3) Multiple Choice (multi-select)<br></br>
        &nbsp;&nbsp;4) Short answer (less than 256 characters)<br></br>
      </p>
      <form action="/action_page.php">
        <label for="title">Quiz Title</label>
        &nbsp;&nbsp;
        <input
          required
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Quiz Title"
        />
        <br />
        <br />
        <label for="description">Quiz Description</label>
        &nbsp;&nbsp;
        <input
          required
          type="textarea"
          id="questionDescription"
          name="questionDescription"
          value={description}
          onChange={(e) => setDescription((e.target.value))}
          placeholder="Enter Quiz Description"
        />
        <br />
        <p className="questions">
          <label for="text">Question:</label>&nbsp;&nbsp;
          <input
            required
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Question Here"
          />
          <br />
          <br></br>
          <label for="type">Slect Question Type:</label> &nbsp;&nbsp;
          <select  value={type} onChange={(e) => setType(e.target.value)} required name="type" id="type">
            <option>
              True/False
            </option>
            <option>
              Select One
            </option>
            <option>
              Select Many
            </option>
            <option>
              Short Answer
            </option>
          </select>
          <br />
          <br></br>
          <div>
            Short answer and True/False questions do not apply<br></br>
          </div>
          <label for="options">
            Give question options here:
            <br />
            A:
          </label>
          &nbsp;&nbsp;
          <input
            required
            type="options"
            id="options"
            name="options.0"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="ex. A).Blue"
          />
          <br />
          B:&nbsp;&nbsp;
          <input
            required
            type="options"
            id="options"
            name="options.1"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="ex. B).Red"
          />
          <br />
          C:&nbsp;&nbsp;
          <input
            required
            type="options"
            id="options"
            name="options.2"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="ex. C).Green"
          />
          <br />
          D:&nbsp;&nbsp;
          <input
            required
            type="options"
            id="options"
            name="options.3"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="ex. D).Pink"
          />
          <br />
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

export default CreateQuiz;

var express = require("express");
var app = express();
var db;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Bulldogs2016:z281XnBVuzVGVNwI@cluster0.gfdls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  console.log("Connected to DB");
  db = client.db();
});

// cors allows backend accept requests from frontend
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"]
};

// middleware 
app.use(cors(corsOptions));
app.use(express.json());



var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/', (req, res) => res.send('Quiz App. Connect to an endpoint. (Postman.)'));
// create new quiz
app.post("/new/", function(req, res) {

  console.log("req.body", req.body)

  if(req.body.title == "") {
   handleError(res, err.message, "bad job quiz missing title");
    return 
   }

  var newQuiz = {
    title: req.body.title,
    description: req.body.description,
    questions: req.body.questions
  }

    db.collection("quiz").insertOne(newQuiz, function(err) {
        if (err) {
            handleError(res, err.message, "you failed");
            return;
        } else {
          handleResponse(res, 201, "quiz created")
        }
    });
  }
);
// get all quizzes 
app.get("/quizzes", function(req, res) {
    db.collection("quiz").find({}).toArray(function(err, quizzes) {
        if (err) {
            handleError(res, err.message, "Failed to get quizzes.");
        } else {
            handleResponse(res, 200, "quizzes found", quizzes)
        }
    });
});


//get submission by id
app.get("/quiz/:id", function(req, res) {
  var quiz_id = req.params.id 

  db.collection("submission").find({quiz_id: quiz_id}).toArray(function(err, submission){
    if(err) {
      // handle error
      handleError(res, err.message, "submission not found");
    } else {
      // 200 ok 
      handleResponse(res, 200, "submission found", submission);
    }
  });
});

// create a submission to a particular quiz
app.post("/quiz/:id", function(req, res) {
  var quiz_id = req.params.id 

  var newSubmission = {
    quiz_id: quiz_id, 
    name: req.body.name,
    answers: req.body.answers

  }

  db.collection("submission").insertOne(newSubmission, function(err, submission) {
      if (err) {
          handleError(res, err.message, "Submitted Failed.");
      } else {
          handleResponse(res, 200, "Submitted");
      }
  });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
function handleResponse(res, code, message="", obj) {
  if(obj === null) {
    // only return message. (for POST requests)
    res.status(code || 200).json(message)
  } else if(message == "") {
    // only return object (for GET requests)
    res.status(code || 200).json(obj)
  } else {
    // for whatever
    res.status(code || 200).json({message: message, quizzes: obj})
  }
}

//code attempt
//  // get submission of a quiz
//     app.get("/quiz/:id", function(req, res) {
//       var id = req.body.id;

//       var response = {
//         quiz: null,
//         submissions: null
//       }

//       // find quiz by id 
//       db.collection("quiz").find({_id: id}, function(err, quiz) {
//             if (err) {
//                 // handle error
//                 return 
//             }
//             response.quiz = quiz
//         });

//   // find all submissions assocaited with the quiz
//   db.collection("submission").find({quiz_id: id}, function(err, quiz) {
//         if (err) {
//             // handle error
//             return
//         }
//         response.submissions = submissions
//     });

//     handleResponse(res, 200, "submission found", response);
// });
// // get a single quiz by id 
// app.get("/:id", function(req, res) {
//   var id = req.body.id;

//   // find quiz by id 
//   db.collection("quiz").findOne({id: id}, function(err, quiz) {
//     if(err) {
//       // handle error
//       handleError(res, err.message, "quiz not found");
//     } else {
//       // 200 ok 
//       handleResponse(res, 200, "quiz found", quiz);
//     }
//     });
// });
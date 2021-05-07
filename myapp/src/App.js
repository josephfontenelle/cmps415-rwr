import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Error from './components/Error';
import Navigation from './components/Navigation';
import CreateQuiz from './components/CreateQuiz';
import SummaryOne from './components/SummaryOne';
import SummaryAll from './components/SummaryAll';
 import SubmitQuiz from './components/SubmitQuiz';
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/CreateQuiz" component={CreateQuiz} exact/>
             <Route path="/SubmitQuiz/:id" component={SubmitQuiz}/>
             <Route path={"/", "/SummaryAll"} component={SummaryAll}/>
             <Route path="/SummaryOne/:id" component={SummaryOne}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;


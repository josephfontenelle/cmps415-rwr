import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SubmitQuiz from './components/SubmitQuiz';
import Error from './components/Error';
import Navigation from './components/Navigation';
import CreateQuiz from './components/CreateQuiz';
import SummaryOne from './components/SummaryOne';
import SummaryAll from './components/SummaryAll';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/CreateQuiz" component={CreateQuiz} exact/>
             <Route path="/SubmitQuiz" component={SubmitQuiz}/>
             <Route path="/SummaryAll" component={SummaryAll}/>
             <Route path="/SummaryOne" component={SummaryOne}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;


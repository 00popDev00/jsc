import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from 'react';
import App from './App'
import HomePage from './Screens/HomePage'

class RouterHome extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Route path='/' exact component={App} />
                <Route path='/HomePage' exact component={HomePage} />

            </Router>
         );
    }
}
 
export default RouterHome;
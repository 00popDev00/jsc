import React, { Component } from 'react';
import App from './Router';
<<<<<<< HEAD
import { createStore} from 'redux';
=======
import { createStore, combineReducers } from 'redux';
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
import { Provider } from 'react-redux';
import functionProvider from './Redux/Provider'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(functionProvider, composeWithDevTools(

));

class encapsulate extends Component {
    state = {}
    render() {
        return (
            
                <Provider store={store}  >
                    <App />
                </Provider>
        );
    }
}

export default encapsulate;



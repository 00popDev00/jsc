import React, { Component } from 'react';
import App from './Router';
import { createStore, combineReducers } from 'redux';
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



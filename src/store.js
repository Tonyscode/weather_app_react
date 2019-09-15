import React from 'react';
import './App.css';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

function promiseReducer(state, action){
  if (!state) {
    return {
      DEFAULT: {
        status: 'EMPTY',                                      
        error: null
      }
    }
  }  

  if (action.type === 'SET_STATUS'){
    return {...state,
      DEFAULT: {
      	status: action.status, 
        payload: action.payload,                                     
        error: action.error
      }
    }
  }
  
  if (action.type === 'PROMISE'){
    return {...state,
      [action.name]: {
        status: action.status,
        payload: action.payload, 
        error: action.error
      }
    }
  }
  return state;
}

const store = createStore(promiseReducer, applyMiddleware(thunk));

store.subscribe(()=> console.log('State:', store.getState()));

export default  store;

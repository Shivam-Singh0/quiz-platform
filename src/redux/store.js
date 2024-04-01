import { configureStore} from '@reduxjs/toolkit'
import { combineReducers} from 'redux'
import { thunk } from 'redux-thunk'
import {questions, quizzes} from './reducer'
import {localStorageMiddleware} from './localStorageMiddleware'


const reducer = combineReducers({
    'questions' : questions,
    'quizzes' : quizzes,
})
const persistedQuizzState = localStorage.getItem('quizzes');
const initialState = {
    quizzes:persistedQuizzState ? JSON.parse(persistedQuizzState) : []
}
const middleware = [thunk, localStorageMiddleware]

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middleware), // Adding middleware
    
});

export default store





import { ADD_QUESTIONS, ADD_QUIZ, CHANGE_STATUS, QUESTIONS_RESET, DELETE_QUIZ, UPDATE_QUIZ } from "./reducer";

export const addQuestions = ({question, options}) => ({
    type: ADD_QUESTIONS,
    payload: {question, options},
  });

  export const addQuiz = (quiz) => (dispatch) => 
    {
      dispatch({
      type: ADD_QUIZ,
      payload: quiz,
    });
    
    dispatch({type:QUESTIONS_RESET})
  }
  
  
  export const changeStatus = (quizStatus) => ({
    type: CHANGE_STATUS,
    payload : quizStatus,
  })

  export const deleteQuiz = (index) => ({
    type: DELETE_QUIZ,
    payload: index,
  })

  export const updateQuiz = (value) => ({
    type: UPDATE_QUIZ,
    payload: value
  })

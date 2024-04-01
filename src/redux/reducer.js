export const ADD_QUESTIONS = "ADD_QUESTIONS";
export const QUESTIONS_RESET = "QUESTIONS_RESET";
export const ADD_QUIZ = "ADD_QUIZ";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const DELETE_QUIZ = "DELETE_QUIZ";
export const UPDATE_QUIZ = "UPDATE_QUIZ";

export const questions = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_QUESTIONS:
      return [...state, payload];

    case QUESTIONS_RESET:
      return [];

    default:
      return state;
  }
};

export const quizzes = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_QUIZ:
      return [...state, payload];

    case CHANGE_STATUS:
      const { status, index } = payload;
      const updatedState = [...state];
      updatedState[index] = { ...updatedState[index], status };
      return updatedState;

    case DELETE_QUIZ:
       const {index : delIndex} = payload
      return [...state.slice(0,delIndex), ...state.slice(delIndex+1)];
    case UPDATE_QUIZ:
      const {index: updateIndex, quizTitle, quizDescription} = payload;
      const updatedState2 =[ ...state];
      updatedState2[updateIndex] = {...updatedState2[updateIndex], quizTitle, quizDescription};
      return updatedState2;
    default:
      return state;
  }
};


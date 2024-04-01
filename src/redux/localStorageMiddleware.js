
export const localStorageMiddleware = store => next => action => {

    let result = next(action)
    localStorage.setItem('quizzes', JSON.stringify(store.getState().quizzes))
    return result
  }
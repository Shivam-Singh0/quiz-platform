import {Route,Routes,BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import './App.css';
import Home from './components/Home'
import CreateScreen from './components/CreateScreen';
import MyQuiz from "./components/MyQuiz";
import PlayForum from "./components/PlayForum";
import Quiz from "./components/Quiz";


function App() {
  return (
    <Router>
      <Header />
      <main style={{marginTop:'100px'}}>
          
          <Routes>
            <Route path='/' element = {<Home/>} />
            <Route path='/create' element = {<CreateScreen/>} />
            <Route path="/myquiz" element = {<MyQuiz/> } />
            <Route path="/playForum" element = {<PlayForum/> } />
            <Route path="/quiz/:id/:userName" element = {<Quiz/> } />

          </Routes>
          
      </main>
    </Router>
  );
}

export default App;

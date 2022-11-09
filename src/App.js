import Chat from './pages/chat'
import Home from './pages/home';
import './App.css';
import { BrowserRouter as Router ,  Route, Routes } from 'react-router-dom';
import GroupChatModal from './components/modals/groupChatModal';

function App() {
  return (
  
    <div className="App">
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>
          <Route path='/temporary' element={<GroupChatModal/>}></Route>
          <Route>404 not found!</Route>
      </Routes>
    </div>
    
  );
}

export default App;

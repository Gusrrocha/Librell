import logo from './logo.svg';
import './App.css';
import ListUsers from './components/ListUsers';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import Login from './components/login';
import Books from './components/Books';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
              <Route path='/' element = { <ListUsers />}></Route> 
              {/* // http://localhost:3000/user */}
              <Route path='/user' element = { <ListUsers /> }></Route>
              {/* // http://localhost:3000/login */}
              <Route path='/login' element = { <Login />}></Route>
              {/* // http://localhost:3000/cadastrar */}
              <Route path='/cadastrar' element = { <AddUser />}></Route>
              {/* // http://localhost:3000/livros */}
              <Route path='/livros' element = { <Books />}></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;

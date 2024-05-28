import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../services/auth';
import { useJwt, decodeToken } from 'react-jwt';
const HeaderComponent = () => {
  const navigator = useNavigate();
  function login(){
    navigator('/login');
  }

  function add_book(){
    navigator('/livros/addlivro');
  }

  const token = getToken();


  return (
    <div>
        <header>
            {/* <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Librell</a>
                <a className='navbar-' href="/"></a>
            </nav> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="/">Librell</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="/livros">Livros</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="#">Disabled</a>
                    </li>
                
                  </ul>
                  <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
                  <button className="btn btn-primary ml-2" onClick={login}>Log-in</button>
                </div>
              </div>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent
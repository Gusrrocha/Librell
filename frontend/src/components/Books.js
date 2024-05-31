import React from 'react'
import { useState } from 'react';
import { getBooks} from '../services/LivroService';
import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/auth';

const Books = () => { 
  const [livros, setLivros] = useState([]);
  
  const [show, setShow] = useState("");
  const navigator = useNavigate();
  function Buy(livr){
    if(getToken())
      {
      localStorage.setItem("liv", JSON.stringify(livr));
      navigator("/buy")
      }
    else{
      alert("Logue primeiro!");
    }
  }
  useEffect(() => {
    getBooks().then((response) => {
      setLivros(response.data);
    }).catch(err => {
      console.error(err);
    })
  },[])
  
  return (
    <div className='container-fluid'>
        <h4>Livros</h4>
        <div className='d-flex p-2 bd-highlight flex-wrap overflow-auto' id="book"
              style={{width:"100vw"}}>
          {
            livros.map(livro =>
              <div class="d-flex flex-column border" style={{height: "400px"} && {width: "100px"}}  key={livro.id}>
                <LazyLoad>
                <img style={{width:"100%"}} src={`${livro.pictpath.slice(72).replace("\\","/").replace("]","")}`} alt="fa" height={170}>
                </img>
                </LazyLoad>
                <label>Nome: {livro.name}</label>
                <label>Descrição: {livro.desc}</label>
                <label>Valor: {livro.valor}</label>
                <div>
                <button type="btn btn-primary" onClick={() => Buy(livro)}>Comprar</button>
                </div>
              </div>
            )
          }
 
        </div>
    </div>
  )
}

export default Books
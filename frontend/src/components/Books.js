import React from 'react'
import { useState } from 'react';
import { getBooks} from '../services/LivroService';
import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
const Books = () => { 
  const [livros, setLivros] = useState([]);
  
  
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
        <div className='d-flex p-2 bd-highlight'>
          {
            livros.map(livro =>
              <div class="d-flex flex-column" key={livro.id}>
                <LazyLoad>
                <img src={require(`../media/${livro.pictpath}`)} height={170}>
                </img>
                </LazyLoad>
                <label>Nome: {livro.name}</label>
                <label>Valor: {livro.valor}</label>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Books
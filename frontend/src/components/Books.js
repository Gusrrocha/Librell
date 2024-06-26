import React from 'react'
import { useState } from 'react';
import { getBooks} from '../services/LivroService';
import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/auth';
import { decodeToken } from 'react-jwt';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
const Books = () => { 
  const [livros, setLivros] = useState([]);
  let admin = "";
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
  function Edit(livro){
    localStorage.setItem("liv", JSON.stringify(livro))
    navigator("/edit")
  }
  useEffect(() => {
    getBooks().then((response) => {
      setLivros(response.data);
    }).catch(err => {
      console.error(err);
    })
  },[])
  const handleDelete = (livr) =>
    {
      if (window.confirm('Tem certeza que deseja deletar este item?')){
        fetch("http://localhost:8082/api/v1/livro/"+livr.id, {
        method: "DELETE"
        }); 
      }
      
    }
  const token = getToken();
  if(token)
  {
    const dec = decodeToken(token);
    
    if(dec.sub.replace("[","").replace("]","") === "ROLE_ADMIN"){
      admin = true;
    }
  }
  return (
    <div className='container-fluid'>
        <h4 style={{color:"white"}}>Livros</h4>
        <div className='d-flex p-5 bd-highlight flex-wrap overflow-auto align-items-baseline justify-content-start' id="book">
          {
            livros.map(livro => 
              <div className="itemb1">
                <div class="d-flex flex-column" style={{height: "100px"} && {width: "150px"}}  key={livro.id}>
                  <LazyLoad>
                  <img style={{width:"100%", maxWidth:"150px"}} src={`/images/${livro.pictpath}`} alt="Imagem não encontrada" onError={({ currentTarget }) => {
                                                                                                                                currentTarget.onerror = null; // prevents looping
                                                                                                                                currentTarget.src=livro.pictpath;
                                                                                                                              }} height={170}>
                  </img>
                  </LazyLoad>
                  <div class="d-flex flex-column">
                    <label class="flex-fill" className="nameB">{livro.name}</label>
                    <div class="d-flex flex-row">
                    <label style={{fontSize:"12px", marginRight:"5px"}}>Descrição:</label>
                    <p style={{fontSize:"8px",overflowY:"auto", overflowWrap:"break-word",maxHeight:"20px"}}>{livro.descricao}</p>
                    </div>
                    <label class="flex-fill" style={{fontSize:"12px"}}>{livro.autor}</label>
                    <label class="flex-fill" style={{fontSize:"12px"}}>R$ {livro.valor && (livro.valor).toString().replace(".",",")}</label>
                  <div class="d-flex flex-row">
                  <button class="btn btn-outline-success" style={{display:"inline-block", padding:"0px 5px"}} onClick={() => Buy(livro)}>Comprar</button>
                  {(admin) ?
                    <>
                    <li class="nav-item">
                    <button type="button" style={{display:"inline-block", padding:"2px 5px"}} class="btn btn-default btn-smonClick" onClick={() => handleDelete(livro)}><Trash/></button>
                    </li>
                    <button type="button" style={{display:"inline-block", padding:"2px 5px"}} class="btn btn-default btn-smonClick" onClick={() => Edit(livro)}><PencilSquare/></button>
                  </>
                  :
                  ""
                  }
                  </div>
                  </div>
                </div>
              </div>
            )
          }
 
        </div>
    </div>
  )
}

export default Books
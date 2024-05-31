import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, killToken } from '../services/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { addLivro } from '../services/LivroService';
import { decodeToken } from 'react-jwt';


const HeaderComponent = () => {
  const [name, setName] = useState("");
  const [descricao, setDesc] = useState("");
  const [valor, setValue] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    descricao: "",
    valor: ""
  })
  const [imgErr, setImgErr] = useState("")
  const [imgOld, setimgOld] = useState("")
  const [show, setShow] = useState(false)
  let admin = false;
  
  const handleName = (e) => setName(e.target.value);
  const handleDesc = (e) => setDesc(e.target.value);
  const handleValue = (e) => setValue(e.target.value);
  function validateForm(){
    let valid = true;
    const regex = new RegExp("")
    const errorsCopy = {... errors}

    if(name.trim()){
        errorsCopy.name = "";
    } else{
        errorsCopy.name = "Nome do livro é necessário";
        valid = false;
    }
    
    if(descricao.trim()){
        errorsCopy.descricao = "";
    } else{
        errorsCopy.descricao = "Descrição do livro é necessário";
        valid = false;
    }

    if(valor.trim()){
        errorsCopy.valor = "";
    } else{
        errorsCopy.valor = "Valor do livro é requerido";
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  const handleImg = (e) => {
    if(e.target.files[0].size > 1048576) {
      setImgErr("O arquivo é muito grande. Por favor, insira um arquivo menor que 1MB");
      document.getElementById("imginput").value = "";
    }
    else
    {
      setImgErr("");
      const data = new FormData();
      data.append("file", document.getElementById("imginput").files[0]);
      fetch("http://localhost:8082/api/v1/files/", {
        method: "POST",
        body: data,
      });
    }
    setimgOld(e.target.files[0]);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleForm = (e) => {
    e.preventDefault();
    if(validateForm()){
    if(document.getElementById("imginput").value === "")
    {
      setImgErr("Insira a imagem do livro.")
    }   
    else
      {
      
        const livro = {name,descricao,valor}

        addLivro(livro).then((response) => {
          console.log(response.data);
        })
        document.getElementById("imginput").value = "";
        handleClose();
      }
    } 
  }
  const navigator = useNavigate();

  function login(){
    navigator('/login');
  }

  function perfil(){
    navigator('/perfil')
  }
  function ktoken()
  {
    killToken()
    navigator('/')
  }
  const token = getToken();
  if(token){
    const dec = decodeToken(token);
    
    if(dec.sub.replace("[","").replace("]","") === "ROLE_ADMIN"){
      admin = true;
    }
  }
    
  function Adm(){
    if(admin)
      return  <>
                <li class="nav-item">
                <Button variant="primary" onClick={handleShow}>
                  Adicionar Livro
                </Button>
                </li>
              </>
      
  }

  function Log(tok){
    if (token) {
      return <div>
              <button className="btn btn-primary ml-2" onClick={perfil}>Sua conta</button>
              <button type="button" class="btn btn-default btn-smonClick" onClick={ktoken}>
                <span class="glyphicon glyphicon-log-out"></span> Log out
              </button>
            </div>
    } 
    return <button className="btn btn-primary ml-2" onClick={login}>Log-in</button> 
  }
  

  return (
    <div style={{position:"relative", width:"100vw"}}>
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
                    <Adm>
                    </Adm>
                  </ul>
                  <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
                  <Log>
                    tok={token}
                  </Log>
                </div>
              </div>
            </nav>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Livro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group class="mb-3" controlId='formAdd'>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control isInvalid={`${errors.name ? true : false}`} type="text" onChange={handleName} placeholder="Insira o nome do livro"/>
                  { errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                </Form.Group>
                <Form.Group class="mb-3" controlId='formDesc'>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control isInvalid={`${errors.descricao ? true : false}`} type="text" onChange={handleDesc} placeholder='Insira a descrição do livro'/>
                  { errors.descricao && <div className='invalid-feedback'>{errors.descricao}</div>}
                </Form.Group>
                <Form.Group class="mb-3" controlId='formValor'>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control isInvalid={`${errors.valor ? true : false}`} type="number" onChange={handleValue} placeholder='Insira o valor do livro'/>
                  { errors.valor && <div className='invalid-feedback'>{errors.valor}</div>}
                </Form.Group>
                <Form.Group class="mb-3" controlId='formImg'>
                {/*                 
                document.getElementById("imginput").files[0] === null && 
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(document.getElementById("imginput").files[0])}
                  />
                  <br /> <br />
                  <button onClick={() => document.getElementById("imginput").clear()}>Remove</button>
                </div> 
                */}
                  <Form.Label>Imagem do livro</Form.Label>
                  <input id='imginput' type="file" accept="image/png,image/jpg,image/jpeg" onChange={handleImg} placeholder='Insira a imagem conténdo a capa do livro'/>
                  { <div>{imgErr}</div>}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleForm}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </header>
    </div>
  )
}

export default HeaderComponent
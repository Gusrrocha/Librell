import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, killToken } from '../services/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { addLivro } from '../services/LivroService';

const HeaderComponent = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [valor, setValue] = useState("");
  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleDesc = (e) => setDesc(e.target.value);
  const handleValue = (e) => setValue(e.target.value);
  const handleImg = (e) => setImg(e.target.files[0])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(img);
    const data = new FormData();
    data.append("file", img);
    fetch("http://localhost:8082/api/v1/files/", {
      method: "POST",
      body: data,
    });
    const livro = {name,desc,valor}

    addLivro(livro).then((response) => {
      console.log(response.data);
    })
    handleClose();
    setImg("")
    navigator("/livros");
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

                    <li class="nav-item">
                    <Button variant="primary" onClick={handleShow}>
                      Adicionar Livro
                    </Button>

                    </li>
                
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
        </header>
        <body>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Livro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group class="mb-3" controlId='formAdd'>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" onChange={handleName} placeholder="Insira o nome do livro"/>
                </Form.Group>
                <Form.Group class="mb-3" controlId='formDesc'>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control type="text" onChange={handleDesc} placeholder='Insira a descrição do livro'/>
                </Form.Group>
                <Form.Group class="mb-3" controlId='formDesc'>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control type="number" onChange={handleValue} placeholder='Insira o valor do livro'/>
                </Form.Group>
                <Form.Group class="mb-3" controlId='formDesc'>
                {img && (
                  <div>
                    {/* Display the selected image */}
                    <img
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(img)}
                    />
                    <br /> <br />
                    {/* Button to remove the selected image */}
                    <button onClick={() => setImg(null)}>Remove</button>
                  </div>
                  )}
                  <Form.Label>Imagem do livro</Form.Label>
                  <Form.Control type="file" onChange={handleImg} placeholder='Insira a imagem conténdo a capa do livro'/>
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
        </body>
    </div>
  )
}

export default HeaderComponent
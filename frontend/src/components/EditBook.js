import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { update } from "../services/LivroService";
import { useNavigate } from "react-router-dom";
const EditBook = () => {
  const livro = JSON.parse(localStorage.getItem("liv"));
  const [name, setName] = useState("");
  const [descricao, setDesc] = useState("");
  const [valor, setValue] = useState("");
  const [autor, setAutor] = useState("");
  const [imgErr, setImgErr] = useState("")
  const [imgOld, setimgOld] = useState("")
  const [errors, setErrors] = useState({
    name: "",
    descricao: "",
    valor: "",
    autor: ""
  })

  const handleName = (e) => setName(e.target.value);
  const handleDesc = (e) => setDesc(e.target.value);
  const handleValue = (e) => setValue(e.target.value);
  const handleAutor = (e) => setAutor(e.target.value);
  const navigator = useNavigate();
  const handleImg = (e) => {
    e.preventDefault();
    if(e.target.files[0].size > 1048576) {
      setImgErr("O arquivo é muito grande. Por favor, insira um arquivo menor que 1MB");
      document.getElementById("imginput2").value = "";
    }
  }
  
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
    if(autor.trim()){
      errorsCopy.autor = "";
    } else{
      errorsCopy.autor = "Valor do livro é requerido";
      valid = false;
    }
    setErrors(errorsCopy);

    return valid;
  }
  const handleForm = (e) => 
    {
      e.preventDefault();
      if(validateForm())
        {
          if(document.getElementById("imginput2").value === "")
          {
            setImgErr("Insira a imagem do livro.")
          } 
          else
          {     
            let file = document.getElementById("imginput2").files[0];
            let pictpath = document.getElementById("imginput2").files[0].name;
            const livr = {autor,name,descricao,valor, pictpath}
            const data = new FormData();
            data.append("file", file);
            fetch("http://localhost:8082/api/v1/files/", {
              method: "POST",
              body: data,
            });
            update(livr,livro.id).then((response) =>
              console.log(response.data)
            )
            document.getElementById("imginput2").value = "";
            navigator("/livros");
          }
        } 
    }
  return (
    <>
    <div class="container-fluid">
      <Form>
        <Form.Group class="mb-3" controlId='formAdd'>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" onChange={handleName} placeholder="Insira o nome do livro"/>
          { errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </Form.Group>
        <Form.Group class="mb-3" controlId='formDesc'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" onChange={handleDesc} placeholder='Insira a descrição do livro'/>
          { errors.descricao && <div className='invalid-feedback'>{errors.descricao}</div>}
        </Form.Group>
        <Form.Group class="mb-3" controlId='formAutor'>
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" onChange={handleAutor} placeholder='Insira o Autor do livro'/>
          { errors.autor && <div className='invalid-feedback'>{errors.autor}</div>}
        </Form.Group>
        <Form.Group class="mb-3" controlId='formValor'>
          <Form.Label>Valor</Form.Label>
          <Form.Control type="number" onChange={handleValue} placeholder='Insira o valor do livro'/>
          { errors.valor && <div className='invalid-feedback'>{errors.valor}</div>}
        </Form.Group>
        <Form.Group class="mb-3" controlId='formImg'>
          <Form.Label>Imagem do livro</Form.Label>
          <input id='imginput2' type="file" accept="image/png,image/jpg,image/jpeg" onChange={handleImg} placeholder='Insira a imagem conténdo a capa do livro'/>
          { <div style={{color:"red"}}>{imgErr}</div>}
        </Form.Group>
        <button class="btn btn-outline-white" onClick={() => navigator("/livros")}>Cancelar</button>
        <button class="btn btn-outline-success" onClick={handleForm}>Salvar Mudanças</button>
      </Form>
    </div>
    </>
  );
};

export default EditBook;

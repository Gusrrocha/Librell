import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { update } from "../services/LivroService";
import { useNavigate } from "react-router-dom";
const EditBook = () => {
  const livro = JSON.parse(localStorage.getItem("liv"));
  const [name, setName] = useState(livro.name);
  const [descricao, setDesc] = useState(livro.descricao);
  const [val, setValue] = useState(livro.valor.toString().replace(".",","));
  const [autor, setAutor] = useState(livro.autor);
  const [imgErr, setImgErr] = useState("")
  const [error, setError] = useState({
    name: "",
    descricao: "",
    valor: "",
    autor: "",
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
    const errorCopy = {...error}
    if(name.trim()){
      errorCopy.name = "";
    }
    else{
      errorCopy.name = "Insira o nome";
      valid = false;
    }
    if(autor.trim()){
      errorCopy.autor = "";
    }
    else{
      errorCopy.autor = "Insira o autor";
      valid = false;
    }
    if(descricao.trim()){
      errorCopy.descricao = "";
    }
    else{
      errorCopy.descricao = "Insira a descrição";
      valid = false;
    }
    if(val.trim()){
      const regex = /([1-9]+|0)\,\d{1,2}/
      if(regex.test(val)){
        errorCopy.valor = "";
      }else{
        errorCopy.valor = "Atenda ao formato {0,00}"
        valid = false;
      }
    }
    else{
      errorCopy.valor = "Insira o valor do livro"
      valid = false;
    }
    setError(errorCopy)
    return valid;
  }
  const handleForm = (e) => 
    {
      e.preventDefault();
      if(validateForm())
        {
          if(document.getElementById("imginput2").value === "")
          {
            let pictpath = livro.pictpath;
            let valor = parseFloat(val.replace(",",".")); 
            const livr = {autor,name,descricao,valor, pictpath}
            update(livr,livro.id).then((response) =>
              console.log(response.data)
            )
            document.getElementById("imginput2").value = "";
            navigator("/livros");
          }
          else
          {
            let file = document.getElementById("imginput2").files[0];
            let pictpath = document.getElementById("imginput2").files[0].name;
            let valor = parseFloat(val.replace(",",".")); 
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
    <div style={{color:"white"}}class="container-fluid">
      <br/>
      <br/>
      <br/>
      <br/>
      <h2 class="text-center">Atualização de Produto</h2>
      <Form>
        <Form.Group class="mb-3" controlId='formAdd'>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" onChange={handleName} defaultValue={livro.name} placeholder="Insira o nome do livro"/>
          <Form.Label>{<p style={{color:"red"}}>{error.name}</p>}</Form.Label>
        </Form.Group>
        <Form.Group class="mb-3" controlId='formDesc'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" onChange={handleDesc} defaultValue={livro.descricao} placeholder='Insira a descrição do livro'/>
          <Form.Label>{<p style={{color:"red"}}> {error.descricao}</p>}</Form.Label>
        </Form.Group>
        <Form.Group class="mb-3" controlId='formAutor'>
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" onChange={handleAutor} defaultValue={livro.autor} placeholder='Insira o Autor do livro'/>
          <Form.Label>{<p style={{color:"red"}}>{error.autor}</p>}</Form.Label>
        </Form.Group>
        <Form.Group class="mb-3" controlId='formValor'>
          <Form.Label>Valor</Form.Label>
          <Form.Control type="text" onChange={handleValue} defaultValue={livro.valor.toString().replace(".",",")} placeholder='Insira o valor do livro'/>
          <Form.Label>{<p style={{color:"red"}}>{error.valor}</p>}</Form.Label>
        </Form.Group>
        <Form.Group class="mb-3" controlId='formImg'>
          <Form.Label>Escolha a imagem do livro:</Form.Label>
          <input id='imginput2' type="file" accept="image/png,image/jpg,image/jpeg"  onChange={handleImg} placeholder='Insira a imagem conténdo a capa do livro'/>
          { <div style={{color:"red"}}>{imgErr}</div>}
        </Form.Group>
        <button class="btn btn-outline-white" style={{color:"white"}} onClick={() => navigator("/livros")}>Cancelar</button>
        <button class="btn btn-outline-success" onClick={handleForm}>Salvar Mudanças</button>
      </Form>
    </div>
    </>
  );
};

export default EditBook;

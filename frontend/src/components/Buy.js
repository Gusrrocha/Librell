import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../services/auth';
import { decodeToken } from 'react-jwt';
import { compra } from '../services/LivroService';
const Buy = () => {
    const livr = JSON.parse(localStorage.getItem("liv"));
    const [endereco, setEndereco] = useState("");
    const [Number, setCNumber] = useState("");
    const [CVV, setcCVV] = useState("");
    const [errors, setErrors] = useState({
        endereco:"",
        cNumber:"",
        cCVV:""
    })

    let livro = "";
    let user = "";
    const navigator = useNavigate();
    const handleEndereco = (e) => setEndereco(e.target.value);
    const handlecNumber = (e) => setCNumber(e.target.value);
    const handlecCVV = (e) => setcCVV(e.target.value)
    const token = getToken();
    const dec = decodeToken(token);
    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}
        setErrors(errorsCopy);
        if(Number.trim()){
            const regex = /\d{16,16}/
            if(regex.test(Number)){
                errorsCopy.cNumber = "";
            }else{
                errorsCopy.cNumber = "O número do cartão deve ser de 16 dígitos."
                valid = false;
            }
        }else{
            errorsCopy.cNumber = "Insira o número do seu cartão."
            valid = false;
        }

        if(CVV.trim()){
            const regex = /\d{3,3}/
            if(regex.test(CVV)){
                errorsCopy.cCVV = "";
            }else{
                errorsCopy.cCVV = "O número do segurança deve ser de 3 dígitos."
                valid = false;
            }
        }else{
            errorsCopy.cCVV = "Insira o número de segurança do seu cartão."
            valid = false;
        }

        if(endereco.trim()){
            errorsCopy.endereco = "";
        }else{
            errorsCopy.endereco = "Insira o endereço do local de entrega."
            valid = false;
        }
        return valid;
      }
    
    const Comprar = (e) =>
    {
       e.preventDefault();
       if(validateForm()){
       let livro_id = livr.id;
       user = {"id":null,"firstName":null,"lastName":null,"email":dec.email,"password":"null"}
       livro = {"id":livro_id,"autor":null,"name":null,"descricao":null,"valor":null,"pictpath":null}
       let cNumber = parseInt(Number);
       let cCVV = parseInt(CVV);
       const pedid = {livro, user, endereco, cNumber, cCVV}
       compra(pedid).then((response) => {
        console.log(response.data);
       }) 
       localStorage.setItem("liv","");
       navigator("/livros");
        }
    }
    
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <br></br>
            <div className='card col-md-4 offset-md-3' style={{position:"absolute", minWidth: "auto"}}>
                <h2 className='text-center mt-3'>Compra</h2>
                <div className='card-body'>
                    <div class="d-flex flex-row bd-highlight mb-3">
                        <img src={`/images/${livr.pictpath}`} alt="Imagem não encontrada" onError={({ currentTarget }) => {
                                                                                                    currentTarget.onerror = null; // prevents looping
                                                                                                    currentTarget.src=livr.pictpath;
                                                                                                    }} style={{width:"100%", maxWidth:"120px"}}></img>
                        <div class="d-flex flex-column" style={{width:"100%"}}>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Nome: {livr.name}</label>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Descrição: {livr.descricao}</label>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Valor: R$ {livr.valor.toString().replace(".",",")}</label>
                        </div>
                    </div>   
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Endereço completo:</label>
                            <input type="text"
                                placeholder='Digite o endereço'
                                name='endereco'
                                value={endereco}
                                className={"form-control"}
                                onChange={handleEndereco}
                                >
                            </input>
                        </div>
                        {<p>{errors.endereco}</p>}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Número do cartão:</label>
                            <input type='text'
                                placeholder='Digite o número do seu cartão'
                                name='cNumber'
                                value={Number}
                                maxLength={16}
                                minLength={16}
                                className={`form-control`}
                                onChange={handlecNumber}>
                            </input>
                        </div>
                        {<p>{errors.cNumber}</p>}
                        <div className='form-group mb-2'>
                            <label className='form-label'>CVV:</label>
                            <input type="text"
                                placeholder="Digite o CVV do seu cartão"
                                name="cCVV"
                                value={CVV}
                                maxLength={3}
                                minLength={3}
                                className={`form-control`}
                                onChange={handlecCVV}>  
                            </input>
                        </div>
                        {<p>{errors.cCVV}</p>}          
                        <button className='btn btn-success' onClick={Comprar}>Comprar</button>             
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Buy
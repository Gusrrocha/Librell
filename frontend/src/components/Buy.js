import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../services/auth';
import { decodeToken } from 'react-jwt';
import { compra } from '../services/LivroService';
const Buy = () => {
    const livr = JSON.parse(localStorage.getItem("liv"));
    const [endereco, setEndereco] = useState("");
    const [cNumber, setCNumber] = useState("");
    const [cCVV, setcCVV] = useState("");

    let livro = "";
    let user = "";
    const navigator = useNavigate();
    const handleEndereco = (e) => setEndereco(e.target.value);
    const handlecNumber = (e) => setCNumber(e.target.value);
    const handlecCVV = (e) => setcCVV(e.target.value)
    const token = getToken();
    const dec = decodeToken(token);
    
    const Comprar = (e) =>
    {
       let livro_id = livr.id;
       e.preventDefault();
       user = {"id":null,"firstName":null,"lastName":null,"email":dec.email,"password":"null"}
       livro = {"id":livro_id,"autor":null,"name":null,"descricao":null,"valor":null,"pictpath":null}
       const pedid = {livro, user, endereco, cNumber, cCVV}
       compra(pedid).then((response) => {
        console.log(response.data);
       }) 
       localStorage.setItem("liv","");
       navigator("/livros");
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
                        <img src={`/images/${livr.pictpath}`} style={{width:"100%", maxWidth:"120px"}}></img>
                        <div class="d-flex flex-column" style={{width:"100%"}}>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Nome: {livr.name}</label>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Descrição: {livr.descricao}</label>
                            <label class="flex-fill" style={{marginLeft:"10px"}}>Valor: {livr.valor}</label>
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
                        <div className='form-group mb-2'>
                            <label className='form-label'>Número do cartão:</label>
                            <input type='number'
                                placeholder='Digite o número do seu cartão'
                                name='cNumber'
                                value={cNumber}
                                className={`form-control`}
                                onChange={handlecNumber}>
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>CVV:</label>
                            <input type="number"
                                placeholder="Digite o CVV do seu cartão"
                                name="cCVV"
                                value={cCVV}
                                className={`form-control`}
                                onChange={handlecCVV}>  
                            </input>
                        </div>          
                        <button className='btn btn-success' onClick={Comprar}>Comprar</button>             
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Buy
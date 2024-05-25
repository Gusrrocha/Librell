import React from 'react'
import { useState } from 'react'
import { createUser } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {
  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [key, setKey] = useState("")
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        key: ""
    })
    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleKey = (e) => setKey(e.target.value);
    const navigator = useNavigate();
    const saveUser = (e) => {
        e.preventDefault();
        if(validateForm()){
            const user = {username, password, key}
            console.log(user)
            
            createUser(user).then((response) => {
                console.log(response.data);
                
            })
            navigator("/");
        }
    }
    function validateForm(){
        let valid = true;
        const regex = new RegExp("")
        const errorsCopy = {... errors}

        if(username.trim()){
            errorsCopy.username = "";
        } else{
            errorsCopy.username = "Nome de usuário é requerido";
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password = "";
        } else{
            errorsCopy.password = "A senha não pode ser deixada em branco";
            valid = false;
        }

        if(key.trim()){
            errorsCopy.key = "";
        }else{
            errorsCopy.key = "Não deixe o campo em branco";
        }
        
        setErrors(errorsCopy);

        return valid;
    }
    return (
    <div className="container">
        <br/> <br/>
        <div className='linha'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Adicionar Usuário</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Username:</label>
                            <input 
                                type="text" 
                                placeholder='Insira o nome de Usuário'
                                name="username" 
                                value={username}
                                className={`form-control ${ errors.username ? 'is-invalid' : ''}`}
                                onChange={handleUsername}
                            >
                            </input>
                            { errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Password:</label>
                            <input 
                                type="password" 
                                placeholder='Insira a senha de Usuário'
                                name="password" 
                                value={password}
                                className={`form-control ${ errors.password ? 'is-invalid' : ''}`}
                                onChange={handlePassword}
                            >
                            </input>
                            { errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Key:</label>
                            <input 
                                type="number" 
                                min="0"
                                max="1"
                                placeholder='Insira o valor da chave'
                                name="key" 
                                value={key}
                                className={`form-control ${ errors.key ? 'is-invalid' : ''}`}
                                onChange={handleKey}
                            >
                            </input>
                            { errors.key && <div className='invalid-feedback'>{errors.key}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveUser}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUser
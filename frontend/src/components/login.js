import React from 'react'
import { useState } from 'react'
import { findUser, loginUser } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigator = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const logUser = (e) => {
        e.preventDefault();
        try{
            if (!email, !password){
                setError("Por favor, preencha todos os campos.")
                return;
            }
            const user = {email, password}
            console.log(user);
            loginUser(user).then((response) =>{
                console.log(response.data);
                login(response.data.token);
                navigator("/");
            }).catch(error => {
                
                setError('E-mail ou senha incorretos.')
            })
        }catch(error){
            console.error('Falha no login:', error.response ? error.response.data : error.message); 
            setError(error.response ? error.response.data : error.message);  
        }
    }
    return (
        <div className='container'>
            <br/><br/>
            <div className='linha'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center mt-3'>Logar</h2>
                    {error && <p className='text-danger'>{JSON.stringify(error)}</p>}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>E-mail:</label>
                                <input type="text"
                                       placeholder='Digite o endereço de e-mail'
                                       name='email'
                                       value={email}
                                       className={"form-control"}
                                       onChange={handleEmail}
                                       >
                                </input>
                                { error && <div className='invalid-feedback'>{error}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Password:</label>
                                <input type='password'
                                       placeholder='Digite a senha'
                                       name='password'
                                       value={password}
                                       className={`form-control`}
                                       onChange={handlePassword}>
                                </input>
                            </div>
                            <button className='btn btn-success' onClick={logUser}>Entrar</button>
                        </form>
                        <a href='/cadastrar'>Cadastrar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
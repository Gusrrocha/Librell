import React from 'react'
import { useState } from 'react'
import { createUser } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {
  
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const navigator = useNavigate();
    const saveUser = (e) => {
        e.preventDefault();
        if(validateForm()){
            const user = {firstName, lastName, email, password}
            console.log(user)
            
            createUser(user).then((response) => {
                console.log(response.data);
            })
            navigator("/login");
        }
    }
    function validateForm(){
        let valid = true;
       
        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = "";
        } else{
            errorsCopy.firstName = "Primeiro nome é requerido";
            valid = false;
        }
        
        if(lastName.trim()){
            errorsCopy.lastName = "";
        } else{
            errorsCopy.lastName = "Último nome é requerido";
            valid = false;
        }

        if(email.trim()){
            const rege = /[\s\S]+\u0040{1,1}\W*[\s\S]+(\.com)\W*/
            if (rege.test(email)){
                errorsCopy.email = "";
            }
            else{
                errorsCopy.email = "O e-mail inserido não atende ao formato correto. Ex: nome@(hotmail/gmail/outlook/etc...).com";
                valid = false;
            }
        } else{
            errorsCopy.email = "Email é requerido";
            valid = false;
        }

        if(password.trim()){
            const regex = /(\d|[\s\S]){8,8}/
            if(regex.test(password)){
                errorsCopy.password = "";
            }
            else{
                errorsCopy.password = "A senha deve conter 8 dígitos.";
                valid = false;
            }
        } else{
            errorsCopy.password = "A senha não pode ser deixada em branco";
            valid = false;
        }
        
        setErrors(errorsCopy);

        return valid;
    }
    return (
    <div className="container">
        <br/> <br/>
        <div className='linha'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Cadastro</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Primeiro Nome:</label>
                            <input 
                                type="text" 
                                placeholder='Insira o primeiro nome'
                                name="firstName" 
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid' : ''}`}
                                onChange={handleFirstName}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Último Nome:</label>
                            <input 
                                type="text" 
                                placeholder='Insira o último nome'
                                name="lastName" 
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>E-mail:</label>
                            <input 
                                type="email" 
                                placeholder='Insira o endereço de e-mail'
                                name="email" 
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
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
                                maxLength={8}
                            >
                            </input>
                            { errors.password && <div className='invalid-feedback'>{errors.password}</div>}
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
import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { getToken, killToken, login } from '../services/auth'
import { decodeToken } from 'react-jwt'
import { useEffect } from 'react'
import { getUser, updateInfo } from '../services/UserService'
const Profile = () => {
  const [isDisab, setIsDisabled] = useState(true);
  const [user, setUser] = useState({});
  const [firstName, setFirstN] = useState(user.firstName);
  const [lastName, setLastN] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [pw, setPw] = useState(user.password);
  
  const tok = getToken();
  const dec = decodeToken(tok);
  useEffect(() => {
    
    getUser(dec.email).then((response) => {
      setUser(response.data);
    }).catch(err => {
      console.error(err);
    })
  },[])
  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  }, []);
  const navigator = useNavigate();
  const handleFirstN = (e) => setFirstN(e.target.value);
  const handleLastN = (e) => setLastN(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const enableInputs = (e) => {
    e.preventDefault();
    if(user.email !== "admin")
    {
      document.getElementById('firstN').disabled = false;
      document.getElementById('lastN').disabled = false;
      document.getElementById('email').disabled = false;
      document.getElementById('but1').removeAttribute("disabled");
      document.getElementById('but2').disabled = true;
      document.getElementById('but3').removeAttribute("disabled");
    }
    else
    {
      alert("Não pode modificar o admin.");
    }
    
  }
  const handleBack = (e) =>
  {
    e.preventDefault();
    document.getElementById('firstN').disabled = true;
    document.getElementById('lastN').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('but1').disabled = true;
    document.getElementById('but2').disabled = false;
    document.getElementById('but3').disabled = true;
  }
  const handleSave = (e) =>
  {
    e.preventDefault();
    console.log("a")
    const newUser = {firstName,lastName,email};
    console.log(newUser)
    updateInfo(newUser, user.id).then((response) =>
    {
      console.log(response.data)
      login(response.data.token);
    })
    
  }
  const handleDelete = (e) =>
  {
    e.preventDefault();
    if(user.email !== "admin")
    {
      
      if (window.confirm('Tem certeza que deseja deletar sua conta?')){
      fetch("http://localhost:8082/api/v1/user/"+user.id, {
          method: "DELETE"
          }); 
      killToken();
      navigator("/");
      }
    }
    else{
      alert("Não pode deletar a conta admin.");
    }
  }
  return (
    <div>
      <div className='container'>
            <br/><br/>
            <div className='linha'>
                <div className='card col-md-8 offset-md-2'>
                    <h2 className='text-center mt-3'>Perfil</h2>
                    
                    <div className='card-body'>
                        <form>
                            <Row>
                              <Col></Col>
                              <Col xs={4}>
                              <label className='form-label'>Primeiro nome:</label>
                              <input defaultValue={user.firstName} disabled type="text"
                                      id='firstN' 
                                      className={"form-control"}
                                      onChange={handleFirstN}
                                      >
                              </input>
                              </Col>
                              
                              <Col xs={4}>
                              <label className='form-label'>Último nome:</label>
                              <input defaultValue={user.lastName} disabled type="text"
                                      id='lastN' 
                                      className={"form-control"}
                                      onChange={handleLastN}
                                      >
                              </input>
                              </Col>
                              <Col></Col>
                            </Row>
                            <br></br>
                            <Row>
                              <Col xs={2}>
                              <label className='form-label'>E-mail:</label>
                              </Col>
                              <Col xs={8}>
                              <input defaultValue={user.email} disabled type="text"
                                      id='email' 
                                      className={"form-control"}
                                      onChange={handleEmail}
                                      >
                              </input>
                              </Col>       
                            </Row>
                            <br></br>
                            <Row hidden>
                              <Col>
                              <label id="pwlabel" className='form-label'>Senha:</label>
                              </Col>
                              <Col xs={8}>
                              <input type='password'
                                      id='password'
                                      className={`form-control`}
                                      >
                              </input>
                              </Col>
                              <Col>
                              <button><PencilSquare></PencilSquare></button>
                              </Col>
                            </Row>
                            <br></br>
                            <Row hidden>
                              <Col>
                              <label className='form-label'>Senha nova:</label>
                              </Col>
                              <Col xs={8}>
                              <input type='password'
                                      id='password'
                                      className={`form-control`}
                                      >
                              </input>
                              </Col>
                              <Col></Col>
                            </Row>
                            <br></br>
                            <a href="#" onClick={handleDelete}>Deletar conta</a>
                            <Button id="but3" disabled={isDisab} onClick={handleBack} variant='primary' style={{marginLeft:"270px"}}>Voltar</Button>&nbsp;&nbsp;
                            <button id="but2" type="button"  className="btn btn-primary" onClick={enableInputs}>Editar</button>&nbsp;&nbsp;
                            <button type='button' disabled={isDisab} id="but1" className='btn btn-success' onClick={handleSave}>Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
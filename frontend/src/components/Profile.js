import { useState } from 'react'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { getToken, killToken, login } from '../services/auth'
import { decodeToken } from 'react-jwt'
import { useEffect } from 'react'
import { getBool, getUser, updateInfo, updatePw } from '../services/UserService'
import { getPedidos } from '../services/LivroService'
const Profile = () => {
  const [user, setUser] = useState({});
  const [pedidos, setPedido] = useState([]);
  const [oPw, setOPw] = useState("");
  const [nPw, setNPw] = useState("");
  const [errPw, seterrPw] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOPw = (e) => setOPw(e.target.value);
  const handleNPw = (e) => setNPw(e.target.value);


  const navigator = useNavigate();
  let listP = [];
  const tok = getToken();
  const dec = decodeToken(tok);
  let firstName = user.firstName;
  let lastName = user.lastName;
  let email = user.email;
  let pw = user.password;
  function tablePedido(){
    const rows = [];
    for (let i = 0; i < pedidos.length; i++) {
      rows.push(<tr>
                  <td>{i}</td>
                  <td>{pedidos[i].livro.name}</td>
                  <td>{pedidos[i].livro.valor}</td>
                  <td>{pedidos[i].endereco}</td>
                  <td><button type="button" class="btn btn-default btn-smonClick" onClick={() => handleDeleteP(pedidos[i].id)}><Trash/></button></td>
                </tr>
                );
    }
    return <>{rows}</>;
  }
  useEffect(() => {
    setLoading(true);
    getUser(dec.email).then((response) => {
      setUser(response.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
    })
    
  },[])
  useEffect(() => {
    setLoading(true);
    if(Object.keys(user).length !== 0 && user.constructor === Object){
      setLoading(true)
      getPedidos(user.id).then((response) => {
        setPedido(response.data);
        setLoading(false);
      })
    }
  }, [user]);
  useEffect(() =>{
    setLoading(false);
  },[pedidos])
  useEffect(() =>{
    if(pedidos.length !== 0 && pedidos.constructor === Array){
      isLoading ? <>Carregando</> : tablePedido()}
  },[isLoading])
  useEffect(() => {
    
    document.getElementById('but1').disabled = true;
    document.getElementById('but2').disabled = false;
    document.getElementById('but3').disabled = true;
    
  }, []);
  
  

  
  
  const handleFirstN = (e) => firstName = e.target.value;
  const handleLastN = (e) => lastName = e.target.value;
  const handleEmail = (e) => email = e.target.value;

  const enableInputs = (e) => {
    e.preventDefault();
    if(user.email !== "admin")
    {
      document.getElementById('firstN').disabled = false;
      document.getElementById('lastN').disabled = false;
      document.getElementById('email').disabled = false;
      document.getElementById('but1').disabled = false;
      document.getElementById('but2').disabled = true;
      document.getElementById('but3').disabled = false;
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
    
    const newUser = {firstName,lastName,email};
    console.log(user)
    console.log(newUser)
    updateInfo(newUser, user.id).then((response) =>
    {
      console.log(response.data)
      login(response.data.token);
      window.location.reload(false);
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
  const handleDeleteP = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esse pedido?')){
      fetch("http://localhost:8082/api/v1/livro/pedido/"+id, {
          method: "DELETE"
          }); 
  }
  } 
  const handlePwChange = async () =>
  {
    if(oPw.trim() && nPw.trim()){
      let res = await getBool(oPw,user.id);
      if(res.data === true){
        console.log(nPw)
        await fetch ('http://localhost:8082/api/v1/user'+`/update/password/${user.id}`,{
          method: "PUT",
          body: nPw
        })
        seterrPw("");
        handleClose();
      }
      else
      {
        seterrPw("A senha atual não coincide com sua senha de login.");
      }
    }
    else
    {
      seterrPw("Preencha os dados");
    } 
  }
  return (
    <div>
      <div className='container'>
            <br/><br/>
            <div className='linha'>
                <div className='card col-md-8 offset-md-2'>
                    
                    <h2 className='text-center mt-3'>Perfil</h2>
                    <a href="#" onClick={handleShow} style={{position:"absolute",top:"0",right:"0", marginTop:"10px", marginRight:"10px"}}>Mudar senha</a>
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
                            <br></br>
                            <a href="#" onClick={handleDelete}>Deletar conta</a>
                            <Button id="but3" onClick={handleBack} variant='primary' style={{marginLeft:"270px"}}>Voltar</Button>&nbsp;&nbsp;
                            <button id="but2" type="button"  className="btn btn-primary" onClick={enableInputs}>Editar</button>&nbsp;&nbsp;
                            <button type='button'  id="but1" className='btn btn-success' onClick={handleSave}>Salvar</button>
                        </form>
                        <h3>Pedidos</h3>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Produto</th>
                              <th>Valor</th>
                              <th>Endereço</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tablePedido()}
                          </tbody>
                        </Table>
                        
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mudar senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row >
              <Col>
              <label className='form-label'>Senha Atual:</label>
              </Col>
              <Col xs={8}>
              <input type='password'
                      id='password'
                      className={`form-control`}
                      onChange={handleOPw}
                      >
              </input>
              </Col>
              <Col>
              </Col>
            </Row>
            <br></br>
            <Row >
              <Col>
              <label className='form-label'>Senha nova:</label>
              </Col>
              <Col xs={8}>
              <input type='password'
                      id='password'
                      className={`form-control`}
                      onChange={handleNPw}
                      >
              </input>
              </Col>
              <Col></Col>
            </Row>
            <Row>
            {<p style={{color:"red"}}>{errPw}</p>}
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePwChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Profile
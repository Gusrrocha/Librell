import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/api/v1/livro";

export const getBooks = () => axios.get(REST_API_BASE_URL);
export const getPedidos = (id) => axios.post(REST_API_BASE_URL+`/getPedido/${id}`)
export const addLivro = (livro) => axios.post(REST_API_BASE_URL+"/add", livro);
export const compra = (pedido) => axios.post(REST_API_BASE_URL+"/buy", pedido);
export const update = (livro, id) => axios.put(REST_API_BASE_URL+"/"+id, livro)

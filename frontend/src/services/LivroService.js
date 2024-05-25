import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/livro";

export const getBooks = () => axios.get(REST_API_BASE_URL);
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/api/v1/livro";

export const getBooks = () => axios.get(REST_API_BASE_URL);
import axios from "axios";

const HTTP_CLIENT = axios.create({
  baseURL: 'https://hash-front-test.herokuapp.com'
})

export default HTTP_CLIENT
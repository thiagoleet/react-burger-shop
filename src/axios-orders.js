import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-8e93a.firebaseio.com/',
})

export default instance

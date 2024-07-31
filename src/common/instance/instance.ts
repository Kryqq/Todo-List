import axios from 'axios'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY':  'd55fede8-5f23-4768-bbec-f0735dea750a',
  },
}
export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
})

import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newNameObj) => {
  const request = axios.post(baseUrl, newNameObj)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteFromServer = id => {
  axios.delete(`${baseUrl}/${id}`)
}

export default { create, getAll, deleteFromServer, update }
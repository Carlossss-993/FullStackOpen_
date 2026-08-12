import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseURL)
        .then((promise) => promise.data)
}

const add = ( newPerson ) => {
    return axios
        .post(baseURL, newPerson)
        .then((promise) => promise.data)
}

const remove = ( id ) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then((promise) => promise.data)
}

export default { getAll, add, remove }
import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    return axios
        .get(baseURL)
        .then((res) => res.data)
}

const add = ( newPerson ) => {
    return axios
        .post(baseURL, newPerson)
        .then((res) => res.data)
}

const remove = ( id ) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then((res) => res.data[0])
}

const replace = ( id, newPerson ) => {
    return axios
        .put(`${baseURL}/${id}`, newPerson)
        .then((res) => res.data)
}

export default { getAll, add, remove, replace }
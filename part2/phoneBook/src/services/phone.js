import axios from 'axios'

const link = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(link)
        .then((promise) => promise.data)
}

const add = ( newPerson ) => {
    return axios
        .post(link, newPerson)
        .then((promise) => promise.data)
}

export default { getAll, add }
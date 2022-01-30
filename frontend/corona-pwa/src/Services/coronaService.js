export function getList() {
    return fetch('http://localhost:4000/api/covid/getalldata')
        .then(data => data.json())
}
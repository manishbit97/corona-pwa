export function getList() {
    return fetch('http://localhost:4000/pwa/api/covid/getalldata')
        .then(data => data.json())
}
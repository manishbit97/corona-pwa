export function getList() {
    return fetch('http://api.tracky.online/pwa/api/covid/getalldata')
        .then(data => data.json())
}
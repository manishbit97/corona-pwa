export function getList() {
    return fetch('https://api.tracky.online/pwa/api/covid/getalldata')
        .then(data => data.json())
}
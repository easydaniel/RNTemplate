import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

export const GET = (query) => fetch(`hostname?${querystring.stringify(query)}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(res => res.json())

export const POST = (data) => fetch(`hostname`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(res => res.json())

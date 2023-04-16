import { PUBLIC_API_KEY } from "$env/static/public";
export async function callAPI(URL) {
    // Call the API, wait for response, and parse response.

    let cachedURL = `https://livescore-cache-server.onrender.com/cache?url=${encodeURIComponent(URL)}`
    let response = await fetch(cachedURL, settings);
    let responseData = await response.json();
    if (responseData.message) alert(responseData.message);

    return responseData.response;
}

// Authorization needed to connect to the API.
const settings = {
    headers: {
        "X-RapidAPI-Key": PUBLIC_API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
};
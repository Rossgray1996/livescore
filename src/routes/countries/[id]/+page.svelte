<script>
    import { PUBLIC_API_KEY } from "$env/static/public";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    onMount(loadData);

    async function callAPI(URL) {
        // Call the API, wait for response, and parse response.
        let response = await fetch(URL, settings);
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

    let leagues = [];
    $: top5 = leagues.slice(0, 5);
    async function loadData() {
        leagues = await callAPI(
            `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${$page.params.id}`
        );
    }

    onMount(function () {
        page.subscribe(loadData);
    });
</script>

<a href="/countries/England">England</a> <br />
<a href="/countries/Spain">Spain</a> <br />
<a href="/countries/France">France</a> <br />
<a href="/countries/Italy">Italy</a> <br />
<a href="/countries/Scotland">Scotland</a> <br />
<a href="/countries/Germany">Germany</a> <br />
<a href="/countries/Portugal">Portugal</a> <br />
<a href="/countries/Netherlands">Netherlands</a> <br />

<ul>
    {#each top5 as league}
        <li>
            <a href="/leagues/{league.league.id}">{league.league.name}</a
            >{league.league.name}
        </li>
    {/each}
</ul>

<style>
    * {
        background-color: orangered;
    }

    li {
        display: inline-block;
        border: 1px solid orangered;
        margin: 5px;
        padding: 10px;
        vertical-align: top;
    }
    ul {
        color: orangered;
        font-family: "Comic Sans MS", cursive;
        font-size: 1em;
    }

    a {
        color: white;
        font-size: 1em;
        font-family: "Comic Sans MS", cursive;
        border-style: solid;
    }
</style>

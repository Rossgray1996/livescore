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

<div>
    <a
        href="/countries/England"
        style="text-decoration; none; color : white; margin-right:30px;"
        >England</a
    >
    <a
        href="/countries/Spain"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Spain</a
    >
    <a
        href="/countries/France"
        style="text-decoration : none; color :white; margin-right:30px; "
        >France</a
    >
    <a
        href="/countries/Italy"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Italy</a
    >
    <a
        href="/countries/Scotland"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Scotland</a
    >
    <a
        href="/countries/Germany"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Germany</a
    >
    <a
        href="/countries/Portugal"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Portugal</a
    >
    <a
        href="/countries/Netherlands"
        style="text-decoration : none; color : white; margin-right:30px;"
        >Netherlands</a
    > <br />
</div>

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
        font-size: 1.7em;
        font-family: "Comic Sans MS", cursive;
        border-style: solid;
        margin-right: 30px;
    }

    div {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        width: fit-content;
        block-size: fit-content;
    }
</style>

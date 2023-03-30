<script>
    import { PUBLIC_API_KEY } from "$env/static/public";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Datepicker } from "svelte-mui";

    onMount(loadData);
    function formatDate(inputDate) {
        // Create a new date object with the desired date
        const date = new Date(inputDate);

        // Define the options for formatting the date
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        // Format the date using the Intl.DateTimeFormat object
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
        );

        return formattedDate; // Output: "August 15, 2022, 3:30 PM"
    }

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

    let fixtures = [];
    let leagueName = "loading";

    async function loadData() {
        fixtures = await callAPI(
            `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${$page.params.id}&date=${$page.params.date}&season=2022`
        );
        if (fixtures.length) {
            leagueName = fixtures[0].league.name;
        } else {
            leagueName = "no matches this date";
        }
    }

    onMount(function () {
        page.subscribe(loadData);
    });
</script>

<a href="/countries/England"> England</a> <br />
<a href="/countries/Spain">Spain</a> <br />
<a href="/countries/France">France</a> <br />
<a href="/countries/Italy">Italy</a> <br />
<a href="/countries/Scotland">Scotland</a> <br />
<a href="/countries/Germany">Germany</a> <br />
<a href="/countries/Portugal">Portugal</a> <br />
<a href="/countries/Netherlands">Netherlands</a> <br />
<h1>{leagueName}</h1>
<ul>
    {#each fixtures as fixture}
        <li>
            {formatDate(fixture.fixture.date)} <br />
            {fixture.teams.home.name}
            ({fixture.goals.home}) vs ({fixture.goals.away}) {fixture.teams.away
                .name}
        </li>
    {/each}
</ul>

<style>
    * {
        background-color: orangered;
    }
    li {
        display: inline-block;
        border: 1px solid white;
        margin: 5px;
        padding: 10px;
        vertical-align: top;
    }
    ul {
        color: white;
        font-family: "Comic Sans MS", cursive;
        font-size: 1em;
    }
    a {
        color: white;
        font-size: 1em;
        font-family: "Comic Sans MS", cursive;
    }
    h1 {
        color: white;
    }
</style>

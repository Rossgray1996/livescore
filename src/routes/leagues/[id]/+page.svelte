<script>
    import { PUBLIC_API_KEY } from "$env/static/public";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Datepicker } from "svelte-mui";
    import { goto } from "$app/navigation";

    let date = null;

    function dateChanged() {
        if (date && date != "Invalid Date") {
            let urlDate = date.toISOString().split("T")[0];
            goto(`/leagues/${$page.params.id}/${urlDate}`);
        }
    }

    $: date, dateChanged();
    function formatDate(inputDate) {
        // Create a new date object with the desired date
        const date = new Date(inputDate);

        // Define the options for formatting the date
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        // Format the date using the Intl.DateTimeFormat object
        const formattedDate = new Intl.DateTimeFormat("en-UK", options).format(
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
            `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${$page.params.id}&season=2022`
        );
        leagueName = fixtures[0].league.name;
    }

    onMount(function () {
        page.subscribe(loadData);
    });
</script>

<svelte:head>
    <title>league calender {leagueName}</title>
</svelte:head>
<h1>{leagueName}</h1>

<button variant="contained" class="button"> <a href="/"> Home</a></button>

<div class="card">
    <Datepicker header={false} bind:value={date} />
</div>

<a href="/countries/England"> England</a> <br /> <br />
<a href="/countries/Spain">Spain</a> <br /> <br />
<a href="/countries/France">France</a> <br /> <br />
<a href="/countries/Italy">Italy</a> <br /> <br />
<a href="/countries/Scotland">Scotland</a> <br /><br />
<a href="/countries/Germany">Germany</a> <br /><br />
<a href="/countries/Portugal">Portugal</a> <br /><br />
<a href="/countries/Netherlands">Netherlands</a> <br />

<style>
    * {
        background-color: orangered;
    }

    a {
        color: white;
        font-size: 1em;
        font-family: "Comic Sans MS", cursive;
        border-style: solid;
    }
    h1 {
        color: white;
        text-align: center;
    }
    .card {
        display: inline-block;
        box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
            0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 35%;
        color: white;
    }

    .button {
        background-color: orangered;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
</style>

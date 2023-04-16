<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Datepicker } from "svelte-mui";
    import { callAPI } from "../API.js";

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
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
            date
        );

        return formattedDate; // Output: "August 15, 2022, 3:30 PM"
    }

    let fixtures = [];
    let leagueName = "loading";
    let filteredFixtures = [];

    async function loadData() {
        fixtures = await callAPI(
            "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all"
        );
        const leagueIDs = [39, 40];
        filteredFixtures = fixtures.filter((item) =>
            leagueIDs.includes(item.league.id)
        );
        console.log(fixtures);
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

<svelte:head>
    <title>Live Score</title>
</svelte:head>
<h1>Live Games</h1>
<ul>
    {#each filteredFixtures as fixture}
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
        font-size: 1.5em;
        font-family: "Comic Sans MS", cursive;
        margin-right: 30px;
        display: inline-block;
        padding: 0px 5px 0px 10px;
        text-align: center;
        position: relative;
    }
    h1 {
        color: white;
        text-align: center;
    }
    div {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        width: fit-content;
        block-size: fit-content;
        text-align: center;
        align-items: center;
    }
</style>

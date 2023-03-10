<script>
   import { PUBLIC_API_KEY } from '$env/static/public'
   import { onMount } from 'svelte';
   import { page } from '$app/stores';

   	// Authorization needed to connect to the API.
	const settings = {
		"headers": {
			"X-RapidAPI-Key": PUBLIC_API_KEY,
			"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
		}
	};
    async function callAPI(URL) {
		// Call the API, wait for response, and parse response.
		let response = await fetch(URL, settings);
		let responseData = await response.json();
		return responseData.response;
	}

    let leagues = [];
    $: top5 = leagues.slice(0,5);
	
    async function loadData() {
		leagues = await callAPI(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${$page.params.id}`)
	}
	page.subscribe(loadData);
</script>

<a href="/countries/England">England</a> <br>
<a href="/countries/Spain">Spain</a> <br>
<a href="/countries/France">France</a> <br>
<a href="/countries/Italy">Italy</a> <br>
<a href="/countries/Scotland">Scotland</a> <br>
<a href="/countries/Germany">Germany</a> <br>
<a href="/countries/Portugal">Portugal</a> <br>
<a href="/countries/Netherlands">Netherlands</a> <br>



<ul>
	{#each top5 as league}
		<li>{league.league.name} {league.league.id}</li>
	{/each}
</ul> 
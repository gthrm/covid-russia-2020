<script>
  import Statistics from "./components/Statistics.svelte";
  async function getData() {
    const res = await fetch(
      "https://api.quarantine.country/api/v1/spots/week?region=russia"
    );
    const { data } = await res.json();
    if (data) {
      return data;
    } else {
      throw new Error(data);
    }
  }
  export let promise = getData();
  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  .root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  section {
    padding: 10px 30px;
    margin: 0 10px;
  }

  @media (min-width: 640px) {
    main {
      max-width: 1200px;
    }
    h1 {
      font-size: 4em;
    }
  }
</style>

<main>
  <h1>{name}</h1>
  {#await promise}
    <p>...waiting</p>
  {:then data}
    <Statistics
      data={{ labels: Object.keys(data), datasets: [{ label: 'Total Cases', data: Object.values(data).map((item) => item.total_cases), backgroundColor: 'orange', borderColor: 'blue', borderWidth: 1 }, { label: 'Deaths', data: Object.values(data).map((item) => item.deaths), backgroundColor: 'red', borderColor: 'blue', borderWidth: 1 }, { label: 'Recovered', data: Object.values(data).map((item) => item.recovered), backgroundColor: 'green', borderColor: 'blue', borderWidth: 1 }] }} />
    <div class="root">
      {#each Object.entries(data) as [date, day]}
        <section>
          <h2>{date}</h2>
          <p>Total cases: {day.total_cases.toLocaleString()}</p>
          <p>Deaths: {day.deaths.toLocaleString()}</p>
          <p>Recovered: {day.recovered.toLocaleString()}</p>
          <p>Critical: {day.critical.toLocaleString()}</p>
          <p>Tested: {day.tested.toLocaleString()}</p>
        </section>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  <h4>
    Information provided by open api service
    <a
      href="https://documenter.getpostman.com/view/1294665/SzYdSGX6"
      alt="Coronavirus API">Coronavirus API</a>
  </h4>
</main>

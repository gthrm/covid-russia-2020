<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  export let data = [];
  let options = {
    scales: {
      yAxes: [
        {
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: "People",
            fontFamily: "Montserrat",
            fontColor: "black",
          },
          ticks: {
            fontFamily: "Montserrat",
            stepSize: 10000000,
          },
        },
      ],
      xAxes: [{}],
    },
  };
</script>

<div class="chart">
  <Bar {data} {options} />
</div>

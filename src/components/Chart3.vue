<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Agosto"
        ],
        datasets: [
          {
            label: "Ventas globales",
            data: [200, 150, 100, 256, 212, 158, 163],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Unidades"
        },
         scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      }
      }
    );
  }
};
</script>
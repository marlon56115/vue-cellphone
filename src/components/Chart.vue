<script>
import { Bar } from "vue-chartjs";
import { storage, db } from "../database/firebase";

export default {
  props: {
    labels: Array,
    datasets: Array,
  },
  extends: Bar,
  async mounted() {
    var anunciosLocal = [];
    var marcas = [];
    var datasets = [
      {
        label: "Cantidad",
        backgroundColor: "#f87979",
        data: [],
      },
    ];
    try {
      const snapshot = await db.collection("anuncios").get();
      const events = [];
      snapshot.forEach((doc) => {
        let eventoData = doc.data();
        eventoData.id = doc.id;
        events.push(eventoData);
      });
      anunciosLocal = events;
    } catch (error) {
      console.log(error);
    }

    anunciosLocal.forEach((anuncio) => {
      let nuevoArray = [];
      nuevoArray = anunciosLocal.filter((an) => an.marca == anuncio.marca);
      anuncio.cantidad = nuevoArray.length;
      anuncio.subtotal = anuncio.cantidad * anuncio.precio;
    });
    var filtrado = [];
    anunciosLocal.forEach((anuncio) => {
      let nuevoArray = [];
      nuevoArray = anunciosLocal.filter((an) => an.marca == anuncio.marca);
      if (!filtrado.find((a) => a.id === nuevoArray[0].id)) {
        filtrado.push(nuevoArray[0]);
      }
    });
    filtrado.forEach((an) => {
      marcas.push(an.marca);
      datasets[0].data.push(an.cantidad);
    });

    let data = {
      labels: marcas,
      datasets: datasets,
    };
    let options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    this.renderChart(data,options);
  },
};
</script>

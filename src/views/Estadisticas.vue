<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title> Marcas mas vendidas </v-card-title>
            <v-card-text>
              <Chart />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title> Modelos mas vendidas </v-card-title>
            <v-card-text>
              <Chart2 />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-text>
              <Chart3 />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-text>
              <Chart4 />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import Chart4 from "../components/Chart4";

import { mapState } from "vuex";
import { storage, db } from "../database/firebase";

export default {
  name: "anuncio",
  components: {
    Chart,
    Chart2,
    Chart3,
    Chart4,
  },
  data: () => ({}),
  created() {
    this.$vuetify.goTo(0);
  },
};
</script>

<style></style>

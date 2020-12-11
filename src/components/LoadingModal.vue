<template>
  <!--Modal mientras este guardando-->
  <div class="text-center">
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card dark>
        <v-card-text>
          Guardando Anuncio
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "loadingmodal",
  props: {
    dialog: Boolean,
  },
};
</script>


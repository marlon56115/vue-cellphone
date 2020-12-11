<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <!--activador de filtros, es el boton flotante-->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mb-8 red elevation-0 white--text"
          v-bind="attrs"
          v-on="on"
          fab
          small
          absolute
          fixed
          left
          bottom
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <!--Card de filtros-->
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Filtros de busqueda</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <!--Componente de los filtros-->
          <Filters />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small text color="error" @click="dialog = false">
            <v-icon left>
              mdi-close
            </v-icon>
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import Filters from "./Filters";

export default {
  name: "dialogFilter",
  components: { Filters },
  props: {},
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>

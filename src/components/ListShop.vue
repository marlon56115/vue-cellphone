<template>
  <div>
    <!--aqui se muestran los anuncios-->
    <v-data-table
      :headers="headers"
      :items="carrito"
      sort-by="titulo"
      class="elevation-1"
      hide-default-footer
    >
    <!--header de la tabla-->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mi carrito</v-toolbar-title>
        </v-toolbar>
        <v-divider horizontal></v-divider>
      </template>
      <!--Modificacion donde se muestra el titulo-->
      <template v-slot:item.titulo="{ item }">
        <v-row>
          <v-col cols="12" md="3">
            <v-img
              max-width="175"
              max-height="100"
              :src="item.imagenes[0]"
              lazy-src="../assets/grey.jpg"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey "
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" md="9">
            {{ item.titulo }}
            <v-divider class="float-right" vertical></v-divider>
          </v-col>
        </v-row>
      </template>
      <!--Modificacion donde se muestra la cantidad-->
      <template v-slot:item.cantidad="{ item }">
        <v-btn icon @click="quitToCart(item)" :disabled="item.cantidad == 0">
          <v-icon small v-if="item.cantidad > 1">
            mdi-minus
          </v-icon>
          <v-icon small v-else>
            mdi-trash-can-outline
          </v-icon>
        </v-btn>

        {{ item.cantidad }}
        <v-btn icon @click="addToCart(item)">
          <v-icon small>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <!--Modificacion donde se muestra el precio-->
      <template v-slot:item.precio="{ item }"> $ {{ item.precio }} </template>
      <!--Modificacion donde se muestra el subtotal-->
      <template v-slot:item.subtotal="{ item }">
        $ {{ item.subtotal }}
      </template>
      <!--Para eliminar el footer-->
      <template v-slot:footer> </template>
      <!--Cuando no hayan articulos para redireccionar-->
      <template v-slot:no-data>
        <v-btn color="primary" to="/">
          Empieza a comprar!
        </v-btn>
      </template>
    </v-data-table>
    <!--Resumen de compras-->
    <v-card class="mt-5">
      <v-card-title>
        Resumen
      </v-card-title>
      <v-card-text> Total: ${{ getTotal }} </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      filtrado: [],
      dialogDelete: false,
      headers: [
        {
          text: "Producto",
          align: "start",
          sortable: false,
          value: "titulo",
        },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Subtotal", value: "subtotal" },
      ],
    };
  },
  created() {},

  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["getTotal"]),
  },

  methods: {
    ...mapMutations(["addToCart", "quitToCart"]),
  },
};
</script>

<style></style>

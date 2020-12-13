<template>
  <div>
    <v-row>
      <v-col cols="12" lg="9">
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
            <v-divider horizontal ></v-divider>
          </template>
          <!--Modificacion donde se muestra el titulo-->
          <template v-slot:item.titulo="{ item }">
            <v-row >
              <v-col cols="12" md="3">
                <v-img
                  max-width="175"
                  max-height="100"
                  :src="item.imagenes[0]"
                  lazy-src="../assets/grey.jpg"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey "
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" md="6">
                {{ item.titulo }}
              </v-col>
              <v-divider class="float-right" vertical ></v-divider>
            </v-row>
          </template>
          <!--Modificacion donde se muestra el precio-->
          <template v-slot:item.precio="{ item }">
                 <strong>$ {{ item.precio }}</strong>
          </template>
          <!--Modificacion donde se muestra la cantidad-->
          <template v-slot:item.cantidad="{ item }">
            <v-row no-gutters>
              <v-col cols="4"  class=" d-flex justify-center">
                <v-btn
                  icon
                  @click="quitToCart(item)"
                  :disabled="item.cantidad == 0"
                  class="mx-auto"
                >
                  <v-icon small v-if="item.cantidad > 1">
                    mdi-minus
                  </v-icon>
                  <v-icon small v-else color="red">
                    mdi-trash-can-outline
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4"  class=" d-flex justify-center"
                >
                <p class="mt-2">{{ item.cantidad }}</p>
                
              </v-col>
              <v-col cols="4"  class=" d-flex justify-center"
                >
                <v-btn icon @click="addToCart(item)">
                  <v-icon small>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
          
          <!--Modificacion donde se muestra el subtotal-->
          <template v-slot:item.subtotal="{ item }">
            <strong>$ {{ item.subtotal}}</strong>
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
      </v-col>
      <v-col cols="12" lg="3">
        <!--Resumen de compras-->
        <v-card class="mt-n8">
          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="user" src="../assets/profile.png" />
            </v-avatar>
            <p class="ml-3 black--text">
              Usuario
            </p>
          </v-card-title>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              Resumen de compra
            </div>

            <v-timeline align-top dense>
              <v-timeline-item color="deep-purple lighten-1" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Cantidad de articulos</strong>
                  </div>
                  <div>{{ getTotalCarrito }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Total a pagar</strong>
                  </div>
                  <div>$ {{ getTotal }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="red" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Acciones</strong>
                  </div>
                  <div>
                    <v-btn
                      max-width="175"
                      width="100%"
                      small
                      class="my-2"
                      to="/"
                      color="red lighten-3"
                      >Finalizar <v-icon right>mdi-check</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
    ...mapGetters(["getTotal", "getTotalCarrito"]),
  },

  methods: {
    ...mapMutations(["addToCart", "quitToCart"]),
  },
};
</script>

<style></style>

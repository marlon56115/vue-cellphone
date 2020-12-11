<template>
  <div>
    <!--Modal nuevo anuncio que se muestra en el nav drawer-->
    <NuevoAnuncio @nuevoanunciooff="nuevoAnuncioOff" :dialog="nuevoAnuncio" />
    <!--Appbar completa-->
    <v-app-bar app dark min-height="65">
      <!--Icono del drawer-->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="$vuetify.breakpoint.smAndDown"
      >
      </v-app-bar-nav-icon>
      <!--Brand-->
      <router-link to="/" class="brand white--text">
        <v-icon>
          mdi-shopping
        </v-icon>
        Cell Phone
      </router-link>
      <v-spacer></v-spacer>
      <!--barra de menu-->
      <v-toolbar-items>
        <v-btn to="/" v-if="$vuetify.breakpoint.mdAndUp" text>
          Home
          <v-icon right>mdi-home</v-icon>
        </v-btn>
        <v-btn to="/estadisticas" v-if="$vuetify.breakpoint.mdAndUp" text>
          Estadisticas
          <v-icon right>mdi-chart-areaspline</v-icon>
        </v-btn>
        <v-btn @click="nuevoAnuncioOn" v-if="$vuetify.breakpoint.mdAndUp" text>
          Nuevo Anuncio
          <v-icon right>mdi-plus-box</v-icon>
        </v-btn>
        <v-badge :content="getTotalCarrito" color="error" overlap class="mt-4">
          <v-btn icon to="/carrito" text class="mt-n2 mr-n2">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </v-toolbar-items>
      <!--Nav cuando esta en md y sm-->
      <v-navigation-drawer app v-model="drawer" absolute temporary dark>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="../assets/profile.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Usuario</v-list-item-title>
              <v-list-item-subtitle>Iniciar Sesion</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list dense>
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="nuevoAnuncioOn">
            <v-list-item-icon>
              <v-icon>mdi-plus-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Nuevo Anuncio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/estadisticas">
            <v-list-item-icon>
              <v-icon>mdi-chart-areaspline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Estadisticas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
  </div>
</template>

<script>
import NuevoAnuncio from "./NuevoAnuncio";
import { mapState, mapGetters } from "vuex";

export default {
  name: "navbar",
  components: {
    NuevoAnuncio,
  },
  data() {
    return {
      drawer: false,
      nuevoAnuncio: false,
    };
  },
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["getTotalCarrito"]),
  },
  methods: {
    nuevoAnuncioOn() {
      this.nuevoAnuncio = true;
    },
    nuevoAnuncioOff() {
      this.nuevoAnuncio = false;
    },
  },
};
</script>

<style>
.brand {
  text-decoration: none;
  font-size: 1.5rem !important;
}
</style>

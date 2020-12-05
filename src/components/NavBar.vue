<template>
  <div>
      <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="$vuetify.breakpoint.smAndDown">
         </v-app-bar-nav-icon>
      <v-toolbar-title> Cell Phone </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" v-if="$vuetify.breakpoint.mdAndUp">
        Home
        <v-icon right>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/estadisticas" v-if="$vuetify.breakpoint.mdAndUp">
        Estadisticas
        <v-icon right>mdi-chart-areaspline</v-icon>
      </v-btn>
      <NuevoAnuncio />
      <v-badge
        :content="carrito.length"
        color="error"
        overlap
        
      >
      <v-btn icon to="/carrito">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      </v-badge>

      <v-navigation-drawer app v-model="drawer" absolute temporary dark>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
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
import NuevoAnuncio from './NuevoAnuncio'
import {mapState} from 'vuex';
export default {
    name:'navbar',
    components:{
        NuevoAnuncio
    },
    data() {
        return{
            drawer: false,
        }
    },
    computed: {
      ...mapState(['carrito'])
    },

}
</script>

<style>

</style>
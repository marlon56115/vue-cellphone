<template>
  <div>
    <NuevoAnuncio @nuevoanunciooff="nuevoAnuncioOff" :dialog="nuevoAnuncio"/>
      <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="$vuetify.breakpoint.smAndDown">
         </v-app-bar-nav-icon>
        <router-link to="/">
           Cell Phone 
         </router-link>
         <v-spacer></v-spacer>
      
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
      <v-badge
        :content="carrito.length"
        color="error"
        overlap
        class="mt-3"
      >
      <v-btn icon to="/carrito" text>
      
        <v-icon >mdi-cart</v-icon>
      </v-btn>
      </v-badge>
      </v-toolbar-items>

      <v-navigation-drawer app v-model="drawer" absolute temporary dark >
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
            nuevoAnuncio:false
        }
    },
    computed: {
      ...mapState(['carrito'])
    },
    methods: {
      nuevoAnuncioOn(){
        this.nuevoAnuncio=true;
      },
      nuevoAnuncioOff(){
        this.nuevoAnuncio=false;
      }
    }

}
</script>

<style>

</style>
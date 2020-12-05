<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Anuncio from "./views/Anuncio";
import Estadisticas from "./views/Estadisticas";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"


export default {
  name: "App",

  components: {
    Anuncio,
    Estadisticas,
    NavBar,
    Footer
  },

  data () {
    return{
  }},

};
</script>

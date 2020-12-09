<template>
  <div>
    <v-container>
      <listShop/>
    </v-container>
  </div>
</template>

<script>
import listShop from '../components/ListShop'
export default {
    name:'carrito',
    components:{
      listShop
    },
    created(){
      this.$vuetify.goTo(0);
    }
}
</script>

<style>

</style>
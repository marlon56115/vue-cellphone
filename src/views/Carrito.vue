<template>
  <div>
    <v-container fluid>
      <listShop />
    </v-container>
  </div>
</template>

<script>
import listShop from "../components/ListShop";
export default {
  name: "carrito",
  components: {
    listShop,
  },
  mounted() {
    this.$vuetify.goTo(0);
  },
};
</script>


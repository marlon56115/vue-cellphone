<template>
  <div>
    <v-container fluid >
      <v-row class="mx-md-16 px-md-10 grey lighten-4 rounded">
        <v-col cols="12" sm="6" >
          <v-carousel
          height="400"
          >
          <v-carousel-item
            v-for="(item,i) in anuncioDetalle.imagenes"
            :key="i"
            :src="item"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <v-card
            class="mx-auto"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{anuncioDetalle.titulo}}
              </p>
              <p class="font-weight-black text-h4">${{anuncioDetalle.precio}}</p>
              <p class="text-decoration-line-through ">${{anuncioDetalle.precio-5}}</p>
              <p class="d-inline mt-1"> <strong> Vendedor:</strong> {{anuncioDetalle.vendedor}} </p>
               <p class="d-inline"> <strong> Telefono:</strong> {{anuncioDetalle.telefono}}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn  >
                Comprar
                <v-icon>mdi-shopping</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn 
              icon 
              @click="addToCart(item)"
               fab
               dark
                color="indigo">
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12"  class="d-sm-none d-md-inline">
          <p class="text-center text-h5">Especificaciones tecnicas</p>
        </v-col>
        <v-col cols="12" sm="6">
           <v-list>
            <v-list-group
              v-for="item in especificaciones"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="text--primary mb-2">
              {{anuncioDetalle.descripcion}}
              
            </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState} from 'vuex';
export default {
    name:'anuncio',
    data() {
      return{
        
        }
      
    },
    computed: {
      ...mapState(['anuncioDetalle','especificaciones'])
      }
}
</script>

<style>

</style>
<template>
  <div>
    <v-container  >
      <v-row class="mx-md-16 grey lighten-4 rounded">
        <v-col cols="12" sm="6" >
          <v-card :loading="loading">
            <v-card-text>
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
            </v-card-text>
          </v-card>
          
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <v-card
            class="mx-auto"
            :loading="loading"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{anuncioDetalle.titulo}}
              </p>
              <p class="font-weight-black text-h4">${{anuncioDetalle.precio}}</p>
              <p class="text-decoration-line-through ">${{anuncioDetalle.precio-5}}</p>
              <v-chip
              class=""
              color="light"
              outlined
              x-small
            >
              <v-icon left small>
                mdi-account
              </v-icon>
              {{anuncioDetalle.vendedor}}
            </v-chip>
              <v-chip
              class=""
              color="light"
              outlined
              x-small
            >
              <v-icon left small>
                mdi-phone-outgoing
              </v-icon>
              {{anuncioDetalle.telefono}}
            </v-chip>
            <v-chip
              class=""
              color="light"
              outlined
              x-small
            >
              <v-icon left small>
                mdi-google-maps
              </v-icon>
              Santa Ana
            </v-chip>
              <v-row
                align="center"
                class="mx-0 mt-3"
                no-gutters
            >
            <v-col>
              <v-rating
                :value="Math.floor(Math.random()*10)"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>
            </v-col>
            <v-col>
             Publicado {{momentL(anuncioDetalle.creado)}}
            </v-col>
            </v-row>
               
            </v-card-text>
            <v-card-actions class="grey lighten-3">
              <v-btn 
              @click="addToCart(anuncioDetalle)"
               dark
               block
              color="primary elevation-0">
                <v-icon dark left>mdi-cart-plus</v-icon>
                Añadir al carrito
              </v-btn>
            </v-card-actions>
          </v-card :loading="loading">
        </v-col>
        <v-col cols="12" >
          <p class="text-center text-h5">Especificaciones tecnicas</p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card :loading="loading">
            <v-card-text>
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
            </v-card-text>
          </v-card>
           
        </v-col>
        <v-col cols="12" sm="6">
          <v-card :loading="loading">
            <v-card-title>
              Descripcion
            </v-card-title>
            <v-card-text>
              <div class="text--primary mb-2 text-h5">
              {{anuncioDetalle.descripcion}}
            </div>
            </v-card-text>
          </v-card>
            
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import {storage,db} from '../database/firebase';
var ref=storage.ref();
import moment from 'moment';
moment.locale('es');
export default {
    name:'anuncio',
    data() {
      return{
        anuncioDetalle:{},
        especificaciones:[],
        loading:true
      }
    },
    created() {
      this.traerAnuncio();
    },
      methods: {
        ...mapMutations(['addToCart']),
        momentL(s){
          if(s!=undefined){
            return moment(s.seconds,'X').fromNow();
          }
          return '';
      },
      async traerAnuncio(){
        let res=await db.collection('anuncios').doc(this.$route.params.id).get();
        let anuncio=await res.data();
        anuncio.id=res.id;
        anuncio.imagenes=[];
        this.insertarImagenes(anuncio);
        this.setAnuncioDetalle(anuncio);
        this.anuncioDetalle=anuncio;
        this.loading=false;
      },
      async insertarImagenes(anuncio){
           const list=await ref.child('S_'+anuncio.id+'/').listAll();
           console.log(list);
            list.items.forEach(async imgRef=>{ //obtenemos el id de cada anuncio para obtener le referencia de  la carpeta de sus fotos
                 const url=await imgRef.getDownloadURL();
                      anuncio.imagenes.push(url);
            }); 
        },

      setAnuncioDetalle(anuncio){
       this.especificaciones=[{
        action: 'mdi-alert-decagram',
        items: [{ title: anuncio.estado }],
        title: 'Estado',
        active:true
      },
      {
        action: 'mdi-cellphone-android',
        items: [{ title: anuncio.marca }],
        title: 'Marca',
      },
      {
        action: 'mdi-cellphone-android',
        items: [{ title: anuncio.modelo }],
        title: 'Modelo',
      },
      {
        action: 'mdi-cellphone-screenshot',
        items: [{ title: anuncio.pantalla+' pulgadas' }],
        title: 'Tamaño de pantalla',
      },
      {
        action: 'mdi-android',
        items: [{ title: anuncio.sistema }],
        title: 'Sistema Operativo',
      },
      {
        action: 'mdi-memory',
        items: [{ title: anuncio.ram+' GB' }],
        title: 'Memoria RAM',
      },
      {
        action: 'mdi-memory',
        items: [{ title: anuncio.rom+' GB'}],
        title: 'Memoria de almacenamiento',
      }
    ];
       
    }
  }
}
</script>

<style>

</style>
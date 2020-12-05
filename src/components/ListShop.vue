<template>
<div>
  <v-data-table
    :headers="headers"
    :items="filtrado"
    sort-by="titulo"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mi carrito</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
    </template>
    <template v-slot:item.cantidad="{ item }">
        <v-btn 
        icon 
        @click="disminuirCantidad(item)"
        :disabled="item.cantidad==0"
        >
            <v-icon
            small
            >
            mdi-minus
            </v-icon>
        </v-btn>
      
        {{item.cantidad}}
        <v-btn 
        icon
        @click="aumentarCantidad(item)"
        >
        <v-icon
            small
        >
            mdi-plus
        </v-icon>
       </v-btn>
    </template>
    <template v-slot:item.precio="{item}">
      $ {{item.precio}}
    </template>
    <template v-slot:item.subtotal="{item}">
      $ {{item.subtotal}}
    </template>
    <template v-slot:footer>
      Total: ${{total}}
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        to="/"
      >
        Empieza a comprar!
      </v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    data() {
        return {
      filtrado:[],
      dialogDelete: false,
      headers: [
        {
          text: 'Producto',
          align: 'start',
          sortable: false,
          value: 'titulo',
        },
        { text: 'Precio', value: 'precio' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Subtotal', value: 'subtotal' },
      ],
      
    }},
    created() {

    },

    computed: {
      ...mapState(['carrito']),
      total(){
          var total=0;
          this.filtrado.forEach(item=>{
              total+=item.subtotal;
          });
          return total;
      }
      
    },

    created () {
        this.carritoFiltrado();
    },

    methods: {
       async aumentarCantidad(item){
             let i =await this.filtrado.find(a=>a.id===item.id);
             i.cantidad+=1;
             i.subtotal=i.precio*i.cantidad;
        },
        async disminuirCantidad(item){
            let i =await this.filtrado.find(a=>a.id===item.id);
             i.cantidad-=1;
             i.subtotal=i.precio*i.cantidad;
        },
        carritoFiltrado(){
           var carritoLocal=[];
            this.carrito.forEach(anuncio=>{
                carritoLocal.push(anuncio);
            });

            carritoLocal.forEach(anuncio=>{
                anuncio.cantidad=undefined;
                anuncio.subtotal=undefined;
            });

            carritoLocal.forEach(anuncio=>{
                let nuevoArray=[];
                nuevoArray=carritoLocal.filter(an=>an.id==anuncio.id);
                anuncio.cantidad=nuevoArray.length;
                anuncio.subtotal=anuncio.cantidad*anuncio.precio;
            });
            
            var filtrado=[];
            carritoLocal.forEach(anuncio=>{
                let nuevoArray=[];
                nuevoArray=carritoLocal.filter(an=>an.id==anuncio.id);
                if(nuevoArray.length>0){
                    if(!filtrado.find(a=>a.id===nuevoArray[0].id)){
                        filtrado.push(nuevoArray[0]);
                }
                }
            });
            this.filtrado=filtrado;
            //return this.filtrado;
      },
      
      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
    },
  }
</script>

<style>

</style>
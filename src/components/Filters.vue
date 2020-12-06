<template>
  <div >
        <v-row no-gutters>
          <v-col cols="12" class="pl-5">
            <p class="mt-5 mb-n1">Marcas</p>
            <v-checkbox v-for="(item,index) in marcas"
            :key="index"
            hide-details
            class="my-n1"
            v-model="localMarca"
            :label="item"
            :value="item"
            dense
            @change="actualizarFiltros({localMarca,localSistema,localPrecio,localEstados})"
          ></v-checkbox>
          <p class="mt-5 mb-n1">Sistemas</p>
          <v-checkbox v-for="(item,index) in sistemas"
            :key="index+5"
            class="my-n1"
            hide-details
            v-model="localSistema"
            :label="item"
            :value="item"
            dense
            @change="actualizarFiltros({localMarca,localSistema,localPrecio,localEstados})"
          ></v-checkbox>
          <p class="mt-5 mb-n1">Estados</p>
          <v-checkbox v-for="(item,index) in estados"
            :key="index+20"
            class="my-n1"
            hide-details
            v-model="localEstados"
            :label="item"
            :value="item"
            dense
            @change="actualizarFiltros({localMarca,localSistema,localPrecio,localEstados})"
          ></v-checkbox>

          <p class="mt-5 mb-n5">Precio</p>
          <v-row>
            <v-col>
              <v-text-field
              type="number"
                label="Min."
                v-model.number="localPrecio.min"
                prefix="$"
                @change="actualizarFiltros({localMarca,localSistema,localPrecio,localEstados})"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              type="number"
                label="Max."
                v-model.number="localPrecio.max"
                prefix="$"
                @change="actualizarFiltros({localMarca,localSistema,localPrecio,localEstados})"
              ></v-text-field>
            </v-col>
          </v-row>
          </v-col>
        </v-row>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';

export default {
    name:'Filters',
    props:{
    
    },
    data(){
        return{
        dialog:false,
        localMarca:[],
        localSistema:[],
        localEstados:[],
        localPrecio:{min:undefined,max:undefined}
        }
    },
    created(){
       this.updateLocalFilters();
    },
    computed:{
        ...mapState(['marcasSelected','sistemasSelected','estadosSelected','precioSelected','marcas','sistemas','estados']),
    },
    methods:{
        ...mapMutations(['actualizarFiltros']),
        updateLocalFilters(){
        this.localMarca=[];
        this.localSistema=[];
        this.localEstados=[];
        this.localPrecio={min:undefined,max:undefined};
            this.marcasSelected.forEach(m=>{
            this.localMarca.push(m);
           });
           this.sistemasSelected.forEach(m=>{
            this.localSistema.push(m);
           });
           this.estadosSelected.forEach(m=>{
            this.localEstados.push(m);
           });
           this.localPrecio.min=this.precioSelected.min;
           this.localPrecio.max=this.precioSelected.max;
          }
    }
}
</script>

<style>

</style>
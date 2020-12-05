<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          @click="$emit('reset')"
        >
          Click Me
        </v-btn>
      </template>
        <v-card>
          <v-row no-gutters>
          <v-col cols="12" class="pl-3">
            <p class="mt-5 mb-n1">Marcas</p>
            <v-checkbox v-for="(item,index) in marcas"
            :key="index"
            hide-details
            class="my-n1"
            v-model="localMarca"
            :label="item"
            :value="item"
            dense
            @change="$emit('cambio',{localMarca,localSistema,localPrecio})"
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
            @change="$emit('cambio',{localMarca,localSistema,localPrecio})"
          ></v-checkbox>

          <p class="mt-5 mb-n5">Precio</p>
          <v-row>
            <v-col>
              <v-text-field
                label="Min."
                v-model.number="localPrecio.min"
                prefix="$"
                @change="$emit('cambio',{localMarca,localSistema,localPrecio})"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Max."
                v-model.number="localPrecio.max"
                prefix="$"
                @change="$emit('cambio',{localMarca,localSistema,localPrecio})"
              ></v-text-field>
            </v-col>
          </v-row>
          </v-col>
        </v-row>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Filters from './Filters';
export default {
    name:'dialogFilter',
    components:{Filters},
    props:{
        marcasSelected:Array,
        sistemasSelected:Array,
        precioSelected:Object,
        marcas:Array,
        sistemas:Array
    },
    data(){
        return{
        dialog:false,
        localMarca:[],
        localSistema:[],
        localPrecio:{min:undefined,max:undefined}
        }
    },
    methods:{
        actualizarFiltros(nuevo){
            this.$emit('cambio2',nuevo);
        }
    }
}
</script>

<style>

</style>
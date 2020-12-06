<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2 white elevation-0"
            v-bind="attrs"
            v-on="on"
            small
            >
            <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
        <v-card>
            <v-card-title class="headline grey lighten-2">
          Filtros
        </v-card-title>
         <v-card-text>
             <Filters/>
        </v-card-text>
          
          <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
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

    },
    data(){
        return{
            dialog:false

        }
    }
}
</script>

<style>

</style>
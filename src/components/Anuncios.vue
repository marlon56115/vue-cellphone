<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :loading="loading"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          
          class="mb-1 elevation-0 grey lighten-4 rounded "
        >
          <v-text-field
            outlined
            dense
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              outlined
              dense
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Ordenar por"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
              class="white"
                
                large
                depressed
                :value="false"
              >
                <v-icon >mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                class="white"
                large
                depressed
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>        
          </template>
          <span class="grey--text ml-2" v-if="$vuetify.breakpoint.mdAndUp">Mostrar</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> 
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row no-gutters>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            max-height="500"
            class="px-2"
          >
            <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
            
        >
            <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
            </template>

            <v-img
            height="250"
            :src="item.imagenes[0]"
            ></v-img>

            <v-card-title class="text-truncate">{{item.titulo}}</v-card-title>

            <v-card-text>
            <v-row
            
                align="center"
                class="mx-0"
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
              <div class="my-1 subtitle-1">
                $ {{item.precio}}
            </div>
            </v-col>
            <v-col>
              {{momentL(item.creado.seconds)}}
            </v-col>
                
            </v-row>

            

            </v-card-text>

            <v-divider class="mx-4"></v-divider>


            <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
                <v-chip>{{item.modelo}}</v-chip>

                <v-chip>{{item.marca}}</v-chip>

                <v-chip>{{item.sistema}}</v-chip>

            </v-chip-group>
            </v-card-text>

            <v-card-actions>

              <v-btn  @click="goToAnuncio(item)">
                Detalles
                <v-icon>mdi-plus</v-icon>
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
        </v-row>
      </template>

      <template v-slot:footer>
        <div class="text-center">
          <v-pagination
            dark
            :total-visible="5"
            v-model="page"
            :length="numberOfPages"
            circle
          ></v-pagination>
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapState,mapMutations} from 'vuex';
import moment from 'moment';
moment.locale('es');
  export default {
      name:'anuncios',
      props:{
          items:Array,
          loading:Boolean
      },
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'marca',
        keys: [
          'Marca',
          'Descripcion',
          'Estado',
          'Marca',
          'Modelo',
          'Pantalla',
          'Precio',
          'Ram',
          'Rom',
          'Sistema',
          'Telefono',
          'Titulo',
          'Vendedor',
          'Creado'
        ],
      selection: 1,
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      }
    },
    methods: {
        ...mapMutations(['setAnuncioDetalle','addToCart']),
        goToAnuncio(anuncio){
            this.setAnuncioDetalle(anuncio);
            this.$router.push('/anuncio')
        },
      addCart(){},
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      momentL(s){
         return moment(s,'X').fromNow();
      }
    },
  }
</script>
<style>

</style>
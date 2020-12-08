<template>
  <v-container fluid>
    <v-data-iterator
      loading="true"
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          
          class=" elevation-0 grey lighten-4 rounded "
        >
          <v-text-field
            
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
                
                :value="false"
                small
              >
                <v-icon >mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
              small
                class="white"
                
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>        
          </template>
          <DialogFilters v-if="$vuetify.breakpoint.mdAndDown"/>
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
      <template v-slot:loading>
          <v-progress-linear
            color="black"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
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
          <v-skeleton-loader
          type="card-avatar, article, actions"
          v-if="loading"
        ></v-skeleton-loader>
            <v-card
            :loading="loading"
            class="mx-auto my-2"
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
            height="200"
            :src="item.imagenes[0]"
            lazy-src="../assets/grey.jpg"
            >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey "
                ></v-progress-circular>
              </v-row>
            </template>
            </v-img>

            <v-card-title class="text-truncate mt-n2 mb-n5">{{item.titulo}}</v-card-title>
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
          <v-chip
            class=""
            color="light"
            outlined
            x-small
          >
            <v-icon left small>
              mdi-account
            </v-icon>
            {{item.vendedor}}
          </v-chip>
            
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text class="my-n3">
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
                <v-chip small>{{item.modelo}}</v-chip>

                <v-chip small>{{item.marca}}</v-chip>

                <v-chip small>{{item.sistema}}</v-chip>

            </v-chip-group>
            </v-card-text>

            <v-card-actions class="grey lighten-3 mt-n4">

              <v-btn  @click="goToAnuncio(item)"
              class="ml-4"
              color="secondary lighten-3"
              small
              >
                Detalles
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn 
              @click="addToCart(item)"
              class="mr-4 "
              
               fab
               dark
               small
              color="primary elevation-0">
                <v-icon dark>mdi-cart-plus</v-icon>
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
          ></v-pagination>
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapState,mapMutations} from 'vuex';
import DialogFilters from '../components/DialogFilters';
import moment from 'moment';

moment.locale('es');
  export default {
      name:'anuncios',
      components:{DialogFilters},
      props:{
          items:Array,
          loading:Boolean,
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
      ...mapState(['agrego']),
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      }
    },
    methods: {
        ...mapMutations(['addToCart']),
        goToAnuncio(anuncio){
            this.setAnuncioDetalle(anuncio);
            this.$router.push({ name: 'Anuncio', params: { id: anuncio.id} });
            //let routeData = this.$router.resolve({name: 'Anuncio'});
            //window.open(routeData.href, '_blank');
        },
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
      },
      actualizarFiltros(nuevo){
        this.$emit('cambio',nuevo);
      }
    },
  }
</script>
<style>

</style>
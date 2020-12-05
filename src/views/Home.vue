<template>
  <div class="home grey lighten-4 rounded">
    <v-row>
      <v-col cols="12" sm="2" v-if="$vuetify.breakpoint.mdAndUp">
        <v-row no-gutters>
          <v-col cols="12" class="pl-3">
            <span>Filtros</span>
            <v-checkbox
            hide-details
            v-model="marcasSelected"
            label="Samsung"
            value="Samsung"
            dense
          ></v-checkbox>
          <v-checkbox
            hide-details
            v-model="marcasSelected"
            label="Huawei"
            value="Huawei"
            dense
          ></v-checkbox>
          <v-checkbox
            hide-details
            v-model="sistemasSelected"
            label="Android"
            value="Android"
            dense
          ></v-checkbox>
          <v-checkbox
            hide-details
            v-model="sistemasSelected"
            label="Ios"
            value="Ios"
            dense
          ></v-checkbox>
           <v-checkbox
            hide-details
            v-model="pantallasSelected"
            label="precio<$100"
            value="7"
            dense
          ></v-checkbox>
          <v-checkbox
            hide-details
            v-model="pantallasSelected"
            label="precio>$100"
            value="6"
            dense
          ></v-checkbox>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-else>
            <v-select
            v-model="value"
            :items="items"
            chips
            label="Filtros"
            multiple
            outlined
          ></v-select>
        </v-col>
      <v-col cols="12" sm="10">
        <Anuncios :items="AnunciosFiltrados" :loading="loadingData"/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
import Anuncios from '../components/Anuncios';
import {storage,db} from '../database/firebase';
import {mapState} from 'vuex';
var ref=storage.ref();
export default {
  name: 'Home',
  components: {
    Anuncios
  },
  data () {
    return{
      loadingData:false,
      marcasSelected:[],
      sistemasSelected:[],
      precioSelected:[],
      pantallasSelected:[],
       marcas:['Samsung','Apple','Huawei','LG'],
       sistemas:['Android','Ios','Windows Phone'],
       items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
      anuncios:[],
    }
  },
  created (){
    this.traerAnuncios();
  },
  
  methods:{
     async  traerAnuncios(){
      var anunciosLocal=[];
      this.loadingData=true;
      try {
        const snapshot = await db.collection("anuncios").get();
        const events = [];
        snapshot.forEach((doc) => {
          let eventoData = doc.data();
          eventoData.id = doc.id;
          events.push(eventoData);
        });
        anunciosLocal = events;
      } catch (error) {
        console.log(error);
      }
      
      anunciosLocal.forEach(an=>{
        //console.log(an.creado.seconds);
        an.imagenes=[];
      });

      this.insertarImagenes(anunciosLocal);
      this.loadingData=false;
      this.anuncios=anunciosLocal;
    },
    insertarImagenes(anunciosLocal){
      anunciosLocal.forEach(async item=>{ //recorremos los anuncios
           const list=await ref.child('S_'+item.id+'/').listAll();
            list.items.forEach(async imgRef=>{ //obtenemos el id de cada item para obtener le referencia de  la carpeta de sus fotos
                 const url=await imgRef.getDownloadURL();
                   for (let index = 0; index < anunciosLocal.length; index++) { //agregamos la foto a cada objeto de anuncios
                    if(anunciosLocal[index].id===item.id){
                      anunciosLocal[index].imagenes.push(url);
                    }
                  }
            }); 
          }) 
    }
  },
  computed:{
    ...mapState(['agrego']),
    AnunciosFiltrados(){
      var condicion = { marca: "", sistema: ""};
      var arrayFiltrado = [];
      if (this.marcasSelected.length > 0) {
        this.marcasSelected.forEach((marca) => {
          condicion.marca = condicion.marca.concat("anuncio['marca']=='",marca,"'||");
        });
      } else {
        this.marcas.forEach((marca) => {
          condicion.marca = condicion.marca.concat("anuncio['marca']=='",marca,"'||");
        });
      }
       
      if (this.sistemasSelected.length > 0) {
        this.sistemasSelected.forEach((sistema) => {
          condicion.sistema = condicion.sistema.concat("anuncio['sistema']=='", sistema, "'||");
        });
      } else {
        this.sistemas.forEach((sistema) => {
          condicion.sistema = condicion.sistema.concat("anuncio['sistema']=='", sistema, "'||");
        });
      }

      condicion.marca = condicion.marca.substring(0,condicion.marca.length - 2);
      condicion.sistema = condicion.sistema.substring(0, condicion.sistema.length - 2);

      arrayFiltrado = this.anuncios.filter(function(anuncio) {
        return (
          eval(condicion.marca) && eval(condicion.sistema) //&& eval(condicion.precio)
        );
      });
      
      return arrayFiltrado;
    }
  },
  watch: {
    agrego:function(val){
      console.log(val);
      this.traerAnuncios();

    }
  }
}
</script>

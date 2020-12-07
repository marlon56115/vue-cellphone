<template>
  <div class="home grey lighten-4 rounded">
    <v-row>
      <v-col cols="12" sm="2" v-if="$vuetify.breakpoint.lgAndUp">
        <Filters/>
      </v-col>
      <v-col cols="12" lg="10" >
        <Anuncios 
        :items="AnunciosFiltrados" 
        :loading="loadingData"/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
import DialogFilters from '../components/DialogFilters'
import Anuncios from '../components/Anuncios';
import Filters from '../components/Filters'
import {storage,db} from '../database/firebase';
import {mapState,mapMutations} from 'vuex';
var ref=storage.ref();
export default {
  name: 'Home',
  components: {
    Anuncios,DialogFilters,Filters
  },
  data () {
    return{
      loadingData:false,
      anuncios:[],
    }
  },
  created (){
    this.traerAnuncios(); 
  },
  
  methods:{
    ...mapMutations(['actualizarFiltros']),
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
        an.imagenes=[];
      });

      this.insertarImagenes(anunciosLocal);
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
    ...mapState(['agrego','marcasSelected','sistemasSelected','estadosSelected','precioSelected','marcas','sistemas','estados']),
    
    AnunciosFiltrados(){
      var condicion = { marca: "", sistema: "",precio:"",estado:""};
      var arrayFiltrado = [];
      if(typeof this.precioSelected.min=='number' && typeof this.precioSelected.max=='number'){
        condicion.precio="anuncio['precio']>="+this.precioSelected.min+"&&"+"anuncio['precio']<="+this.precioSelected.max;
      }else{
        condicion.precio="anuncio['precio']>="+0;
      }

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

      if (this.estadosSelected.length > 0) {
        this.estadosSelected.forEach((estado) => {
          condicion.estado = condicion.estado.concat("anuncio['estado']=='", estado, "'||");
        });
      } else {
        this.estados.forEach((estado) => {
          condicion.estado = condicion.estado.concat("anuncio['estado']=='", estado, "'||");
        });
      }
      
      condicion.estado = condicion.estado.substring(0,condicion.estado.length - 2);
      condicion.marca = condicion.marca.substring(0,condicion.marca.length - 2);
      condicion.sistema = condicion.sistema.substring(0, condicion.sistema.length - 2);

      arrayFiltrado = this.anuncios.filter(function(anuncio) {
        return (
          eval(condicion.marca) && eval(condicion.sistema) && eval(condicion.precio)&& eval(condicion.estado)
        );
      });
       this.loadingData=false;
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

<template>
    <v-dialog v-model="dialog" persistent fullscreen >
      <v-card>
        <v-card-title>
          <span class="headline">Nuevo anuncio</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" lazy-validation ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-row no-gutters>
                          <v-col cols="12" >
                            <v-select
                                v-model="nuevoAnuncio.estado"
                                :items="estados"
                                label="Estado"
                                outlined
                                dense
                                required
                                :rules="estadoReglas"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" >
                            <v-select
                                v-model="nuevoAnuncio.marca"
                                :items="marcas"
                                label="Marca"
                                outlined
                                dense
                                required
                                :rules="marcaReglas"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" class="py-0">
                            <v-select
                                v-model="nuevoAnuncio.modelo"
                                :disabled="nuevoAnuncio.marca?false:true"
                                :items="modelosPorMarca"
                                label="Modelo"
                                outlined
                                dense
                                required
                                :rules="modeloReglas"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" class="py-0">
                              <v-select
                                v-model="nuevoAnuncio.sistema"
                                :items="sistemas"
                                label="Sistema operativo"
                                outlined
                                dense
                                required
                                :rules="sistemaReglas"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" class="py-0">
                              <v-text-field
                                :rules="pantallaReglas"
                                required
                                v-model="nuevoAnuncio.pantalla"
                                label="Tamaño de pantalla"
                                suffix="pulgadas"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="py-0">
                            <v-text-field
                                :rules="ramReglas"
                                required
                                v-model="nuevoAnuncio.ram"
                                label="Memoria RAM"
                                suffix="GB"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="py-0">
                              <v-text-field
                                :rules="romReglas"
                                required
                                v-model="nuevoAnuncio.rom"
                                label="Memoria de almacenamiento"
                                suffix="GB"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" > 
                      <v-row no-gutters>
                          <v-col cols="12" class="pt-0">
                              <v-text-field
                                :rules="tituloReglas"
                                required
                                v-model="nuevoAnuncio.titulo"
                                label="Titulo"
                                type="text"
                                counter="50"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                              <v-text-field
                                :rules="vendedorReglas"
                                counter="40"
                                required
                                v-model="nuevoAnuncio.vendedor"
                                label="Vendedor"
                                type="text"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                              <v-text-field
                                :rules="telefonoReglas"
                                required
                                counter="8"
                                v-model="nuevoAnuncio.telefono"
                                label="Numero telefonico"
                                prefix="+503"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                              <v-textarea
                                :rules="descripcionReglas"
                                required
                                outlined
                                dense
                                name="input-7-4"
                                label="Descripcion"
                                v-model="nuevoAnuncio.descripcion"
                                counter="100"
                              ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                              <v-text-field
                                v-model="nuevoAnuncio.precio"
                                label="precio"
                                prefix="$"
                                type="number"
                                outlined
                                dense
                                required
                                :rules="precioReglas"
                            ></v-text-field>
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> 
                      <v-file-input
                        required
                        :rules="imagenesReglas"
                        v-model="imagenes"
                        multiple
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Selecciona imagenes"
                        prepend-icon="mdi-camera"
                        label="Imagenes"
                        @change="rellenarURLs"
                      >
                        <template v-slot:selection="{ file }">
                            <v-avatar>
                                <img :src="generarURL(file)" :alt="file.name">
                            </v-avatar>
                        </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> 
                    <v-carousel height="200" cycle dark>
                    <v-carousel-item
                      v-for="(item,i) in imgURLs"
                      :key="i"
                      :src="item"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    ></v-carousel-item>
                  </v-carousel>
                  </v-col>
                </v-row>
              </v-container>
              <small>*campos requeridos</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('nuevoanunciooff')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="guardarAnuncio">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <LoadingModal :dialog="guardando"/>
        <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
        >
           Anuncio agregado con exito! 
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar=false"
            >
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-dialog>
</template>

<script>
import LoadingModal from './LoadingModal';
import {storage,db} from '../database/firebase';
import {mapState,mapMutations} from 'vuex';
import moment from 'moment';
moment.locale('es');
var ref=storage.ref();
export default {
  name: "nuevoanuncio",
  props: {
    dialog:Boolean
    },
  components: {
    LoadingModal
    },
  data() {
    return {
      snackbar:false,
      nuevoAnuncio:{
          descripcion:'',
          estado:'',
          marca:'',
          modelo:'',
          pantalla:null,
          precio:null,
          ram:null,
          rom:null,
          sistema:'',
          telefono:null,
          titulo:'',
          vendedor:'',
          creado:''
      },
      imagenes:[],
      marcas:['Samsung','Apple','Huawei','LG'],
      modelos:[{
          marca:'Samsung',
          modelo:'Galaxy S III'
      },
      {
          marca:'Samsung',
          modelo:'Galaxy Note 20 Ultra'
      },
      {
          marca:'Huawei',
          modelo:'P40 Pro'
      },
      {
          marca:'Apple',
          modelo:'Iphone 11 pro max'
      },
      {
          marca:'LG',
          modelo:'Stylus III'
      }
      ],
      sistemas:['Android','Ios','Windows Phone'],
      estados:['Nuevo','Usado','Semi-usado','Dañado'],
      imgURLs:[],
      guardando:false,
      valid:false,
      pantallaReglas:[
        v =>!!v || 'Ingrese tamaño de pantalla pantalla!',
        v => !!v ? v<10&&v>0 || 'Tamaño de pantalla invalido!':'',
      ],
      ramReglas:[
        v =>!!v || 'Ingrese cuanta memora RAM!',
        v => !!v  ? v<1024&&v>0 || 'RAM invalida!':'',
      ],
      romReglas:[
        v =>!!v || 'Ingrese cuanta memora de almacenamiento!',
        v => !!v  ? v<1024&&v>0 || 'Almacenamiento invalido!':'',
      ],
      tituloReglas:[
        v =>!!v || 'Ingrese un titulo!',
        v => !!v  ? v.length<50 || 'Titulo demasiado largo!':'', //si cumple la condicion no muestra la alerta
      ],
      vendedorReglas:[
        v =>!!v || 'Ingrese un nombre!',
        v => !!v ? v.length<40|| 'Nombre demasiado largo!':'',
      ],
      telefonoReglas:[
        v =>!!v || 'Ingrese un numero telefonico!',
        v => !!v ? /^[0-9]{8}$/.test(v)|| 'Debe contener 8 digitos!':'',
      ],
      descripcionReglas:[
        v =>!!v || 'Ingrese una descripciòn!',
        v => !!v  ? v.length<100 || 'Descripcion demasido larga!':'',
      ],
      precioReglas:[
        v =>!!v || 'Ingrese el precio!',
        v => !!v  ? v>0 || 'Precio invalido!':''
      ],
      imagenesReglas:[
        v =>v.length!==0 || 'Ingrese minimo una imagen',
        v =>v.length<=5 || 'Maximo 5 imagenes!'
      ],
      estadoReglas:[v => !!v || 'Seleccione el estado!'],
      marcaReglas:[v => !!v || 'Seleccione la marca!'],
      modeloReglas:[v => !!v || 'Seleccione el modelo!'],
      sistemaReglas:[v => !!v || 'Seleccione el sistema!'],
      
    };
  },
  computed:{
    ...mapState(['agrego']),
      modelosPorMarca(){
          const modelosMarca=[];
          this.modelos.forEach(modelo=>{
              if(modelo.marca===this.nuevoAnuncio.marca){
                  modelosMarca.push(modelo.modelo);
              }
          });
          return modelosMarca;
      }
  },
  beforeCreate(){

  },
  methods:{
    ...mapMutations(['agregoChange']),
      generarURL(img){
          return URL.createObjectURL(img);
      },
      rellenarURLs(){
        this.imgURLs=[];
        this.imagenes.forEach(img=>{
          this.imgURLs.push(this.generarURL(img));
        });
      },
      reset(){
          this.imagenes=[];
          this.guardando=false;
          this.closeModal();
      },
      closeModal(){
        this.dialog=false;
        this.$refs.form.reset();
      },
      async guardarAnuncio(){
          if (this.$refs.form.validate()) {//validamos que el fomulario este lleno
              this.guardando=true;
              this.nuevoAnuncio.creado=moment()._d;
               var res=await db.collection('anuncios').add(this.nuevoAnuncio);
               this.imagenes.forEach(async img=>{
                      const imgRef=ref.child('S_'+res.id+'/'+img.name);
                      let res2=await imgRef.put(img);
                      console.log('imagen subida con exito');
                  });
                  console.log('anuncio subido con exito');
                  this.reset();
                  this.agregoChange();
                  this.snackbar=true;
       }
    }
  }
}
</script>

<style></style>

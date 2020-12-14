<template>
  <v-dialog v-model="dialog" persistent fullscreen>
    <v-card>
      <!--Header del modal-->
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Nuevo Anuncio</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text small @click="cleanForm">
            <v-icon left>
              mdi-reload
            </v-icon>
            Reset
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
       <!--Contenido del formulario-->
      <v-card-text>
        <v-container>
           <!--Primer formulario-->
          <v-form v-model="valid" lazy-validation ref="form">
            <v-row>
              <!--primer bloque-->
              <v-col cols="12" sm="6" md="6">
                <v-row no-gutters>
                  <v-col cols="12">
                     <!--select estado-->
                    <v-select
                      menu-props="auto"
                      single-line
                      v-model="nuevoAnuncio.estado"
                      :items="estados"
                      label="Estado"
                      outlined
                      dense
                      required
                      :rules="estadoReglas"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                     <!--select marca-->
                    <v-select
                      menu-props="auto"
                      single-line
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
                     <!--select modelo-->
                    <v-select
                      menu-props="auto"
                      single-line
                      v-model="nuevoAnuncio.modelo"
                      :disabled="nuevoAnuncio.marca ? false : true"
                      :items="modelosPorMarca"
                      label="Modelo"
                      outlined
                      dense
                      required
                      :rules="modeloReglas"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="py-0">
                     <!--select sistema-->
                    <v-select
                      menu-props="auto"
                      single-line
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
                     <!--number pantalla-->
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
                     <!--number ram-->
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
                     <!--number rom-->
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
              <!--segundo bloque bloque-->
              <v-col cols="12" sm="6" md="6">
                <v-row no-gutters>
                  <v-col cols="12" class="pt-0">
                    <!--text reglas-->
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
                    <!--text vendedor-->
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
                    <!--number telefono-->
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
                    <!--text descripcion-->
                    <v-textarea
                      :rules="descripcionReglas"
                      required
                      outlined
                      dense
                      name="input-7-4"
                      label="Descripcion"
                      v-model="nuevoAnuncio.descripcion"
                      counter="500"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <!--number precio-->
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
            </v-row>
          </v-form>
          <!--Bloque de imagenes-->
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-card elevation="0">
                <v-card-title>
                  Agrega imagenes
                </v-card-title>
                <!--carousel de vista previa-->
                <v-carousel
                  height="200"
                  cycle
                  dark
                  v-if="preview && imgURLs.length > 0"
                >
                  <v-carousel-item
                    v-for="(item, i) in imgURLs"
                    :key="i"
                    :src="item"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                    <v-btn color="red" @click="eliminarImg(i)">
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-carousel-item>
                </v-carousel>
                
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-content>
                      <!--form de input file-->
                      <v-form lazy-validation ref="imgFileForm">
                        <v-file-input
                          :disabled="imagenes.length > 4"
                          v-model="imagen"
                          required
                          :rules="imagenReglas"
                          accept="image/png, image/jpeg, image/bmp, image/jpg"
                          placeholder="Seleccionar"
                          prepend-icon="mdi-camera"
                          label="Imagen"
                          @change="agregarImagen"
                        >
                        </v-file-input>
                      </v-form>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-switch
                        dense
                        v-model="preview"
                        label="Vista previa"
                        inset
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <!--terminos y condiciones-->
            <v-col cols="12" sm="6" md="6">
              <v-card class="elevation-0">
                <v-card-title>
                  Terminos y condiciones
                </v-card-title>

                <v-card-text>
                  No me hago cargo de lo que se publique en esta app :)
                  <v-switch
                    class="float-right"
                    dense
                    v-model="conditions"
                    label="Acepto"
                    inset
                  ></v-switch>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
      <!--botones footer-->
      <v-card-actions class="grey lighten-4">
        <v-row>
          <v-col class=" text-center">
            <v-btn color="success" small text @click="guardarAnuncio">
              <v-icon left>
                mdi-upload
              </v-icon>
              Publicar
            </v-btn>
            <v-btn small text color="error" @click="closeModal">
              <v-icon left>
                mdi-cancel
              </v-icon>
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!--modal de carga cuando se añade anuncio-->
    <LoadingModal :dialog="guardando" />
    <div class="text-center ma-2">
      <!--snackbar de agrego anuncio-->
      <v-snackbar v-model="snackbarAgrego" right top color="primary">
        <v-icon left>
        mdi-check
      </v-icon>
        Anuncio agregado con exito!
        <template v-slot:action="{ attrs }">
          <v-btn
            color="dark"
            text
            v-bind="attrs"
            @click="snackbarAgrego = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <!--snacknar de error de formulario-->
      <v-snackbar v-model="snackbarError" timeout="2000" right top color="red">
          <v-icon left>
          mdi-alert-circle
        </v-icon>
        Faltan campos por rellenar!
        <template v-slot:action="{ attrs }">
          <v-btn
            color="dark"
            text
            v-bind="attrs"
            @click="snackbarError = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-dialog>
</template>

<script>
import LoadingModal from "./LoadingModal";
import { storage, db } from "../database/firebase";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
moment.locale("es");
var ref = storage.ref();

export default {
  name: "nuevoanuncio",
  props: {
    dialog: Boolean,
  },
  components: {
    LoadingModal,
  },
  data() {
    return {
      snackbarAgrego: false,
      snackbarError: false,
      preview: true,
      conditions: false,
      nuevoAnuncio: {
        descripcion: "",
        estado: "",
        marca: "",
        modelo: "",
        pantalla: null,
        precio: null,
        ram: null,
        rom: null,
        sistema: "",
        telefono: null,
        titulo: "",
        vendedor: "",
        creado: "",
      },
      imagenes: [],
      imagen: [],
      imgURLs: [],
      guardando: false,
      valid: false,
      pantallaReglas: [
        (v) => !!v || "Ingrese tamaño de pantalla pantalla!",
        (v) => (!!v ? (v < 10 && v > 0) || "Tamaño de pantalla invalido!" : ""),
      ],
      ramReglas: [
        (v) => !!v || "Ingrese cuanta memora RAM!",
        (v) => (!!v ? (v < 1024 && v > 0) || "RAM invalida!" : ""),
      ],
      romReglas: [
        (v) => !!v || "Ingrese cuanta memora de almacenamiento!",
        (v) => (!!v ? (v < 1024 && v > 0) || "Almacenamiento invalido!" : ""),
      ],
      tituloReglas: [
        (v) => !!v || "Ingrese un titulo!",
        (v) => (!!v ? v.length < 100 || "Titulo demasiado largo!" : ""), //si cumple la condicion no muestra la alerta
      ],
      vendedorReglas: [
        (v) => !!v || "Ingrese un nombre!",
        (v) => (!!v ? v.length < 40 || "Nombre demasiado largo!" : ""),
      ],
      telefonoReglas: [
        (v) => !!v || "Ingrese un numero telefonico!",
        (v) => (!!v ? /^[0-9]{8}$/.test(v) || "Debe contener 8 digitos!" : ""),
      ],
      descripcionReglas: [
        (v) => !!v || "Ingrese una descripciòn!",
        (v) => (!!v ? v.length < 500 || "Descripcion demasido larga!" : ""),
      ],
      precioReglas: [
        (v) => !!v || "Ingrese el precio!",
        (v) => (!!v ? v > 0&&v<1000000 || "Precio invalido!" : ""),
      ],
      imagenReglas: [
        (img) => !img || img.size < 10000000 || "Tamaño maximo de 5 mb!",
      ],
      estadoReglas: [(v) => !!v || "Seleccione el estado!"],
      marcaReglas: [(v) => !!v || "Seleccione la marca!"],
      modeloReglas: [(v) => !!v || "Seleccione el modelo!"],
      sistemaReglas: [(v) => !!v || "Seleccione el sistema!"],
    };
  },
  computed: {
    ...mapState(["agrego", "marcas", "modelos", "estados", "sistemas"]),
    /**devuelve los modelos dependiendo de la marca seleccionada*/
    modelosPorMarca() {
      const modelosMarca = [];
      this.modelos.forEach((modelo) => {
        if (modelo.marca === this.nuevoAnuncio.marca) {
          modelosMarca.push(modelo.modelo);
        }
      });
      return modelosMarca;
    },
  },
  methods: {
    ...mapMutations(["agregoChange"]),
    /**genera un url temporal de una imagen para la vista previa */
    generarURL(img) {
      return URL.createObjectURL(img);
    },
    /**se ejecuta cada vez que se selecciona una imagen, y cuando se resetea el for2 */
    agregarImagen(img) {
      if (img != undefined) {
        //para evitar erroers cuando se resetea el imgFileForm
        if (img.size < 10000000) {
          //evalua que la imagen no pase de 5 mb
          this.imagenes.push(img);
          this.imgURLs.push(this.generarURL(img));
          this.$refs.imgFileForm.reset(); //reseteo form de file de imagen
        } else {
          this.imagen = []; //reseteo v-model de file de imagen para que no quede seleccionada
        }
      }
    },
    /**metodo cuando elimina una imagen */
    eliminarImg(i) {
      this.imagenes.splice(i, 1);
      this.imgURLs.splice(i, 1);
    },
    /**metodo para limpiar imagenes y formulario */
    cleanForm() {
      this.$refs.form.reset();
      this.$refs.imgFileForm.reset();
      this.imagenes = [];
      this.imgURLs = [];
      this.imagen = [];
      this.conditions = false;
      this.guardando = false;
    },
    /**metodo para cerrar modal y limpiar forms */
    closeModal() {
      this.$emit("nuevoanunciooff");
      this.cleanForm();
    },
    /**metodo para guardar anuncios */
    async guardarAnuncio() {
      //comprobamos la validacion, que hayan imagenes y que acepto los terminos
      if (
        this.$refs.form.validate() &&
        this.conditions &&
        this.imagenes.length > 0
      ) {
        this.guardando = true;
        this.nuevoAnuncio.creado = moment()._d;
        var res = await db.collection("anuncios").add(this.nuevoAnuncio);
        this.imagenes.forEach(async (img) => {
          const imgRef = ref.child("S_" + res.id + "/" + img.name);
          let res2 = await imgRef.put(img);
        });
        this.closeModal();
        this.agregoChange();
        this.snackbarAgrego = true;
      } else {
        this.snackbarError = true;
      }
    },
  },
};
</script>

<style></style>

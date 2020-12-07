import Vue from 'vue'
import Vuex from 'vuex'
// plugin a agregar
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carrito:[],
    carritoDetalles:[],
    agrego:false,
    marcasSelected:[],
    sistemasSelected:[],
    estadosSelected:[],
    precioSelected:{min:undefined,max:undefined},
    marcas:['Samsung','Apple','Huawei','LG'],
    sistemas:['Android','Ios','Windows Phone'],
    estados:['Nuevo','Usado','Semi-usado','Dañado']

  },
  mutations: {
    actualizarFiltros(state,nuevo){
      state.marcasSelected=nuevo.localMarca;
      state.sistemasSelected=nuevo.localSistema;
      state.estadosSelected=nuevo.localEstados;
      state.precioSelected=nuevo.localPrecio;
    },
    agregoChange(state){
      state.agrego=!state.agrego;
    },
    addToCart(state,anuncio){
      state.carrito.push(anuncio);
    }
  },
  actions: {
    
  },
  modules: {
  },
  // aquí agregamos el plugin
  plugins: [createPersistedState()]
})

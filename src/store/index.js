import Vue from 'vue'
import Vuex from 'vuex'
// plugin a agregar
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    anuncioDetalle:{},
    especificaciones:[],
    carrito:[],
    carritoDetalles:[],
    agrego:false
  },
  mutations: {
    agregoChange(state){
      state.agrego=!state.agrego;
    },
    addToCart(state,anuncio){
      state.carrito.push(anuncio);
    },
    setAnuncioDetalle(state,anuncio){
      const specs=[{
        action: 'mdi-ticket',
        items: [{ title: anuncio.estado }],
        title: 'Estado',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.marca }],
        title: 'Marca',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.modelo }],
        title: 'Modelo',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.pantalla+' pulgadas' }],
        title: 'Tamaño de pantalla',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.sistema }],
        title: 'Sistema Operativo',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.ram+' GB' }],
        title: 'Memoria RAM',
      },
      {
        action: 'mdi-ticket',
        items: [{ title: anuncio.rom+' GB'}],
        title: 'Memoria de almacenamiento',
      }
    ];
    state.especificaciones=specs;
    state.anuncioDetalle=anuncio;
    }
  },
  actions: {
    
  },
  modules: {
  },
  // aquí agregamos el plugin
  plugins: [createPersistedState()]
})

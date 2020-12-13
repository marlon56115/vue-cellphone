import Vue from 'vue'
import Vuex from 'vuex'
// plugin a agregar
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carrito: [],
    carritoDetalles: [],
    agrego: false,
    marcasSelected: [],
    sistemasSelected: [],
    estadosSelected: [],
    precioSelected: {
      min: undefined,
      max: undefined
    },
    marcas: ['Samsung', 'Apple', 'Huawei', 'LG', 'Xiaomi', 'Google'],
    sistemas: ['Android', 'Ios', 'Windows Phone'],
    estados: ['Nuevo', 'Usado', 'Semi-usado', 'Dañado'],
    modelos: [{
        marca: 'Xiaomi',
        modelo: 'Mi note lite'
      },
      {
        marca: 'Xiaomi',
        modelo: 'Redmi Note 9S'
      },
      {
        marca: 'Google',
        modelo: 'Pixel 2 XL'
      },
      {
        marca: 'Google',
        modelo: 'Pixel 3 XL'
      },
      {
        marca: 'LG',
        modelo: 'K51 2020'
      },
      {
        marca: 'LG',
        modelo: 'K20'
      },
      {
        marca: 'LG',
        modelo: 'Stylus III'
      },
      {
        marca: 'Samsung',
        modelo: 'Galaxy S III'
      },
      {
        marca: 'Samsung',
        modelo: 'Galaxy Note 20 Ultra'
      },
      {
        marca: 'Samsung',
        modelo: 'Galaxy S9 plus'
      },
      {
        marca: 'Samsung',
        modelo: 'Galaxy S10 plus'
      },
      {
        marca: 'Huawei',
        modelo: 'P40 Pro'
      },
      {
        marca: 'Huawei',
        modelo: 'P30 Pro'
      },
      {
        marca: 'Huawei',
        modelo: 'Y9 Prime'
      },
      {
        marca: 'Apple',
        modelo: 'Iphone XR'
      },
      {
        marca: 'Apple',
        modelo: 'Iphone 12 pro max'
      },
      {
        marca: 'Apple',
        modelo: 'Iphone 7 plus'
      }

    ]

  },
  mutations: {
    /**para actualizar filtros */
    actualizarFiltros(state, nuevo) {
      state.marcasSelected = nuevo.localMarca;
      state.sistemasSelected = nuevo.localSistema;
      state.estadosSelected = nuevo.localEstados;
      state.precioSelected = nuevo.localPrecio;
    },
    /**se ejcuta cuando agrego un nuevo anuncio */
    agregoChange(state) {
      state.agrego = !state.agrego;
    },
    /**se ejecuta cuando añade articulo al carrito */
    addToCart(state, anuncio) {
      var nuevoArray = [];
      nuevoArray = state.carrito.filter(an => an.id == anuncio.id);
      //si el articulo no existia en el carrito se añade
      if (nuevoArray.length == 0) {
        anuncio.cantidad = 1;
        anuncio.subtotal = anuncio.precio;
        state.carrito.push(anuncio);
        state.carrito = state.carrito.slice();
      } else {
        //si el articulo ya existia en el carrito solo se aumenta la cantidad en 1
        state.carrito.forEach(an => {
          if (an.id === anuncio.id) {
            an.cantidad = an.cantidad + 1;
            an.subtotal = an.cantidad * an.precio;
            an.subtotal = (an.subtotal).toFixed(2);
            state.carrito = state.carrito.slice();
          }
        });
      }
    },
    /**metodo cuando quite un articulo del carrito */
    quitToCart(state, anuncio) {
      state.carrito.forEach((an, i) => {
        if (an.id === anuncio.id) {
          //si la cantidad del articulo es mayor a 1 solo la disminuye
          if (an.cantidad > 1) {
            an.cantidad = an.cantidad - 1;
            an.subtotal = an.cantidad * an.precio;
            an.subtotal = (an.subtotal).toFixed(2);
            state.carrito = state.carrito.slice();
          } else if (an.cantidad == 1) {
            //si la cantidad del articulo es 1, lo elimina
            state.carrito.splice(i, 1);
            state.carrito = state.carrito.slice();
          }
        }
      });
    }
  },
  actions: {

  },
  getters: {
    /**devuelve el total de articulos del carrito*/
    getTotalCarrito(state) {
      var total = 0;
      state.carrito.forEach(an => {
        total = total + an.cantidad;
      })
      return total;
    },
    /**devuelve el total a pagar de articulos del carrito */
    getTotal(state) {
      var total = 0;
      state.carrito.forEach(item => {
        total += item.cantidad * item.precio;
      });
      return total.toFixed(2);
    }
  },
  modules: {},
  // aquí agregamos el plugin
  plugins: [createPersistedState()]
})
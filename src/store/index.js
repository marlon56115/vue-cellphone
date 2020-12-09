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
    modelos: [
      {
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
    actualizarFiltros(state, nuevo) {
      state.marcasSelected = nuevo.localMarca;
      state.sistemasSelected = nuevo.localSistema;
      state.estadosSelected = nuevo.localEstados;
      state.precioSelected = nuevo.localPrecio;
    },
    agregoChange(state) {
      state.agrego = !state.agrego;
    },
    addToCart(state, anuncio) {
      //state.carrito.push(anuncio);
      //anuncio.cantidad=undefined; //añado la propiedad cantidad
      //anuncio.subtotal=undefined; //añado la propiedad subtotal
      var nuevoArray = [];
      nuevoArray = state.carrito.filter(an => an.id == anuncio.id);
      // console.log(nuevoArray.length);
      if (nuevoArray.length == 0) {
        anuncio.cantidad = 1;
        anuncio.subtotal = anuncio.precio;
        state.carrito.push(anuncio);
        state.carrito = state.carrito.slice();
        //console.log(state.carrito);
        //console.log(state.carrito);
      } else {
        state.carrito.forEach(an => {
          if (an.id === anuncio.id) {
            //console.log(an.cantidad);
            an.cantidad = an.cantidad + 1;
            an.subtotal = an.cantidad * an.precio;
            state.carrito = state.carrito.slice();
            //console.log(an);
          }
        });
        //state.carrito.find(an=>an.id===anuncio.id).cantidad+=1;
        //state.carrito.find(an=>an.id===anuncio.id).subtotal=state.carrito.find(an=>an.id===anuncio.id).cantidad*state.carrito.find(an=>an.id===anuncio.id).precio;
      }
      //anuncio.cantidad=nuevoArray.length;
      //anuncio.subtotal=anuncio.cantidad*anuncio.precio;
      //state.carrito.push(anuncio);
      //console.log(state.carrito);
    },
    quitToCart(state, anuncio) {
      state.carrito.forEach((an, i) => {
        if (an.id === anuncio.id) {
          if (an.cantidad > 1) {
            an.cantidad = an.cantidad - 1;
            state.carrito = state.carrito.slice();
            console.log(state.carrito);
          } else if (an.cantidad == 1) {
            //console.log('llego a 0');
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
    getTotalCarrito(state) {
      var total = 0;
      state.carrito.forEach(an => {
        total = total + an.cantidad;
      })
      //console.log(total);
      //state.carrito=state.carrito.slice();
      return total;
    },
    getTotal(state) {
      var total = 0;
      state.carrito.forEach(item => {
        total += item.cantidad * item.precio;
      });

      return total;
    },
    getCarrito: function (state) {
      return state.carrito;
    }
  },
  modules: {},
  // aquí agregamos el plugin
  plugins: [createPersistedState()]
})
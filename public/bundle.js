/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(3);


module.exports = new Vue({
  el: '#app',
  template: __webpack_require__(4),
  data: {
    store
  },
  computed: {
    total: function() {
      return _.sumBy(this.$store.cart, 'price')
    }
  },
  methods: {
    addToCart: function(item) {
        this.$store.cart.push(item);
    },

    removeFromCart: function(item) {
      var index= this.$store.cart.indexOf(item);
      if(index > -1) {
        this.$store.cart.splice(index, 1);
      }

    }
  }
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _storeAccessor = __webpack_require__(5);

var _storeAccessor2 = _interopRequireDefault(_storeAccessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    // Register a helper prototype property for store access.
    Object.defineProperty(Vue.prototype, '$store', {
        get: function get() {
            return this.$root.store;
        }
    });

    // Register a global mixin to manage the getters/setters for our store.
    Vue.mixin({

        /**
         * The 'beforeCreate' life-cycle hook for Vue 2.0
         * 
         * @return {void}
         */
        beforeCreate: function beforeCreate() {
            registerStore(this);
        },


        /**
         * The 'init' life-cycle hook for Vue 1.0
         *
         * @return {void}
         */
        init: function init() {
            registerStore(this);
        }
    });
}

function registerStore(vm) {
    // 1.) Check for a store "option" on the component.
    // 2.) Check for a store "object" on the root vue model.
    if (typeof vm.$options.store !== 'undefined' && typeof vm.$root.store !== 'undefined') {

        // Initialize the computed option if it hasn't already been initialized.
        if (typeof vm.$options.computed === 'undefined') {
            vm.$options.computed = {};
        }

        // Check if the store option is a non-empty array.
        if (Array.isArray(vm.$options.store)) {
            // Loop through the elements of the "store" option.
            vm.$options.store.forEach(function (property) {
                // Create a computed property using our StoreAccessor helper class.
                vm.$options.computed[property] = new _storeAccessor2.default(property);
            });
        } else {
            // Loop through the store options.
            for (var key in vm.$options.store) {
                if (typeof vm.$options.store[key] == 'function') {
                    // Handle a function
                    vm.$options.computed[key] = new _storeAccessor2.default(vm.$options.store[key]());
                } else if (typeof vm.$options.store[key] == 'string') {
                    // Handle a string
                    vm.$options.computed[key] = new _storeAccessor2.default(vm.$options.store[key]);
                }
            }
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

exports.default = plugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(1);

__webpack_require__(0);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  cart: [],
  products: [
    {
      name: 'Arepas',
      description: "A delicious Venezuela Corn Bread Pattie",
      price: 4.50,
      id: '123'
    },

    {
      name: 'Empanadas',
      description: "white corn based stuffed hot pocket",
      price: 6.00,
      id: '124'
    }

  ]

};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">  <div class=\"row\">    <div class=\"col-sm-8\">      <h1>Gabby\'s E-Store</h1>      <div class=\"row\">        <div v-for=\"item in $store.products\" class=\"col-sm-4 product-item-container text-center\">          <h3>{{item.name}}</h3>          <img :src=\"item.image\" alt=\"\" />          <div class=\"price\">{{item.price | currency}}</div>          <div class=\"add-to-cart\">            <button class=\"btn btn-block btn-primary\" @click=\"addToCart(item)\">Add to Cart</button>          </div>        </div>      </div>    </div>    <div class=\"col-sm-4\"></div>    <h3>cart</h3>    <ul>      <li v-for=\'product in $store.cart\'>          {{product.name}}-{{product.price}}          <button class=\"btn btn-danger\" @click=removeFromCart(product) type=\"button\" name=\"button\">x</button>      </li>    </ul>    <h5>Total - {{total}}</h5>  </div></div>"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (key) {
    return {
        get: function get() {
            return key.split('.').reduce(function (pValue, cValue) {
                return pValue[cValue];
            }, this.$root.store);
        },
        set: function set(value) {
            var path = key.split('.');
            var length = path.length - 1;
            var store = this.$root.store;

            for (var i = 0; i < length; i++) {
                if (store.hasOwnProperty(path[i])) {
                    store = store[path[i]];
                }
            }

            store[path[i]] = value;
        }
    };
};

/***/ })
/******/ ]);
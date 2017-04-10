var store = require('./store.js');


module.exports = new Vue({
  el: '#app',
  template: require('./app.html'),
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

const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: true,
    }
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    decrementFromCart() {
      if (this.cart > 0) {
        this.cart -= 1
      }
    },
  },
})

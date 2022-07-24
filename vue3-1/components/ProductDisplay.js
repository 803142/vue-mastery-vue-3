app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      requared: true
    }
  },
  template:
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" alt="">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out Of Stock</p>
        <p>Shipping: {{ shipping }} </p>
        <ul> 
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateCurrentVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
        ></div>
        <button 
          class="button" 
          @click="addToCart" 
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock">
          +
        </button>
        <button class="button" v-on:click="decrementFromCart">-</button>

      </div>
    </div>
    <review-form
    @review-submitted="addReview"
    ></review-form>
    <review-list
    :reviews="reviews"
    ></review-list>
  </div>`,
  data() {
    return {
      product: 'Socks',
      description: 'Good socks',
      currentVariant: 0,
      details: ['50% cotton', '30% wool', '20% poliester'],
      variants: [
        {id:2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 5},
        {id:2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 5}
      ],
      brand: 'M',
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart');
      this.variants[this.currentVariant].quantity -= 1
    },
    decrementFromCart() {
      this.$emit('decrement-from-cart');
      this.variants[this.currentVariant].quantity += 1
    },
    updateCurrentVariant(currentVariant) {
      this.currentVariant = currentVariant
    },
    addReview(review) {
      this.reviews.push(review);
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
    image() {
      return this.variants[this.currentVariant].image
    },
    inStock() {
      return this.variants[this.currentVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2,99
    }
  },
})
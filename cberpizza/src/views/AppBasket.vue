<script>
import axios from 'axios';
export default {
  data() {
    return {
      BASKET: [],
      price: 0,
      text: ``,
      userMoney: 0,
      isError: false,
    };
  },
  mounted() {
    this.loadBasket(true);
  },
  methods: {
    async loadBasket(isTrue) {
      let user = await axios.get(`/profile`);
      this.userMoney = user.data.money;
      let response = await axios.get(`/basket`);
      this.BASKET = response.data;
      if (isTrue) {
        for (let i = 0; i < this.BASKET.length; i++) {
          const count = this.BASKET[i];
          this.price += count.price;
        }
      }
      console.log(this.BASKET);
    },
    async remove(index) {
      this.price = this.price - this.BASKET[index].price;

      let response = await axios.get(`/remove`, {
        params: { id: index },
      });
      this.BASKET = response.data;
      console.log(index);

      this.loadBasket();
    },
    async buy() {
      if (this.userMoney < this.price) {
        this.isError = true;
      } else if (this.userMoney >= this.price && this.price != 0) {
        await axios.get(`/buy`, { params: { isBuy: true, price: this.price } });
        this.price = 0;
        this.loadBasket();
      }
    },
  },
};
</script>
<template>
  <div class="wrapper-basket">
    <div class="wrapper-card">
      <h3 class="count-item">{{ BASKET.length }} товарa на {{ price }}р</h3>
      <div class="overflow">
        <div v-for="(pizza, index) in BASKET" class="card">
          <div class="img">
            <img :src="`src/assets/${pizza.title}.png`" />
          </div>
          <div class="buy">
            <h3>{{ pizza.title }}</h3>
            <div class="wrapper-price">
              <span class="price">{{ pizza.price }}р</span>
            </div>
          </div>
          <div class="icon">
            <button @click="remove(index)" class="remove">
              <ion-icon name="close"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      <div @click="buy" class="buy">
        <button>Купить</button>
      </div>
      <div v-if="isError" class="error">
        <h3>У вас не хватает денег</h3>
      </div>
    </div>
  </div>
</template>
<style>
.overflow {
  overflow-y: scroll;
  min-height: 50vh;
  max-height: 50vh;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
}
.wrapper-basket .buy {
  display: flex;
}

.error {
  background-color: rgba(255, 102, 102, 0.767);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper-basket .buy button {
  margin: 15px auto;
  width: 50%;
  padding: 10px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  background: -webkit-linear-gradient(315deg, #7ee9ff 35%, var(--color3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-shadow: var(--shadow);
  cursor: pointer;
  border-radius: 5px;
}

.count-item {
  text-align: center !important;
  margin-bottom: 15px;
}
.wrapper-basket {
  width: 100%;
  height: 100%;
}
.wrapper-basket .card {
  max-height: 100px;
  position: relative;
}
.wrapper-basket .card img {
  object-fit: cover;
  max-height: 100px;
  width: auto;
}
.wrapper-basket .icon {
  height: auto;
}
.remove {
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  position: absolute;
  cursor: pointer;
}
.remove svg {
  width: 1.2em;
  height: 1.2em;
  color: #000;
}
</style>

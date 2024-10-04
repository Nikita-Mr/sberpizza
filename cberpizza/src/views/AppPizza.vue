<script>
import axios from 'axios';
export default {
  data() {
    return {
      PIZZA: [],
      status: ``,
      pizzaIndex: ``
    };
  },
  mounted() {
    this.loadPizza();
  },
  methods: {
    async loadPizza() {
      let response = await axios.get(`/pizza`);
      this.PIZZA = response.data;
    },
    async buy(id, index) {
      console.log(id);
      let response = await axios.get(`/in-basket`, { params: { id: id } });
      this.status = response.status
      this.pizzaIndex = index
      if(this.status == 200){
        let pizza = document.querySelectorAll(`.wrapper-pizza .card .icon`)
        pizza[index].classList.add(`animation`)
        setTimeout(()=>{pizza[index].classList.remove(`animation`); this.status = ``}  , 500)
      }
    },

  },
};
</script>
<template>
  <div class="wrapper-pizza">

    <div v-for="(pizza, index) in PIZZA" class="card">
      <div class="img">
        <img :src="`src/assets/${pizza.title}.png`" />
      </div>
      <div class="buy">
        <h3>{{ pizza.title }}</h3>
        <div class="wrapper-price">
          <button @click="buy(pizza._id, index)" class="in-basket">В корзину</button>
          <span class="price">{{ pizza.price }}р</span>
        </div>
      </div>
      <div class="icon">
        <div @click="buy(pizza._id, index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.alert{
  width: 100%;
  padding: 10px;
  font-family: cursive;
  font-size: 18px;
}
.success{
  background-color: rgba(102, 255, 102, 0.767);
}
.danger{
  background-color: rgba(255, 102, 102, 0.767);
}
.wrapper-pizza {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.card {
  min-width: 100%;
  max-height: 294px;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
}

.card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.card .buy {
  display: flex;
  padding: 10px;
  justify-content: space-around;
  /* align-items: center; */
  padding: 10px 15px;
  /* flex-wrap: wrap; */
  /* border-top: 1px solid grey; */
  flex-direction: column;
}

.card .icon {
  flex-grow: 1;
  margin-right: 10px;
  height: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.animation{
  animation: translateArrow 300ms cubic-bezier(0, 0, 0.2, 1);
}
.card .icon div {
  /* display: inline-block; */
  width: 50px;
  /* display: flex; */
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color3);
}

.card .icon path {
  stroke-width: 20px;
}

.card .wrapper-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.card:hover {
  box-shadow: 0px 0px 8px 0px #00000073;
  background-color: #afafaf33;
}
.card:active {
  box-shadow: 0px 0px 8px 0px #00000073;
  background-color: #afafaf33;
}

.in-basket {
  background-color: var(--color3);
  padding: 5px 15px;
  width: 108px;
  height: 29px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.price {
  font-family: 'Arial';
  font-weight: 500;
}
@keyframes translateArrow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50px);
  }
}
</style>

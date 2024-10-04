<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ru');
dayjs.extend(relativeTime)
export default {
  data() {
    return {
      USER: {},
      HISTORY: {},
    };
  },
  mounted() {
    this.loadUser();
    this.loadHistory();
  },
  methods: {
    async loadUser() {
      let response = await axios.get(`/profile`);
      this.USER = response.data;
    },
    async loadHistory() {
      let response = await axios.get(`/history`);
      this.HISTORY = response.data.historys;
    },
    getTimeToHarvest(date) {
      let day = dayjs(date);
      return day.fromNow();
    },
    async exit(){
      await axios.get(`/exit`, {params:{isExit: true}})
    }
  },
};
</script>

<template>
  <div class="wrapper-profile">
    <div class="profile">
      <div class="logo">
        <img :src="`src/assets/${USER.img}.jpg`" />
      </div>
      <div class="name">
        <span class="text">{{ USER.name }}</span>
        <span class="text phone">+{{ USER.phone }}</span>
      </div>
    </div>
    <div class="sberCard">
      <div class="number">
        <span class="text">1234-2134-1234-1234</span>
      </div>
      <div class="money">
        <span class="text">{{ USER.money }}р</span>
      </div>
    </div>
    <div class="wrapper_history">
      <h3>История заказов</h3>
      <div class="history">
        <div
          v-for="(historys, index) in HISTORY"
          class="historyItem"
        >
          <div class="timePrice">
            <h3>{{ getTimeToHarvest(historys.createdAt) }}</h3>
            <h3>Заказ на {{ historys.price }}р</h3>
          </div>
          <div v-for="(pizza, index) in historys.history" class="card">
            <div class="img">
              <img :src="`src/assets/${pizza.title}.png`" />
            </div>
            <div class="buy">
              <h3>{{ pizza.title }}</h3>
              <div class="wrapper-price">
                <span class="price">{{ pizza.price }}р</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-exit">
      <button class="exit" @click="exit">Выйти</button>
    </div>
  </div>
</template>

<style>
.wrap-exit{
  width: 100%;
  height: auto;
  display: flex;
}
.exit{
  cursor: pointer;
  background-color: lightcoral;
  font-size: 15px;
  font-family: cursive;
  border: none;
  margin: auto;
  padding: 10px;
  width: 50%;
  margin-bottom:30px;
}
.wrapper-profile .card {
  max-height: 100px;
  position: relative;
}
.wrapper-profile .card img {
  object-fit: cover;
  max-height: 100px;
  width: auto;
}
.timePrice{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
}
.history {
  display: grid;
  gap: 10px;
  overflow: scroll;
  height: 31vh;
}
.historyItem {
  width: 100%;
  height: auto;
  background-color: #f1f0f0;
}
.wrapper_history h3:not(.card h3) {
  margin: 0 30px 5px 30px ;
}
.sberCard {
  width: 80%;
  height: 200px;
  box-shadow: var(--shadow);
  border-radius: 10px;
  margin: 30px auto;
}
.sberCard .number {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sberCard .money {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 100%;
}
.wrapper-profile {
  height: 100%;
  width: 100%;
}
.profile {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-self: flex-start;
  width: 100%;
}
.logo {
  width: 100px;
  height: 100px;
  background: #333;
  border-radius: 100%;
  outline: 2px solid var(--color3);
  outline-offset: 4px;
}
.name {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.phone {
  font-size: 0.8em;
}
</style>

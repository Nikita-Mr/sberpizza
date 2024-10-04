<script>
import AppPizza from '../views/AppPizza.vue';
import AppRegister from '../views/AppRegister.vue';
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios'
export default {
  components: {
    AppPizza,
    AppRegister
  },
  data(){
    return{
      usertrue: false
    }
  },
  methods:{
    async loadRegister(){
      let response = await axios.get(`/user`)
      this.usertrue = response.data
    }
  }
};
</script>

<template>
  <div class="main">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style>
.main {
  height: calc(100% - 130px);
  /* background-image: url('src/assets/Без\ имени-1.png'); */
  background-repeat: repeat;
  /* background-size: cover; */
  background-position: center;
  background-size: 400px Auto;
}

.main .container {
  z-index: 10;
  padding: 15px 0;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 0px;
}
/*Дорожка*/

::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
}
/*Ручка*/

::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: none;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: none;
}
</style>

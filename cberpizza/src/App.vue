<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppMain from './components/AppMain.vue';
import AppRegister from './views/AppRegister.vue';
import axios from 'axios';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppMain,
    AppRegister,
  },
  data() {
    return {
      status: ``,
      register: true,
    };
  },
  mounted() {
    this.routingPizza();
  },
  watch: {
    routingPizza(){
      window.location.reload();
    }
  },
  methods: {
    async routingPizza() {
      let response = await axios.get(`/registerTrue`);
      this.status = response.data;
      if (this.status) {
        this.register = false;
        this.$router.push({
          name: 'pizza',
        });
      } else if (this.status == ``) {
        this.register = true;
      }
      if (this.$route.path == '/') {
        this.$router.push({
          name: 'pizza',
        });
      }
      
    },
  },
  // mounted(){
  //   this.loadRegister()
  // },
  // watch(){
  //   this.loadRegister()
  // },
  // methods:{
  //   async loadRegister(){
  //     let response = await axios.get(`/register`)
  //     this.status = response.status
  //     if(this.status == 200){
  //       this.register = false
  //     } else {
  //       this.register = true
  //     }
  //   }
  // }
};
</script>

<template>
  <div id="app">
    <app-header />
    <app-main v-if="register == false" />
    <app-register v-if="register == true" />
    <app-footer v-if="register == false" />
  </div>
</template>

<style>
@media (max-width: 360px) {
  .wrapper-pizza .card .icon {
    display: none;
  }
}
@media (min-width: 360px) {
  .main img {
    width: 100%;
    height: calc(150px + (300- 150) * (100vw - 361px) / (520 - 361));
    z-index: 0;
  }
  .wrapper-pizza .card .icon {
    height: auto;
  }
}
</style>

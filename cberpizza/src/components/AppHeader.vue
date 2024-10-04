<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  mounted() {
    this.loadTitle();
  },
  watch: {
    route() {
      this.loadTitle();
    },
  },
  methods: {
    loadTitle(router) {
      if (router == 'pizza') {
        return 'Сберпицца';
      } else if (router == 'profile') {
        return 'Сберпрофиль';
      } else if (router == 'basket') {
        return 'Сберкорзина';
      }
    },
  },
};
</script>
<template>
  <div class="header">
    <h2>{{ loadTitle($route.name) }}</h2>
  </div>
</template>

<style>
.header {
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #fff;
  box-shadow: -1px -1px 8px 0px #00000073;
  position: relative;
}
</style>

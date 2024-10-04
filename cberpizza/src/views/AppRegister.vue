<template>
  <div class="register">
    <form @submit="register">
      <h3 v-if="text">{{ text }}</h3>
      <input type="text" placeholder="Имя Фамилия..." v-model="name" />
      <input
        maxlength="12"
        type="number"
        placeholder="+7(999)-999-99-99"
        v-model="phone"
      />
      <button type="submit">Зарегестрироваться</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      phone: '',
      text: ``,
    };
  },
  methods: {
    async register(evt) {
      evt.preventDefault();
      if (this.name && this.phone) {
        this.text = `Зарегестрирован. обнови страницу`
        this.$router.push({ name: `pizza` });
      } else if(this.phone){
        this.text = `Запишите Имя и фамилию правильно`
      } else{
        this.text = `Запишите номер телефона правильно`
      }
      if (this.name && this.phone) {
        await axios.post('/register', {
          name: this.name,
          phone: this.phone,
        });
        
      }
    },
  },
};
</script>
<style>
.register {
  display: flex;
  height: 92vh;
  width: 100%;
}
.register form {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.register input {
  padding: 20px 50px;
  width: 100%;
  border-radius: 10px;
  border: none;
  box-shadow: var(--shadow);
}
.register button {
  background-color: var(--color3);
  color: #fff;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
}
</style>

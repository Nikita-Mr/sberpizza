<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  methods: {
    active(num) {
      let links = document.querySelectorAll(`.list`);
        links.forEach((link)=> link.classList.remove(`active`))
        links[num].classList.add(`active`)
    },
  },
};
</script>
<template>
  <div class="footer">
    <nav class="navigation">
      <ul>
        <li @click="active(0)" class="list pizza " :class="{'active': $route.name == 'pizza'}">
          <RouterLink to="/pizza">
            <span class="icon"><ion-icon name="pizza"></ion-icon></span>
            <span class="text">Пицца</span>
          </RouterLink>
        </li>
        <li @click="active(1)" class="list" :class="{'active': $route.name == 'profile'}">
          <RouterLink to="/profile">
            <span class="icon"><ion-icon name="person"></ion-icon></span>
            <span class="text">Профиль</span>
          </RouterLink>
        </li>
        <li @click="active(2)" class="list" :class="{'active': $route.name == 'basket'}">
          <RouterLink to="/basket">
            <span class="icon"><ion-icon name="basket"></ion-icon></span>
            <span class="text">Корзина</span>
          </RouterLink>
        </li>
        <div class="indicator"></div>
      </ul>
    </nav>
  </div>
</template>

<style>
.navigation {
  position: relative;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  box-shadow: 1px 1px 8px 0px #00000073;
}

.navigation ul {
  display: flex;
  padding: 0 15px;
}

.navigation ul li {
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  z-index: 1;
}

.navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 500;
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  line-height: 70px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: #b6b1b1;
}

.navigation ul li.active a .icon {
  transform: translateY(-15px);
}

.navigation ul li a .icon svg {
  color: var(--color3);
  fill: none;
  stroke: var(--color3);
  stroke-width: 10px;
}

.navigation ul li a .text {
  position: absolute;
  color: var(--color3);
  font-weight: 500;
  font-size: 0.75em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(20px);
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
}

.navigation ul li.active a .text {
  opacity: 1;
  transform: translateY(30px);
}

.indicator {
  position: absolute;
  top: -50%;
  width: 70px;
  height: 70px;
  background: var(--clr);
  border-radius: 50%;
  border: 1px solid var(--color3);
  transition: 0.5s;
}

.navigation ul li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(70px * 0));
}

.navigation ul li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(70px * 1));
}

.navigation ul li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(70px * 2));
}

</style>

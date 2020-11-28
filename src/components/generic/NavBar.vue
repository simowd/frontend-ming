<template>
  <div>
    <div class="nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="50rem"
          height="60rem"
          class="image-nav-bar"
        />
        <router-link to="/" :style="{'color': linkColor}">Tienda</router-link>
        <router-link to="/highlights" :style="{'color': color}">Destacados</router-link>
        <router-link to="/Sale" :style="{'color': linkColor}">Ofertas</router-link>
        <router-link to="/Latest-release" :style="{'color': linkColor}">Últimos Lanzamientos</router-link>
        <router-link to="/MyAccount" :style="{'color': linkColor}">Mi cuenta</router-link>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  props:["color", "linkColor", "colorDos"]  
};
</script>
<style lang="scss" scoped>

#nav {
  text-align: center;
  text-align: center;
}

#nav a {
  padding-top: 2rem;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: #707070;
  font-size: 2rem;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #66698c;
  font-size: 2.5rem;
}

</style>
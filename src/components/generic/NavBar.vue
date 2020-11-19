<template>
  <div>
    <div class="container-nav-bar" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="60rem"
          height="70rem"
          class="image-nav-bar"
        />
        <router-link to="/HomePage">Tienda</router-link>
        <router-link to="/cats">Destacados</router-link>
        <router-link to="/dogs">Ofertas</router-link>
        <router-link to="/dogs">Ultimos Lanzamientos</router-link>
        <router-link to="/dogs">Mi cuenta</router-link>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
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
  font-size: 2.5rem;
  margin-left: 13rem;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #66698c;
}
</style>
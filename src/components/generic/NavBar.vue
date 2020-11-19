<template>
  <div>
    <div class="nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="60rem"
          height="70rem"
          class="image-nav-bar"
        />
        <router-link to="/">Tienda</router-link>
        <router-link to="/Highlighted">Destacados</router-link>
        <router-link to="/Sale">Ofertas</router-link>
        <router-link to="/LatestRelease">Últimos Lanzamientos</router-link>
        <router-link to="/MyAccount">Mi cuenta</router-link>
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
  font-size: 2rem;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #66698c;
}

</style>
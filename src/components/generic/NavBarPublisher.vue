<template>
  <div>
    <div class="admin-nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="50rem"
          height="60rem"
          class="image-nav-bar"
        />
        <router-link to="/publisher/account/1">Administrar Cuenta</router-link>
        <router-link to="/publisher/dashboard/1">Dashboard</router-link>
        <router-link to="/publisher/games/1">Administrar Juegos</router-link>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarPublisher",
  components: {},
};
</script>
<style lang="scss" scoped>

#nav {
  text-align: left;
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
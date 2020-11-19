<template>
  <div>
    <div class="admin-nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="60rem"
          height="70rem"
          class="image-nav-bar"
        />
        <router-link to="/admin/add-publisher">Agregar Publisher</router-link>
        <router-link to="/">Administar Editores</router-link>
        <router-link to="/">Administar Juegos</router-link>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarAdmin",
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
}

</style>
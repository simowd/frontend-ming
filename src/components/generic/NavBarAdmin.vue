<template>
  <div>
    <div class="admin-nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="50rem"
          height="60rem"
          class="image-nav-bar"
          @click="HomePage"
        />
        <router-link to="/admin/add-publisher">Agregar Publisher</router-link>
        <router-link to="/admin/publisher-list">Administrar Editores</router-link>
        <router-link to="/admin/games">Administrar Juegos</router-link>
        <p  class="account" @click="LogOut">Cerrar Sesión</p>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarAdmin",
  components: {},
  methods:{
    HomePage(){
       this.$router.push("/admin/add-publisher");
    },
    LogOut() {
      this.$ls.clear();
      this.$router.push("/login");
      this.flag = 0;
    },
  }
};
</script>
<style lang="scss" scoped>
#nav {
  text-align: left;
}
.account {
  padding-top: 2rem;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: #707070;
  font-size: 2rem;
  cursor: pointer;
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
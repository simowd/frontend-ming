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
        <router-link :to="'/publisher/account/'+this.id_publisher">Administrar Cuenta</router-link>
        <router-link :to="'/publisher/dashboard/'+this.id_publisher">Dashboard</router-link>
        <router-link :to="'/publisher/games/'+this.id_publisher">Administrar Juegos</router-link>
        <p  class="account" @click="LogOut">Cerrar Sesión</p>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarPublisher",
  components: {},
  data() {
    return {
      id_publisher: ''
    };
  },
  mounted() {

    if (this.$ls.get("data") != null) {
      this.id_publisher=this.$ls.get("id_publisher")
    }
  },

  methods: {
    HomePage() {
      this.$router.push("/publisher/account/"+this.id_publisher);
    },
      LogOut() {
      this.$ls.clear();
      this.$router.push("/login");
      this.flag = 0;
    },
  },
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
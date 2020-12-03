<template>
  <div>
    <div class="nav-bar-container" id="nav">
      <header>
        <img
          src="@/assets/logoming.png"
          width="50rem"
          height="60rem"
          class="image-nav-bar"
          @click="HomePage"
        />
        <router-link to="/" :style="{ color: linkColor }">Tienda</router-link>
        <router-link to="/highlights" :style="{ color: color }"
          >Destacados</router-link
        >
        <router-link to="/Sale" :style="{ color: linkColor }"
          >Ofertas</router-link
        >
        <router-link to="/Latest-release" :style="{ color: linkColor }"
          >Últimos Lanzamientos</router-link
        >
        <div v-if="flag == 1" class="image-profile">
          <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <p class="account" :style="{ color: linkColor }" v-on="on">
                Mi Cuenta
              </p>
            </template>
            <v-list>
              <v-list-item
                :to="item.link"
                @click="item.action"
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <img
            v-if="flag == 1"
            :src="banner"
            width="40rem"
            height="40rem"
            class="image-nav-bar"
            :style="{
              backgroundImage: 'url(' + this.banner + ')',
              borderRadius: '50%',
             
            }"
          />
        </div>
        <div v-else class="login">
          <router-link to="/login" :style="{ color: linkColor }"
            >Iniciar Sesión</router-link
          >
          <!-- <router-link to="/register" :style="{ color: color }" >Registrarse</router-link> -->
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      flag: 0,
      showMenu: false,
      banner: null,
      items: [
        { title: "Mi cuenta", link: "/my-account", icon: "mdi-account" },
        { title: "Carrito", link: "/cart", icon: "mdi-cart" },
        { title: "Cerrar Sesion", icon: "mdi-logout-variant", action: this.LogOut },
      ],
    };
  },
  props: ["color", "linkColor", "colorDos"],

  mounted() {
    if (this.$ls.get("data") != null) {
      if (JSON.parse(this.$ls.get("data")).photo_path != null) {
        this.flag = 1;
        this.banner = JSON.parse(this.$ls.get("data")).photo_path;
        // console.log(this.banner);
      } else {
        this.flag = 1;
        this.banner = require("../../assets/pub-icon.png");
      }
    }
  },
  methods: {
    HomePage() {
      this.$router.push("/");
    },
    LogOut() {
      this.$ls.clear();
      this.$router.push("/");
      this.flag = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
#nav {
  text-align: center;
  text-align: center;
}
.login {
  margin-top: 2.1rem;
}
.image-profile{
  display: flex;
  justify-content: space-between;
  width: 12%;
  align-items: center;
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

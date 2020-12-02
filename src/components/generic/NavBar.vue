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
        <router-link to="/MyAccount" :style="{ color: linkColor }"
          >Mi cuenta</router-link
        >
        <img
          v-if="flag == 0"
          src="@/assets/pub-icon.png"
          width="60rem"
          height="60rem"
          class="image-nav-bar"
          @click="LogOut"
          :style="{
            borderRadius: '50%',
            cursor: 'pointer',
          }"
        />
        <img
          v-if="flag == 1"
          :src="banner"
          width="60rem"
          height="60rem"
          class="image-nav-bar"
          @click="LogOut"
          :style="{
            backgroundImage: 'url(' + this.banner + ')',
            borderRadius: '50%',
            cursor: 'pointer',
          }"
        />
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
      banner: null,
    };
  },
  props: ["color", "linkColor", "colorDos"],

  mounted() {
    if (this.$ls.get("data") != null) {
      if (JSON.parse(this.$ls.get("data")).photo_path != null) {
        this.flag = 1;
        this.banner=JSON.parse(this.$ls.get("data")).photo_path
        console.log(this.banner)
      }
    }
    console.log(this.$ls.get('user_type'))
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
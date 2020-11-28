<template>
  <div class="background-image">
    <NavBar />
    <div v-if="game != null">
      <GameInfo :id="$route.params.id" :game="game" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";

import NavBar from "@/components/generic/NavBar.vue";
import GameInfo from "@/components/games/GameInfo.vue";

export default {
  name: "Game",
  components: {
    NavBar,
    GameInfo,
  },
  data() {
    return {
      game: null,
      errores: null,
    };
  },
  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/store/games/" + this.$route.params.id)
      .then((response) => (this.game = response.data))
      .catch((error) => (this.errores = error.response.status));
  },
  watch: {
    errores: function(val) {
      if (val === 404) {
        this.$router.push({ path: "*" });
      }
    },
  },
};
</script>

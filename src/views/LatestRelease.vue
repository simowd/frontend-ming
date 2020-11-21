<template>
  <div>
    <NavBar />
       
    <v-row no-gutters>
      <v-col v-for="(game,index) in gameInfo" :key="index" cols="12" sm="6">
        <LatestGameCard
              :title="game.title"
              :price="game.price"
              :id="game.id"
              :color="game.color"
              :banner="game.banner"
              :description="game.description"
            />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import LatestGameCard from "@/components/latest/LatestGameCard.vue";
import axios from "axios";

export default {
  name: "LatestRelease",
  components: {
    NavBar,
    LatestGameCard
  },
  data() {
    return {
      gameInfo: null,
    };
  },
  mounted() {
    var url1 = "ec2-34-234-223-198.compute-1.amazonaws.com:8080";
    axios
      .get("http://"+url1+"/ming/v1/games?page=1&latest=true")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>
<template>
  <div>
    <v-card
      width="55%"
      height="20%"
      class="rounded-card"
      :style="{
        boxShadow: '0 0.5px 6rem ' + color + '',
        borderRadius: '40px',
      
  
      }"
    >
      <v-img
        gradient="to top right, rgba(0,0,0,.33), rgba(0,32,72,.7)"
        :src="banner"
        :style="{
        boxShadow: '0 0.5px 6rem ' + color + '',
    
        height: '40rem'
  
      }"
      >
        <v-card-text><br /></v-card-text>
        <v-card-text style="height: 90px; position: relative">
          <v-btn absolute fab top right color="transparent">
            <v-img :src="infoIcon" @click="game"></v-img>
          </v-btn>
          <v-btn absolute fab top left color="transparent">
            <a :href="download"> <v-img :src="downIcon"></v-img></a>
          </v-btn>
        </v-card-text>
        <v-card-title>
          <!-- {{ title }} -->
          <v-row>
            <v-col :cols="8">
              <h2>
                <span class="title-p"> {{ title }}</span>
              </h2>

              <h2 class="genre">
                Géneros:
                <span
                  v-for="(genres, key) in genre"
                  :key="genres.index"
                  class="genre"
                >
                  <span v-if="key === genre.length - 1">
                    {{ genres }}
                  </span>
                  <span v-else> {{ genres }} -</span>
                </span>
              </h2>
              <!-- <h1 class="genre">Genero: {{ genre }}</h1> -->
            </v-col>
            <v-col :cols="4"> </v-col>
          </v-row>
        </v-card-title>
      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GameCardInfo",
  data() {
    return {
      image:
        "http://1.bp.blogspot.com/-8PfnHfgrH4I/TylX2v8pTMI/AAAAAAAAJJ4/TICBoSEI57o/s1600/search_by_image_image.png",
      infoIcon: require("../../assets/info.png"),
      downIcon: require("../../assets/download.png"),
    };
  },
  props: {
    title: {
      type: String,
      default: "No title",
    },
    banner: {
      type: String,
      default: require("../../assets/404.png"),
    },
    id: {
      type: Number,
      default: -1,
    },
    genre: {
      type: Array,
      default: () => [],
    },
    color: {
      default: "#FFFFFF",
    },
    download: {
      type: String,
      default: "*",
    },
  },
  //   ["title", "price", "banner", "id", "color", "sale"],
  methods: {
    game() {
      this.$router.push("/games/" + this.id);
    },
  },
};
</script>
<style scoped>
.text-sale {
  text-decoration: line-through;
}
p {
  color: white;
  font-size: 5rem;
}

.home-page-discount {
  font-size: 1.5rem;
  font-weight: 300;
  height: 3rem;
  text-align: center;
  margin-top: -0.5rem;
  margin-left: 5rem;
  padding-top: 0.4rem;
  margin-right: 6rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
  width: 20%;
}
.rounded-card {
  border-radius: 8%;
}
.title-p {
  
  color: white;
  font-size: 3.4rem;
 
}
.genre {
  margin-top: 2rem;
  color: white;
}
</style>


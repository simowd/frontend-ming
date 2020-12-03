<template>
  <div>
    <v-card
      width="70%"
      class="rounded-card"
      :style="{
        backgroundImage: 'url(' + banner + ')',
        boxShadow: '0 0.5px 6rem ' + color + '',
      }"
    >
      <v-img :src="banner" @click="game">
        <v-card-title>{{ title }}</v-card-title>
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
    };
  },
  props: {
    title: {
      type: String,
      default: "No title",
    },
    price: {
      type: Number,
      default: 0.0,
    },
    banner: {
      type: String,
      default: require("../../assets/404.png"),
    },
    id: {
      type: Number,
      default: -1,
    },
    color: {},
    sale: {
      type: Number,
      default: 0.0,
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
  border-radius: 10%;
}
</style>


<template>
  <div>
    <div class="card">
      <div
        class="game-image"
        @click="game"
        :style="{
          backgroundImage: 'url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
        }"
      ></div>
      <div class="game-info">
        <p>{{ title }}<br /></p>
        <p v-if="price == 0">Free to Play</p>
        <div
          v-else-if="sale > 0"
          :style="{
            width: '85%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '10rem',
          }"
        >
          <p>${{ (price - (price * sale) / 100).toFixed(2) }} USD -</p>
          <p class="text-sale">${{ price }} USD</p>
          <p class="home-page-discount">- {{ sale }} %</p>
        </div>

        <p v-else>${{ price }} USD</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  data() {
    return {
      image:
        "http://1.bp.blogspot.com/-8PfnHfgrH4I/TylX2v8pTMI/AAAAAAAAJJ4/TICBoSEI57o/s1600/search_by_image_image.png",
    };
  },
  props: ["title", "price", "banner", "id", "color", "sale"],
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
</style>


<template>
  <div>
    <div class="card">
      <div
        class="game-image"
        :style="{
          backgroundImage: 'url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
        }"
      ></div>
      <div class="game-info">
        <p>
          {{ title }}<br />
          ${{ price }} USD
        </p>
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
  props: ["title", "price", "banner", "id", "color"],
};
</script>


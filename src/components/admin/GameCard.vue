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
      <div class="game-card-admin">
        <div class="game-info">
          <p>{{ title }}<br /></p>
          <p v-if="price == 0">Free to Play</p>
          <div
            v-else-if="sale > 0"
            :style="{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '0rem',
            }"
          >
            <!-- <p class="home-page-discount">- {{ sale }} %</p> -->
            <p>${{ (price - (price * sale) / 100).toFixed(2) }} USD -</p>
            <p class="text-sale">${{ price }} USD</p>
          </div>

          <p v-else>${{ price }} USD</p>
        </div>
        <div class="game-card-admin-highlight">
          <img
            src="@/assets/star.png"
            width="45px"
            height="45px"
            :style="{ cursor: 'pointer' }"
            v-if="highlighted == 0 && show"
            @click="highlightup(id, highlighted)"
          />
          <img
            src="@/assets/edithighlight.png"
            width="45px"
            height="45px"
            v-else-if="show1"
            :style="{ cursor: 'pointer' }"
            @click="highlightdown(id, highlighted)"
          />
        </div>
      </div>
      <p v-if="sale > 0" class="home-page-discount">- {{ sale }} %</p>
    </div>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";

export default {
  name: "GameCard",
  data() {
    return {
      image:
        "http://1.bp.blogspot.com/-8PfnHfgrH4I/TylX2v8pTMI/AAAAAAAAJJ4/TICBoSEI57o/s1600/search_by_image_image.png",
      info: {
        highlight: null,
      },
      show: true,
      show1: true,
    };
  },
  props: ["title", "price", "banner", "id", "color", "highlighted", "sale"],
  methods: {
    highlightup(id, highlighted) {
      id;
      highlighted;
      this.info.highlight = highlighted = 1;
      axios
        .put("http://" + URLBACKEND + "/ming/v1/highlight/" + id, this.info)
        .then((result) => {
          console.log(result);
        });
      this.show = false;
      this.show1 = true;
    },
    highlightdown(id, highlighted) {
      id;
      highlighted;
      this.info.highlight = highlighted = 0;
      axios
        .put("http://" + URLBACKEND + "/ming/v1/highlight/" + id, this.info)
        .then((result) => {
          console.log(result);
        });
      this.show1 = false;
      this.show = true;
      this.highlighted = 0;
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
  margin-left: 19rem;
  padding-top: 0.4rem;
  margin-right: 6rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
  width: 20%;
}
</style>
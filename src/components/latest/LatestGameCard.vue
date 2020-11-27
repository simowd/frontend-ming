<template>
  <div>
    <div class="card-latest-releases">
      <div
        class="game-image-latest-releases"
        @click="game"
        :style="{
          backgroundImage:
            'linear-gradient(transparent -2%,#121212), url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div class="game-description">
          <span align="center">
            {{
              description.substr(0, description.indexOf(".")) ||
              description.substr(0, description.indexOf("!"))
            }}
          </span>
        </div>
      </div>

      <div class="game-info-latest-releases">
        <p :style="{ fontSize: '2rem' }">
          {{ title }}<br />
          {{ date.substr(0, date.indexOf(" ")) }}
        </p>
        <p v-if="price == 0" :style="{ fontSize: '1.5rem' }">Free to Play</p>
        <div
          v-else-if="sale > 0"
          :style="{
            width: '65%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '20rem',
          }"
        >
          <p :style="{ fontSize: '1.5rem' }">
            ${{ (price - (price * sale) / 100).toFixed(2) }}USD -
          </p>
          <p class="text-sale" :style="{ fontSize: '1.5rem' }">
            ${{ price }} USD
          </p>
          <p class="home-page-discount">- {{ sale }} %</p>
        </div>

        <p v-else :style="{ fontSize: '1.5rem' }">${{ price }} USD</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestGameCard",
  props: [
    "title",
    "price",
    "banner",
    "id",
    "color",
    "description",
    "date",
    "sale",
  ],

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
  margin-right: 1rem;
}

.home-page-discount {
  font-size: 1.5rem;
  font-weight: 300;
  height: 3rem;
  text-align: center;
  margin-top: -0.2rem;
  margin-left: 5rem;
  padding-top: 0.4rem;
  margin-right: 10rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
  width: 20%;
}
</style>

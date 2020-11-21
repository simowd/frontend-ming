<template>
  <div>
    <div class="card-latest-releases">
      <div
        class="game-image-latest-releases"
        :style="{
          backgroundImage: 'linear-gradient(transparent -2%,#121212), url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
          backgroundSize: 'absolute',
          backgroundPosition: 'center',
        }"
      >
        <div class="game-description">
          <span align="center">
            {{ description }}
          </span>
        </div>
      </div>
      <div class="game-info-latest-releases">
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
  name: "LatestGameCard",
  props: ["title", "price", "banner", "id", "color", "description"],
};
</script>


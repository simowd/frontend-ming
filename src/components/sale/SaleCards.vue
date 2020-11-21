<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6">
        <div>
          <figure>
            <img v-bind:src="banner" />
          </figure>
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <h3>
            {{ title }}
          </h3>
          <p>{{ release_date }}<br /></p>
        </div>
      </v-col>
      <v-col cols="6">
        <div>- {{ sale }} %</div>
      </v-col>
      <v-col cols="6">
        <div>
          <p>
            {{ title }}<br />
            ${{ (price - (price * sale) / 100).toFixed(2) }}
            USD
          </p>
          <p class="text-sale">${{ price }} USD</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>


export default {
    name: "SaleCards",
  props: ["title", "price", "banner", "id", "color", "sale","release_date"],
};
</script>

<style scoped></style>

<template>
  <div>
    <div class="container-search-bar">
      <div class="search-bar">
        <v-text-field
          label="Buscar Juego"
          outlined
          color="#707070"
          append-icon="mdi-magnify"
          dense
        >
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style  scoped>
.v-text-field--outlined >>> fieldset {
  border-color:#707070;
}
</style>
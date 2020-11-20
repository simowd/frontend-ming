<template>
  <div>
    <div class="ofertas-label-container">
      <v-row no-gutters>
        <v-col cols="6">
          <p>
            Ofertas
          </p>
        </v-col>
        <v-col cols="6">
          
            <div class="search-bar">
              <v-text-field
                label="Buscar en Ofertas"
                outlined
                color="#707070"
                append-icon="mdi-magnify"
                dense
              >
              </v-text-field>
            </div>
          
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBarVue",
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #707070;
}
</style>

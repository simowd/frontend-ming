<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <img src="../../assets/account_img.png" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Apodo" required></v-text-field>
            <v-text-field label="Email" required></v-text-field>
            <v-select :items="countries" label="Pais" single></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="dialogClose"> Cancelar </v-btn>
      <v-btn color="blue darken-1" text @click="dialogClose">
        Actualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      countries: [
        "Bolivia",
        "Chile",
        "Argentina",
        "Brasil",
        "Uruguay",
        "Paraguay",
      ],
      close: false,
    };
  },
  props: ["dialogProfile"],
  methods: {
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogProfile);
    },
  },
};
</script>

<style>
</style>
<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field class="inputs" label="Contraseña Actual" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Contraseña Nueva" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Repita Contraseña" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>

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
    };
  },
  props: ["dialogPassword"],
  methods: {
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogPassword);
    },
  },
};
</script>

<style scoped>
.inputs {
  width: 60rem;
  margin-right: 20rem;
  margin-top: 3rem;
}

</style>
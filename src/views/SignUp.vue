<template>
  <div class="background-image">
    <NavBar />
    <div class="card-auth">
      <v-row no-gutters>
        <v-col cols="6">
          <div class="logo-auth">
            <img
              src="@/assets/logoming-black.png"
              width="210rem"
              height="210rem"
              text-align="center"
              align="center"
            />
          </div>

          <p class="d-flex justify-center pages-titles">Registrarse</p>

          <div class="signup-forms-container">
            <v-text-field
              label="Nombre de Usuario"
              outlined
              color="#707070"
            ></v-text-field>

            <v-text-field
              label="Apodo"
              outlined
              color="#707070"
            ></v-text-field>

            <v-text-field
              label="Correo Electrónico"
              outlined
              color="#707070"
            ></v-text-field>

            <v-text-field
              label="Contraseña"
              outlined
              color="#707070"
            ></v-text-field>

            <v-btn class="ma-2" outlined color="#707070">Outlined Button</v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="logo-auth">
            <img
              src="@/assets/logoming-black.png"
              width="210rem"
              height="210rem"
              text-align="center"
              align="center"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
export default {
  name: "SignUp",
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.logo-auth {
  text-align: center;
  padding-top: 4.5rem;
}
</style>

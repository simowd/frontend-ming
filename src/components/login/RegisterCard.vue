<template>
  <div class="card-auth">
    <v-container>
      <v-row>
        <v-col :cols="7">
          <div class="logo-register">
            <img
              src="@/assets/logoming-black.png"
              width="180rem"
              height="180rem"
            />
            <h1>Registrarse</h1>
          </div>
          <v-layout justify-center align-center>
            <v-form>
              <v-container class="form-register">
                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  label="Nombre Completo"
                  dense
                  color="#66698C"
                  class="login-input"
                  id="name"
                  v-model="infoUser.name"
                >
                </v-text-field>

                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  label="Apellidos"
                  dense
                  color="#66698C"
                  class="login-input"
                  id="lastname"
                  v-model="infoUser.lastname"
                >
                </v-text-field>

                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  label="Nombre de Usuario"
                  dense
                  color="#66698C"
                  class="login-input"
                  id="username"
                  v-model="infoUser.username"
                >
                </v-text-field>

                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  label="Apodo"
                  dense
                  color="#66698C"
                  class="login-input"
                  id="alias"
                  v-model="infoUser.alias"
                >
                </v-text-field>

                <v-text-field
                  outlined
                  :rules="[rules.required, rules.email]"
                  label="Correo Electrónico"
                  dense
                  color="#66698C"
                  class="login-input"
                  id="email"
                  v-model="infoUser.email"
                >
                </v-text-field>

                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  hint="Mínimo 8 caracteres"
                  color="#66698C"
                  outlined
                  @click:append="show1 = !show1"
                  class="login-input"
                  dense
                  id="password"
                  v-model="infoUser.password"
                ></v-text-field>
              </v-container>
              <v-layout justify-center align-center>
                <v-btn
                  large
                  color="#5a595e"
                  rounded
                  width="300"
                  dark
                  class="login-button"
                  @click="create"
                >
                  Registrarse
                </v-btn>
              </v-layout>
            </v-form>
            {{infoUser}}
          </v-layout>
        </v-col>
        <v-col :cols="5">
          <img src="@/assets/ugg-login.png" class="logo-auth" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";

export default {
  name: "RegisterCard",
  data() {
    return {
      infoUser: {
        name: null,
        lastname: null,
        username: null,
        alias: null,
        email: null,
        password: null,
      },
      title: "Reporte Preliminar",
      show1: false,
      rules: {
        required: (value) => !!value || "Requerido",
        min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    create() {
      axios
        .post("http://" + URLBACKEND + "/ming/v1/users/signup",this.infoUser)
        .then((response) => (this.infoUser = response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: -2rem;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-weight: 500;
  font-size: 4.5rem;
}
.login-button {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 15px;
}
</style>

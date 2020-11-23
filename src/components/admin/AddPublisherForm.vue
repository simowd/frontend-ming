<template>
  <div>
    <div class="add-publisher-forms-container" justify-center>
      <v-text-field
        :rules="[rules.required]"
        label="Nombre de Usuario"
        outlined
        color="#707070"
        id="username"
        v-model="infoUser.username"
      ></v-text-field>

      <v-text-field
        :rules="[rules.required, rules.email]"
        label="Correo Electrónico"
        outlined
        color="#707070"
        id="email"
        v-model="infoUser.email"
      ></v-text-field>

      <v-text-field
        :rules="[rules.required, rules.email]"
        label="Pay Pal"
        outlined
        color="#707070"
        id="paypal"
        v-model="infoUser.paypal"
      ></v-text-field>

      <v-text-field
        :rules="[rules.required]"
        label="Editor"
        outlined
        color="#707070"
        id="publisher"
        v-model="infoUser.publisher"
      ></v-text-field>
      
      <v-text-field
        :rules="[rules.required]"
        label="País"
        outlined
        color="#707070"
        id="idCountry"
        v-model="infoUser.idCountry"
      ></v-text-field>

      <!-- <v-combobox
        outlined
        persistent-hint
        chips
        dense
        color="#707070"
      ></v-combobox> -->

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
        id="password"
        v-model="infoUser.password"
      ></v-text-field>

      <v-layout justify-center>
        <v-btn class="ma-2" outlined color="#49a82c" width="25rem" @click="verify">
          Crear
        </v-btn>
      </v-layout>
      <!-- {{infoUser}} -->
      <!-- <ul>
        <li v-for="(country, i) in countriesInfo" :index="i" :key="country">
          {{ country.name }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";

export default {
  name: "AddPublisherForm",
  data() {
    return {
      infoUser: {
        username: null,
        email: null,
        paypal: null,
        publisher: null,
        idCountry: null,
        password: null,
      },
      countriesInfo: null,
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
  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/countries")
      .then((response) => (this.countriesInfo = response.data));

    //v-for="(country, i) in countriesInfo" :index="i" :key="country"
    // this.response.forEach(element => console.log(element));
    // var theArray = ['pa'];
    // var iterator = theArray.values();
    // for (let elements of iterator) {
    //   console.log(elements);
    // }
  },
  methods: {
    create() {
      axios
        .post("http://" + URLBACKEND + "/ming/v1/publisher", this.infoUser)
        .then((response) => (this.infoUser = response.data));
    },
    verify() {
      if (this.infoUser.username === null) {
        alert("Falta el Nombre de Usuario");
      } else if (this.infoUser.email === null) {
        alert("Falta el Correo Electrónico");
      } else if (this.infoUser.paypal === null) {
        alert("Falta el Correo de PayPal");
      } else if (this.infoUser.publisher === null) {
        alert("Falta el Editor");
      } else if (this.infoUser.idCountry === null) {
        alert("Falta el País");
      } else if (this.infoUser.password === null) {
        alert("Falta la Contraseña");
      } else {
        this.create();
      }
    },
  },
};
</script>

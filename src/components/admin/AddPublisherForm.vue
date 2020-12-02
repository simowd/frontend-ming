<template>
  <div>
    <div class="add-publisher-forms-container" justify-center>
      <v-form v-model="valid" ref="form">
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

        <v-combobox
          dense
          outlined
          color="#707070"
          item-color="#707070"
          :items="countries"
          label="País"
          id="idCountry"
          v-model="country"
        ></v-combobox>

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
      </v-form>
      <v-alert
        dense
        border="left"
        colored-border
        type="error"
        v-if="alert"
        width="60rem"
      >
        {{ this.alert_text }}
      </v-alert>
      <v-alert
        dense
        border="left"
        colored-border
        type="success"
        v-if="alert_sucess"
        width="60rem"
      >
        Cuenta de Publisher creada.
      </v-alert>
      <v-layout justify-center>
        <v-btn
          class="ma-2"
          outlined
          color="#49a82c"
          width="25rem"
          @click="verify"
        >
          Crear
        </v-btn>
      </v-layout>
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
      valid: null,
      alert: false,
      alert_sucess: false,
      alert_text: null,
      infoUser: {
        username: null,
        email: null,
        paypal: null,
        publisher: null,
        idCountry: null,
        password: null,
      },
      countriesInfo: null,
      countries: [],
      country: "",
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
  },
  methods: {
    create() {
      axios
        .post("http://" + URLBACKEND + "/ming/v1/publisher", this.infoUser)
        .then((response) => (this.infoUser = response.data));
    },
    verify() {
      if (this.checkProperties(this.infoUser)) {
        this.alert_text = "Todos los campos deben ser rellenados.";
        this.alert = true;
        this.alertTime();
      } else {
        if (this.infoUser.username.length >= 20) {
          this.alert_text = "El username es mayor a 20 caracteres.";
          this.alert = true;
          this.alertTime();
        } else {
          if (this.valid) {
            if (this.infoUser.idCountry === 0) {
              this.alert_text = "El País no es válido.";
              this.alert = true;
              this.alertTime();
            } else {
              // this.create();
              this.alert_sucess = true;
              this.alertTime();
              this.$refs.form.reset();
              this.restoreObjValues();
            }
          } else {
            this.alert_text = "El formulario no es válido.";
            this.alert = true;
            this.alertTime();
          }
        }
      }
    },
    alertTime() {
      setTimeout(() => {
        this.alert = false;
        this.alert_sucess = false;
      }, 3000);
    },
    checkProperties(obj) {
      var flag = false;
      for (var key in obj) {
        if (obj[key] === null || obj[key] === "") {
          flag = true;
        }
      }
      return flag;
    },
    restoreObjValues() {
      this.infoUser.username = null;
      this.infoUser.email = null;
      this.infoUser.paypal = null;
      this.infoUser.publisher = null;
      this.infoUser.idCountry = null;
      this.infoUser.password = null;
    },
  },
  watch: {
    countriesInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.countries.push(element.name);
        });
      }
    },
    country: function(val) {
      this.infoUser.idCountry = this.countries.indexOf(val);
      this.infoUser.idCountry++;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-combobox input {
  font-size: 8rem;
  font-weight: 100;
  text-transform: capitalize;
}
</style>

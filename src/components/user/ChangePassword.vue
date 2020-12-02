<template>
  <div>
    <v-card :loading="requestChanges">
      <br /><br />
      <br /><br />
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Contraseña Actual"
                required
                v-model="oldPass"
                :append-icon="values.val1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (values.val1 = !values.val1)"
                :type="values.val1 ? 'password' : 'text'"
                :rules="[rules.password]"
                outlined
                width="50%"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Contraseña Nueva"
                required
                v-model="newPass"
                :append-icon="values.val2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (values.val2 = !values.val2)"
                :type="values.val2 ? 'password' : 'text'"
                :rules="[rules.password]"
                outlined
                width="80%"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Repita Contraseña"
                required
                v-model="newConfirmPass"
                :append-icon="values.val3 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (values.val3 = !values.val3)"
                :type="values.val3 ? 'password' : 'text'"
                :rules="[rules.password]"
                outlined
                width="80%"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-subtitle
        align="center"
        v-if="errorText"
        class="red--text pt-2"
        style="font-size: 1.5em"
        >La contraseña actual no es correcta o no coinciden las contraseñas!!
      </v-card-subtitle>
      <v-card-actions class="justify-center">
        <v-btn
          color="red"
          outlined
          width="280"
          height="50"
          text
          @click="dialogClose"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="green"
          outlined
          width="280"
          height="50"
          text
          @click="sendChangedPass"
        >
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
export default {
  data() {
    return {
      oldPass: "",
      newPass: "",
      newConfirmPass: "",
      errorText: false,
      alert: true,
      requestChanges: false,
      valids: {
        val1: true,
        val2: true,
        val3: true,
      },
      values: {
        val1: true,
        val2: true,
        val3: true,
      },
      rules: {
        required: (value) => !!value || "Required.",
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter and a number."
          );
        },
      },
    };
  },
  props: {
    dialogPassword: { type: Boolean },
    userID: { type: Number, default: 0 },
  },
  mounted() {},
  methods: {
    cleanData() {
      this.oldPass = "";
      this.newPass = "";
      this.newConfirmPass = "";
    },
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogPassword);
    },
    sendChangedPass() {
      this.requestChanges = true;
      var self = this;
      if (this.newPass == this.newConfirmPass) {
        axios
          .put(
            "http://" +
              URLBACKEND +
              "/ming/v1/users/" +
              this.userID +
              "/password",
            { old_password: this.oldPass, new_password: this.newPass },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            console.log(response.status);
            if (response.status == 200) {
              self.$emit("dialogClosed", false);
              self.$emit("success", true);
              this.requestChanges = false;
              this.cleanData();
            } else {
              self.$emit("dialogClosed", false);
              console.log("not 200");
            }
            console.log("response");
          })
          .catch((error) => {
            console.log(error.response.data.error + "W");
            this.requestChanges = false;
            this.errorText = true;
          })
          .catch((error) => {
            console.log(error.response + "");
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
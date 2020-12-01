<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="inputs"
              label="Contraseña Actual"
              required
              v-model="oldPass"
              :append-icon="values.val1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (values.val1 = !values.val1)"
              :type="values.val1 ? 'password' : 'text'"
              :rules="[rules.password]"
            ></v-text-field>
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
            ></v-text-field>
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
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="dialogClose"> Cancelar </v-btn>
      <v-btn color="blue darken-1" text @click="sendChangedPass">
        Actualizar
      </v-btn>
    </v-card-actions>
  </v-card>
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
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
      },
    };
  },
  props: ["dialogPassword", "userID"],
  computed: {
    passwordRules() {
      return [
        (v) => !!v || "Contraña requerida",
        (v) => v.length > 6 || "La contraseña debe tener 8 digitos",
      ];
    },
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogPassword);
    },
    sendChangedPass() {
      let self = this;
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
          .then(function (response) {
            console.log(response.status);
            // this.$nextTick(() => {
            //   this.$emit("dialogClosed", !this.dialogPassword);
            // });

            if (response.status == 200) {
              self.$emit("dialogClosed", !this.dialogPassword);
            } else {
              self.$emit("dialogClosed", !this.dialogPassword);
              console.log("not 200");
            }
            console.log("response");
          });
        // .catch(function (error) {
        //   console.log(error.status);
        //   console.log("res");
        // });
        // this.dialogClose();
      }
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
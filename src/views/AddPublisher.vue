<template>
  <div class="background-image">
    <NavBarAdmin />
    <div class="add-publisher-forms-container" justify-center>
      <v-text-field
        v-model="username"
        :rules="[rules.required]"
        label="Nombre de Usuario"
        outlined
        color="#707070"
        dense
      ></v-text-field>

      <v-text-field
        :rules="[rules.required, rules.email]"
        label="Correo Electrónico"
        outlined
        color="#707070"
        dense
      ></v-text-field>

      <v-text-field
        v-model="editor"
        :rules="[rules.required]"
        label="Editor"
        outlined
        color="#707070"
        dense
      ></v-text-field>

      <v-combobox outlined persistent-hint chips dense color="#707070"></v-combobox>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Contraseña"
        hint="Mínimo 8 caracteres"
        color="#66698C"
        outlined
        @click:append="show1 = !show1"
        dense
      ></v-text-field>

      <v-layout justify-center>
        <v-btn class="ma-2" outlined color="#49a82c" width="25rem">
          Crear
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import NavBarAdmin from "@/components/generic/NavBarAdmin.vue";
export default {
  name: "AddPublisher",
  components: {
    NavBarAdmin,
  },
  data() {
    return {
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
};
</script>

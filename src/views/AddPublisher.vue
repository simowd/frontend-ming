<template>
  <div class="background-image">
    <NavBarAdmin />
    <AddPublisherForm/>
  </div>
</template>

<script>
import NavBarAdmin from "@/components/generic/NavBarAdmin.vue";
import AddPublisherForm from "@/components/admin/AddPublisherForm.vue";
export default {
  name: "AddPublisher",
  components: {
    NavBarAdmin,
    AddPublisherForm,
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

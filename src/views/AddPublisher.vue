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
};
</script>

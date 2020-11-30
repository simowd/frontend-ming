<template>
  <div class="background-image">
    <NavBarPublisher />
    <EditGameForm />
  </div>
</template>

<script>
import NavBarPublisher from "@/components/generic/NavBarPublisher.vue";
import EditGameForm from "@/components/publisher/EditGameForm.vue";

export default {
  name: "PublisherEditGame",
  components: {
    NavBarPublisher,
    EditGameForm,
  },
};
</script>

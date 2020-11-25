<template>
  <div class="background-image">
    <NavBarPublisher />
    <AddGameForm />
  </div>
</template>

<script>
import NavBarPublisher from "@/components/generic/NavBarPublisher.vue";
import AddGameForm from "@/components/publisher/AddGameForm.vue";

export default {
  name: "PublisherAddGame",
  components: {
    NavBarPublisher,
    AddGameForm,
  },
};
</script>

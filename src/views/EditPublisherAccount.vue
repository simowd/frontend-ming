<template>
  <div class="background-image">
    <NavBarPublisher />
    <EditPublisherForm/>
  </div>
</template>

<script>
import NavBarPublisher from "@/components/generic/NavBarPublisher.vue";
import EditPublisherForm from "@/components/publisher/EditPublisherForm";
export default {
  name: "EditPublisherAccount",
  components: {
    NavBarPublisher,
    EditPublisherForm,
  },
};
</script>

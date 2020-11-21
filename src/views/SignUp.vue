<template>
  <div class="background-image">
    <NavBar />
    <RegisterCard />
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import RegisterCard from "../components/login/RegisterCard.vue";
export default {
  name: "SignUp",
  components: {
    NavBar,
    RegisterCard,
  },
};
</script>

<style lang="scss" scoped>
.logo-auth {
  text-align: center;
  padding-top: 4.5rem;
}
</style>

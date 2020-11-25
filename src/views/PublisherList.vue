<template>
    <div class="background-image">
    <NavBarAdmin />
    
    <div class="search-bar-publisher" >
              <v-text-field
                label="Buscar en Editores"
                outlined
                v-model="title"
                color="#707070"
                append-icon="mdi-magnify"
                dense
              >
              </v-text-field>
            </div>

  </div>
</template>

<script>
import NavBarAdmin from "@/components/generic/NavBarAdmin.vue";

export default {
    name: "PublisherList",
  components: {
    NavBarAdmin,
    
  },
}
</script>

<style scoped>

.search-bar-publisher{
    width: 60rem;
    margin-left: 102rem;
    margin-top: 5rem;
}

</style>
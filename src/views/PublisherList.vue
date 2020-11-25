<template>
  <div class="background-image">
    <NavBarAdmin />

    <div class="search-bar-publisher">
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

  <div class="cards" v-for="(publisher, index) in publisherInfo" :key="index" cols="12" sm="6">
      <PublisherListCard
        :id="publisher.idUser"
        :publisher="publisher.publisher"
        :mail="publisher.email"
      />
    </div>

  </div>
</template>

<script>
import NavBarAdmin from "@/components/generic/NavBarAdmin.vue";
import PublisherListCard from "@/components/publisher/PublisherListCard.vue";
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";

export default {
  name: "PublisherList",
  components: {
    NavBarAdmin,
    PublisherListCard,
  },

  data(){
    return{
      publisherInfo: [],
      title:""
    };
  },

  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/publisher")
      .then((response) => (this.publisherInfo = response.data));
  },
};
</script>

<style scoped>
.search-bar-publisher {
  width: 51.8rem;
  margin-left: 102rem;
  margin-top: 5rem;
}

.cards{
  text-align: center;
}
</style>

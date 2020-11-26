<template>
  <div class="background-image">
    <NavBarAdmin />

    <div class="search-bar-publisher">
      <v-text-field
        label="Buscar en Editores"
        outlined
        v-model="publisher"
        color="#707070"
        append-icon="mdi-magnify"
        dense
      >
      </v-text-field>
    </div>

    <div
      class="cards"
      v-for="(publisher, index) in publisherInfo"
      :key="index"
      cols="12"
      sm="6"
    >
      <PublisherListCard
        @statusPublisherList="updatePage"
        :id="publisher.idUser"
        :publisher="publisher.publisher"
        :mail="publisher.email"
      />
    </div>

    <infinite-loading @infinite="getPublishers" ref="infiniteLoading">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import NavBarAdmin from "@/components/generic/NavBarAdmin.vue";
import PublisherListCard from "@/components/publisher/PublisherListCard.vue";
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "PublisherList",
  components: {
    NavBarAdmin,
    PublisherListCard,
    InfiniteLoading,
  },

  data() {
    return {
      publisherInfo: [],
      publisher: "",
      page: 1,
    };
  },

  methods: {
    updatePage() {
      this.publisherInfo = [];
      this.page = 1;
      this.$refs.infiniteLoading.stateChanger.reset();
    },

    getPublishers: function($state) {
      axios
        .get("http://" + URLBACKEND + "/ming/v1/publisher?page=" + this.page)
        .then((response) => {
          if (response.data.length) {
            this.page += 1;
            this.publisherInfo.push(...response.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },

  watch: {
    aux: function(val) {
      console.log(val);
      console.log("Estas dentro");
      if (val === 1) {
        this.publisherInfo = [];
        this.page = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
        console.log(this.$refs.infiniteLoading);
        val = 0;
      }

      console.log("Estas afuera");
    },
    publisher: function(val) {
      const info = {
        query: val,
      };
      
      if (val === "") {
        // location.reload();
        this.publisherInfo = [];
        this.page = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        axios
          .get(
            "http://" + URLBACKEND + "/ming/v1/publisher?page=1",
            {
              params: info,
            }
          )
          .then((response) => (this.publisherInfo = response.data));
      }
    },
  },

  // mounted() {
  //   axios
  //     .get("http://" + URLBACKEND + "/ming/v1/publisher")
  //     .then((response) => (this.publisherInfo = response.data));
  // },
};
</script>

<style scoped>
.search-bar-publisher {
  width: 51.8rem;
  margin-left: 102rem;
  margin-top: 5rem;
}

.cards {
  text-align: center;
}
</style>

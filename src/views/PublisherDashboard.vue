<template>
    <div class="background-image">
        <NavBarPublisher />
        <v-row
      no-gutters
      class="card-publisher-list"
      :style="{ height: '140rem' }"
    >
      <v-col cols="3">
        <div>
          <img
            class="card-publisher-list-image"
            src="@/assets/pub-icon.png"
            width="45px"
            height="45px"
          />
        </div>
      </v-col>
      <v-col cols="5">
        <div class="publisher-name">
          {{ publisherInfo.publisher }}
        </div>
        <div class="publisher-mail">
          {{ publisherInfo.email }}
        </div>
      </v-col>
      <v-col cols="2">
        <div >
          
        </div>
      </v-col>
      <v-col cols="2">
        
      </v-col>
      <PublisherDashboard1 :id="publisherInfo.idUser" />
    </v-row>
    </div>
</template>

<script>
import NavBarPublisher from "@/components/generic/NavBarPublisher.vue";
import PublisherDashboard1 from "@/components/admin/PublisherDashboard.vue";
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";

export default {
    name: "PublisherDashboard",
    data(){
        return{
            publisherInfo: null,
        };
    },
    components:{
        NavBarPublisher,
        PublisherDashboard1,
    },
    mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/publisher/"+this.$route.params.id)
      .then((response) => (this.publisherInfo = response.data));
  },
}
</script>

<style scoped>
.publisher-name {
  font-size: 3rem;
  font-weight: 300;
  font-family: "Montserrat", sans-serif;
  margin-top: 2rem;
  text-align: left;
}

.publisher-mail {
  font-size: 1.7rem;
  font-weight: 300;
  margin-top: 2rem;
  text-align: left;
}

.logo {
  height: 6.5rem;
  width: 6.5rem;
  margin-top: 3.5rem;
}

.bar {
  text-align: right;
}
</style>
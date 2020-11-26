<template>
  <div>
    <v-row no-gutters class="card-publisher-list" v-if="flag == false">
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
          {{ publisher }}
        </div>
        <div class="publisher-mail">
          {{ mail }}
        </div>
      </v-col>
      <v-col cols="2">
        <div class="bar">
          <img
            class="logo"
            src="@/assets/Bars.png"
            width="45px"
            height="45px"
            :style="{ cursor: 'pointer' }"
            @click="DashboardExpand"
          />
        </div>
      </v-col>
      <v-col cols="2">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <img
              class="logo"
              src="@/assets/delete.png"
              width="45px"
              height="45px"
              dark
              v-bind="attrs"
              v-on="on"
              :style="{
                cursor: 'pointer',
                marginLeft: '3rem',
                marginRight: '5rem',
              }"
            />
          </template>
          <v-card>
            <v-card-title class="headline">
              ¿Desea eliminar a {{ publisher }}?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="green darken-1" text @click="deletePublisher(id)">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="card-publisher-list"
      v-else
      :style="{ height: '100rem' }"
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
          {{ publisher }}
        </div>
        <div class="publisher-mail">
          {{ mail }}
        </div>
      </v-col>
      <v-col cols="2">
        <div class="bar">
          <img
            class="logo"
            src="@/assets/Bars.png"
            width="45px"
            height="45px"
            :style="{ cursor: 'pointer' }"
            @click="DashboardReduce"
          />
        </div>
      </v-col>
      <v-col cols="2">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <img
              class="logo"
              src="@/assets/delete.png"
              width="45px"
              height="45px"
              dark
              v-bind="attrs"
              v-on="on"
              :style="{
                cursor: 'pointer',
                marginLeft: '3rem',
                marginRight: '5rem',
              }"
            />
          </template>
          <v-card>
            <v-card-title class="headline">
              ¿Desea eliminar a {{ publisher }}?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="green darken-1" text @click="deletePublisher(id)">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <PublisherDashboard :id="id" />
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
import PublisherDashboard from "@/components/admin/PublisherDashboard.vue";

export default {
  name: "PublisherListCard",

  components: {
    PublisherDashboard,
  },

  data() {
    return {
      dialog: false,
      flag: false,
    };
  },
  inheritAttrs: true,
  props: ["id", "publisher", "mail"],
  methods: {
    deletePublisher(id) {
      axios
        .delete("http://" + URLBACKEND + "/ming/v1/publisher/" + id)
        .then((result) => {
          console.log(result);
          this.$emit("statusPublisherList");
        });
      //location.reload();
      this.dialog = false;
    },

    DashboardExpand() {
      this.flag = true;
    },
    DashboardReduce() {
      this.flag = false;
    },
  },
};
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

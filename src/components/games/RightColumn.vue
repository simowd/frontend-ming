<template>
  <div>
    <h2>
      Título: <span class="text"> {{ game.title }}</span>
    </h2>
    <h2>
      Idiomas:
      <span
        v-for="(language, key) in game.language"
        :key="language.index"
        class="text"
      >
        <span v-if="key === game.language.length - 1"> {{ language }} </span>
        <span v-else> {{ language }} -</span>
      </span>
    </h2>
    <h2>
      Géneros:
      <span v-for="(genre, key) in game.genres" :key="genre.index" class="text">
        <span v-if="key === game.genres.length - 1"> {{ genre }} </span>
        <span v-else> {{ genre }} -</span>
      </span>
    </h2>
    <h2>
      Tamaño: <span class="text"> {{ game.size }} </span>
    </h2>
    <h2>
      Clasificación: <span class="text"> {{ game.esrb.esrb }} </span>
    </h2>
    <h2>
      Desarrollador: <span class="text"> {{ game.developer }} </span>
    </h2>
    <h2>
      Número de jugadores: <span class="text"> {{ game.players }} </span>
    </h2>
    <h2>
      Fecha de lanzamiento:
      <span class="text">
        {{ date }}
      </span>
    </h2>

    <h1>Requerimientos Mínimos</h1>

    <v-tabs v-model="tab" background-color="transparent" grow color=" #66698c">
      <v-tab v-for="item in game.gameRequirements" :key="item.index">
        {{ item.operatingSystem }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="transparent-body">
      <v-tab-item
        v-for="item in game.gameRequirements"
        :key="item.index"
        class="transparent-body"
      >
        <h2 v-if="item.processor != null">
          Procesador:
          <span class="text"> {{ item.processor }} </span>
        </h2>
        <h2 v-if="item.memory != null">
          Memoria:
          <span class="text"> {{ item.memory }} </span>
        </h2>
        <h2 v-if="item.graphics != null">
          Gráficos:
          <span class="text"> {{ item.graphics }} </span>
        </h2>
        <h2>
          Procesador de Gráficos:
          <span
            v-for="(gra, key) in game.direct_x"
            :key="gra.index"
            class="text"
          >
            <span v-if="key === game.direct_x.length - 1"> {{ gra.version }} </span>
            <span v-else> {{ gra.version }} -</span>
          </span>
        </h2>
      </v-tab-item>
    </v-tabs-items>
    <div class="os">
      <v-row>
        <v-col>
          <v-img
            height="65"
            width="40"
            :src="game.esrb.logoPath"
            class="center"
          ></v-img>
        </v-col>
        <v-col v-for="os in game.operating_systems" :key="os.index">
          <v-img
            height="40"
            width="40"
            :src="os.logoPath"
            class="center"
          ></v-img>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import * as dayjs from "dayjs";

export default {
  name: "RightColumn",
  props: ["game"],
  data() {
    return {
      tab: null,
      date: dayjs(this.game.releaseDate).format("DD/MM/YYYY"),
    };
  },
};
</script>

<style lang="scss" scoped>
.transparent-body {
  background-color: transparent;
}
.theme--light.v-tabs-items {
  background-color: transparent;
}
.center {
  text-align: center;
  margin: 0 auto;
}

.text {
  font-weight: 100;
  font-size: 1.8rem;
  padding: 0.3rem 0;
}

h2 {
  font-weight: 600;
  color: #66698c;
  font-size: 2rem;
  padding: 0.3rem 0;
}

h1 {
  padding: 3rem 0;
  color: #66698c;
  font-weight: bolder;
  font-weight: 900;
  font-size: 2.5rem;
}
.os {
  padding-top: 5rem;
}
</style>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col :cols="6">
          <div class="add-publisher-forms-container" justify-center>
            <v-text-field
              :rules="[rules.required]"
              label="Título"
              outlined
              color="#707070"
              id="title"
              v-model="gameInfo.title"
            ></v-text-field>

            <v-combobox
              dense
              outlined
              color="#66698C"
              item-color="#66698C"
              :items="languages"
              label="Idioma"
              multiple
              id="languageGames"
              @change="languagesValue"
              v-model="this.gameEditInfo.language"
            ></v-combobox>

            <v-combobox
              dense
              outlined
              color="#707070"
              item-color="#707070"
              :items="genres"
              label="Género"
              multiple
              id="genreGames"
              @change="genresValue"
              v-model="this.gameEditInfo.genres"
            ></v-combobox>

            <v-text-field
              :rules="[rules.required]"
              label="Tamaño"
              outlined
              color="#707070"
              id="size"
              v-model="gameInfo.size"
            ></v-text-field>

            <v-select
              dense
              outlined
              color="#707070"
              item-color="#707070"
              :items="esrbList"
              label="Clasificación"
              id="idEsrb"
              @change="EsrbValue"
            ></v-select>

            <v-text-field
              :rules="[rules.required]"
              label="Desarrollador"
              outlined
              color="#707070"
              id="developer"
              v-model="gameInfo.developer"
            ></v-text-field>

            <div>
              <v-slider
                :max="100"
                label="Jugadores"
                class="align-center"
                color="#707070"
                thumb-label
                track-color="#66698C"
                thumb-color="#66698C"
                id="players"
                v-model="gameInfo.players"
              >
                <template v-slot:append>
                  <v-text-field
                    id="players"
                    v-model="gameInfo.players"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                    color="#707070"
                  ></v-text-field>
                </template>
              </v-slider>
            </div>

            <div>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="localDate"
                persistent
                width="290px"
                color="#707070"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="localDate"
                    prepend-icon="mdi-calendar"
                    label="Lanzamiento"
                    readonly
                    v-on="on"
                    color="#707070"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="localDate" scrollable color="#707070">
                  <v-spacer></v-spacer>
                  <v-btn text color="#707070" @click="modal = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="#707070"
                    @click="$refs.dialog.save(localDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </div>

            <v-textarea
              outlined
              :rules="[rules.required]"
              label="Descripción del Juego"
              value=""
              no-resize
              clearable
              clear-icon="mdi-close-circle"
              counter
              color="#707070"
              id="game_description"
              v-model="gameInfo.game_description"
            ></v-textarea>
            <v-combobox
              dense
              outlined
              color="#707070"
              item-color="#707070"
              :items="directx"
              label="DirectX"
              multiple
              small-chips
              deletable-chips="true"
              id="directx"
              @change="DirectXValue"
              v-model="this.gameEditInfo.directx"
            ></v-combobox>

            <v-text-field
              :rules="[rules.required]"
              label="Precio"
              outlined
              color="#707070"
              id="price"
              v-model.number="gameInfo.price"
              @keypress="isNumber($event)"
            ></v-text-field>

            <v-text-field
              :rules="[rules.required]"
              label="Descuento %"
              outlined
              color="#707070"
              id="sale"
              v-model.number="gameInfo.sale"
              @keypress="isNumber($event)"
            ></v-text-field>
          </div>
        </v-col>
        <v-col :cols="6">
          <div class="add-publisher-forms-container" justify-center>
            <div>
              <v-file-input
                color="#707070"
                counter
                label="Seleccione las Imágenes"
                multiple
                prepend-icon="mdi-image-plus"
                outlined
                :show-size="1000"
                accept="image/png, image/jpeg, image/bmp"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 5" color="#707070" dark label small>
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>

              <v-file-input
                color="#707070"
                counter
                label="Seleccione los Archivos del Juego"
                multiple
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 5" color="#707070" dark label small>
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>

              <v-layout justify-center class="picker-container">
                <v-color-picker
                  dot-size="2rem"
                  mode="hexa"
                  hide-mode-switch="true"
                  width="400"
                  v-model="ColorValue"
                ></v-color-picker>
              </v-layout>

              <v-btn
                :loading="loading"
                :disabled="loading"
                outlined
                color="#707070"
                class="ma-2"
                @click="
                  showWindows();
                  loader = 'loading';
                "
              >
                Windows
                <v-icon right>
                  mdi-microsoft-windows
                </v-icon>
              </v-btn>

              <div v-if="windows == true">
                <v-text-field
                  :rules="[rules.required]"
                  label="Windows - Procesador"
                  outlined
                  color="#707070"
                  v-model="rbWindows.processor"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="Windows - Memoria"
                  outlined
                  color="#707070"
                  v-model="rbWindows.memory"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="Windows - Gráficos"
                  outlined
                  color="#707070"
                  v-model="rbWindows.graphics"
                ></v-text-field>
              </div>
            </div>

            <div>
              <v-btn
                :loading="loading2"
                :disabled="loading2"
                outlined
                color="#707070"
                class="ma-2"
                @click="
                  showMacOS();
                  loader = 'loading2';
                "
              >
                MacOS
                <v-icon right>
                  mdi-apple
                </v-icon>
              </v-btn>

              <div v-if="macos == true">
                <v-text-field
                  :rules="[rules.required]"
                  label="MacOS - Procesador"
                  outlined
                  color="#707070"
                  v-model="rbMacOS.processor"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="MacOS - Memoria"
                  outlined
                  color="#707070"
                  v-model="rbMacOS.memory"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="MacOS - Gráficos"
                  outlined
                  color="#707070"
                  v-model="rbMacOS.graphics"
                ></v-text-field>
              </div>
            </div>

            <div>
              <v-btn
                :loading="loading1"
                :disabled="loading1"
                outlined
                color="#707070"
                class="ma-2"
                @click="
                  showLinux();
                  loader = 'loading1';
                "
              >
                Linux
                <v-icon right>
                  mdi-ubuntu
                </v-icon>
              </v-btn>

              <div v-if="linux == true">
                <v-text-field
                  :rules="[rules.required]"
                  label="Linux - Procesador"
                  outlined
                  color="#707070"
                  v-model="rbLinux.processor"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="Linux - Memoria"
                  outlined
                  color="#707070"
                  v-model="rbLinux.memory"
                ></v-text-field>

                <v-text-field
                  :rules="[rules.required]"
                  label="Linux - Gráficos"
                  outlined
                  color="#707070"
                  v-model="rbLinux.graphics"
                ></v-text-field>
              </div>
            </div>

            <v-layout justify-center>
              <v-btn
                class="ma-2"
                outlined
                color="#49a82c"
                width="25rem"
                @click="verify"
              >
                Editar
              </v-btn>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";

export default {
  props: ["date"],
  name: "EditGameForm",
  data() {
    return {
      idGame: null,
      modal: false,
      localDate: this.date,
      ColorValue: null,
      files: [],
      imageFiles: [],
      languageList: [],
      genresList: [],
      categoryList: null,
      directxList: [],
      loader: null,
      loading: false,
      loading1: false,
      loading2: false,
      windows: false,
      macos: false,
      linux: false,
      countWindows: 0,
      countLinux: 0,
      countMacOS: 0,
      gameInfo: {
        idEsrb: 0,
        title: null,
        game_description: null,
        size: null,
        players: null,
        requirements: [],
        release_date: null,
        color: null,
        highlighted: 0,
        download_path: "",
        images: [],
        developer: null,
        direct_x: [],
        operatingSystem: [],
        languageGames: [],
        genreGames: [],
        price: 0,
        sale: 0,
      },
      gameEditInfo: {},
      rbWindows: {
        idOperatingSystem: 1,
        processor: null,
        memory: null,
        graphics: null,
      },
      rbLinux: {
        idOperatingSystem: 2,
        processor: null,
        memory: null,
        graphics: null,
      },
      rbMacOS: {
        idOperatingSystem: 3,
        processor: null,
        memory: null,
        graphics: null,
      },
      languagesInfo: null,
      languages: [],
      LanguageArray: [],

      genresInfo: null,
      genres: [],
      GenreArray: [],

      esrbInfo: null,
      esrbList: [],
      EsrbArray: [],

      directxInfo: null,
      directx: [],
      DirectXArray: [],

      rules: {
        required: (value) => !!value || "Requerido",
      },
    };
  },
  mounted() {
    this.idGame = this.$route.params.id;
    axios
      .get("http://" + URLBACKEND + "/ming/v1/countries")
      .then((response) => (this.countriesInfo = response.data));

    axios
      .get("http://" + URLBACKEND + "/ming/v1/languages")
      .then((response) => (this.languagesInfo = response.data));

    axios
      .get("http://" + URLBACKEND + "/ming/v1/genres")
      .then((response) => (this.genresInfo = response.data));

    axios
      .get("http://" + URLBACKEND + "/ming/v1/esrb")
      .then((response) => (this.esrbInfo = response.data));

    axios
      .get("http://" + URLBACKEND + "/ming/v1/directx")
      .then((response) => (this.directxInfo = response.data));

    axios
      .get("http://" + URLBACKEND + "/ming/v1/store/games/" + this.idGame)
      .then((response) => {
        this.gameEditInfo = response.data;
        this.gameInfo.title = this.gameEditInfo.title;
        this.gameInfo.size = this.gameEditInfo.size;
        this.gameInfo.developer = this.gameEditInfo.developer;
        this.gameInfo.players = this.gameEditInfo.players;
        this.gameInfo.game_description = this.gameEditInfo.game_description;
        this.gameInfo.price = this.gameEditInfo.price;
        this.ColorValue.hexa = this.gameEditInfo.color;
        this.languagesValue(this.gameEditInfo.language);
        this.genresValue(this.gameEditInfo.genres);

        this.gameEditInfo.gameRequirements.map((item) => {
          item.operatingSystem;
          item.processor;
          item.memory;
          item.graphics;
          console.log(
            item.operatingSystem + item.processor + item.memory + item.graphics
          );
          if (item.operatingSystem === "Windows") {
            this.rbWindows.processor = item.processor;
            this.rbWindows.memory = item.memory;
            this.rbWindows.graphics = item.graphics;
          } else {
            if (item.operatingSystem === "MacOS") {
              this.rbMacOS.processor = item.processor;
              this.rbMacOS.memory = item.memory;
              this.rbMacOS.graphics = item.graphics;
            } else {
              this.rbLinux.processor = item.processor;
              this.rbLinux.memory = item.memory;
              this.rbLinux.graphics = item.graphics;
            }
          }
        });
      });
  },
  methods: {
    update() {
      axios
        .put(
          "http://" +
            URLBACKEND +
            "/ming/v1/publisher/" +
            this.idGame +
            "/game",
          this.gameInfo
        )
        .then((response) => (this.gameInfo = response.data));
    },
    verify() {
      this.update();
      alert("Juego Actualizado");
    },
    languagesValue(values) {
      this.languageList = [];

      for (var i = 0; i < values.length; i++) {
        var value = values[i];
        for (var j = 0; j < this.LanguageArray.length; j++) {
          var split = this.LanguageArray[j].split("|");
          if (split[1] === value) {
            this.languageList.push(parseInt(split[0], 10));
          }
        }
      }
      this.languageList.sort(function(a, b) {
        return a - b;
      });
      this.gameInfo.languageGames = this.languageList;
    },
    genresValue(values) {
      this.genresList = [];

      for (var i = 0; i < values.length; i++) {
        var value = values[i];
        for (var j = 0; j < this.GenreArray.length; j++) {
          var split = this.GenreArray[j].split("|");
          if (split[1] === value) {
            this.genresList.push(parseInt(split[0], 10));
          }
        }
      }
      this.genresList.sort(function(a, b) {
        return a - b;
      });
      this.gameInfo.genreGames = this.genresList;
    },
    EsrbValue(value) {
      this.categoryList = null;

      for (var j = 0; j < this.EsrbArray.length; j++) {
        var split = this.EsrbArray[j].split("|");
        if (split[1] === value) {
          this.categoryList = split[0];
        }
      }
      var integer = parseInt(this.categoryList, 10);
      this.gameInfo.idEsrb = integer;
    },
    DirectXValue(values) {
      this.directxList = [];

      for (var i = 0; i < values.length; i++) {
        var value = values[i];
        for (var j = 0; j < this.DirectXArray.length; j++) {
          var split = this.DirectXArray[j].split("|");
          if (split[1] === value) {
            this.directxList.push(parseInt(split[0], 10));
          }
        }
      }
      this.directxList.sort(function(a, b) {
        return a - b;
      });
      this.gameInfo.direct_x = this.directxList;
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    showWindows() {
      this.windows = !this.windows;
      this.countWindows++;
      if (this.countWindows === 1) {
        this.gameInfo.requirements.push(this.rbWindows);
        this.gameInfo.operatingSystem.push(1);
        this.gameInfo.operatingSystem.sort(function(a, b) {
          return a - b;
        });
      }
    },
    showLinux() {
      this.linux = !this.linux;
      this.countLinux++;
      if (this.countLinux === 1) {
        this.gameInfo.requirements.push(this.rbLinux);
        this.gameInfo.operatingSystem.push(2);
        this.gameInfo.operatingSystem.sort(function(a, b) {
          return a - b;
        });
      }
    },
    showMacOS() {
      this.macos = !this.macos;
      this.countMacOS++;
      if (this.countMacOS === 1) {
        this.gameInfo.requirements.push(this.rbMacOS);
        this.gameInfo.operatingSystem.push(3);
        this.gameInfo.operatingSystem.sort(function(a, b) {
          return a - b;
        });
      }
    },
  },
  watch: {
    genresInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.genres.push(element.genre);
        });
        val.forEach((element) => {
          this.GenreArray.push(element.idGenre + "|" + element.genre);
        });
      }
    },

    languagesInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.languages.push(element.language);
        });
        val.forEach((element) => {
          this.LanguageArray.push(element.idLanguage + "|" + element.language);
        });
      }
    },

    esrbInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.esrbList.push(element.esrb);
        });
        val.forEach((element) => {
          this.EsrbArray.push(element.idEsrb + "|" + element.esrb);
        });
      }
    },

    directxInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.directx.push(element.directx);
        });
        val.forEach((element) => {
          this.DirectXArray.push(element.idDirectx + "|" + element.directx);
        });
      }
    },
    localDate() {
      this.$emit("update", this.localDate);
      this.gameInfo.release_date = this.localDate;
    },
    ColorValue() {
      this.gameInfo.color = this.ColorValue.hexa;
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 500);

      this.loader = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-combobox input {
  font-size: 8rem;
  font-weight: 100;
  text-transform: capitalize;
}
.picker-container {
  margin-top: 3rem;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.Prueba {
  background-color: black;
  color: black;
  width: 5rem;
  height: 500rem;
}
</style>

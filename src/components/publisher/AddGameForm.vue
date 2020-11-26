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
                :return-value.sync="date"
                persistent
                width="290px"
                color="#707070"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Lanzamiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#707070"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable color="#707070">
                  <v-spacer></v-spacer>
                  <v-btn text color="#707070" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="#707070" @click="$refs.dialog.save(date)">
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
          </div>
        </v-col>
        <v-col :cols="6">
          <div class="add-publisher-forms-container" justify-center>
            <div>
              <v-text-field
                :rules="[rules.required]"
                label="Procesador"
                outlined
                color="#707070"
              ></v-text-field>

              <v-text-field
                :rules="[rules.required]"
                label="Memoria"
                outlined
                color="#707070"
              ></v-text-field>

              <v-text-field
                :rules="[rules.required]"
                label="Gráficos"
                outlined
                color="#707070"
              ></v-text-field>
            </div>

            <v-combobox
              dense
              outlined
              color="#707070"
              item-color="#707070"
              :items="directxList"
              label="DirectX"
              multiple
              small-chips
              deletable-chips="true"
              id="directx"
            ></v-combobox>

            <v-text-field
              :rules="[rules.required]"
              label="Precio"
              outlined
              color="#707070"
              id="price"
              v-model="gameInfo.price"
            ></v-text-field>

            <v-file-input
              v-model="imageFiles"
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
              v-model="files"
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
              ></v-color-picker>
            </v-layout>

            <v-layout justify-center>
              <v-btn
                class="ma-2"
                outlined
                color="#49a82c"
                width="25rem"
                @click="verify"
              >
                Crear
              </v-btn>
              {{ gameInfo }}
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
  name: "AddGameForm",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      files: [],
      imageFiles: [],
      languageList: [],
      genresList: [],
      gameInfo: {
        idEsrb: null,
        title: null,
        game_description: null,
        size: null,
        players: null,
        requirements: null,
        release_date: null,
        color: null,
        highlighted: 0,
        download_path: null,
        images: null,
        developer: null,
        directx: null,
        operatingSystem: null,
        languageGames: [],
        genreGames: [],
        price: null,
        sale: 0,
      },

      languagesInfo: null,
      languages: [],
      LanguageArray: [],

      genresInfo: null,
      genres: [],
      GenreArray: [],

      esrbInfo: null,
      esrbList: [],
      esrb: "",

      directxInfo: null,
      directxList: [],
      directx: "",

      rules: {
        required: (value) => !!value || "Requerido",
      },
    };
  },
  mounted() {
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
  },
  methods: {
    create() {
      axios
        .post("http://" + URLBACKEND + "/ming/v1/publisher", this.infoUser)
        .then((response) => (this.infoUser = response.data));
    },
    verify() {
      if (this.gameInfo.username === null) {
        alert("Falta el Nombre de Usuario");
      } else if (this.gameInfo.email === null) {
        alert("Falta el Correo Electrónico");
      } else if (this.gameInfo.paypal === null) {
        alert("Falta el Correo de PayPal");
      } else if (this.gameInfo.publisher === null) {
        alert("Falta el Editor");
      } else if (this.gameInfo.idCountry === null) {
        alert("Falta el País");
      } else if (this.gameInfo.password === null) {
        alert("Falta la Contraseña");
      } else if (this.gameInfo.idCountry <= 0) {
        alert("Ese País no existe");
      } else {
        alert("Editor Creado");
        this.create();
      }
    },
    languagesValue(values) {
      this.languageList = [];

      for (var i = 0; i < values.length; i++) {

        var value = values[i];
        for (var j = 0; j < this.LanguageArray.length; j++) {
          var split = this.LanguageArray[j].split("|"); 
          if (split[1] === value){
            this.languageList.push(split[0]);
          }
        }
      }
      this.languageList.sort(function(a, b){return a-b});
      this.gameInfo.languageGames = this.languageList;
    },
    genresValue(values) {
      this.genresList = [];
      
      for (var i = 0; i < values.length; i++) {

        var value = values[i];
        for (var j = 0; j < this.GenreArray.length; j++) {
          var split = this.GenreArray[j].split("|"); 
          if (split[1] === value){
            this.genresList.push(split[0]);
          }
        }
      }
      this.genresList.sort(function(a, b){return a-b});
      this.gameInfo.genreGames = this.genresList;
    },

  },
  watch: {
    genresInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.genres.push(element.genre);
        });
        val.forEach((element) => {
          this.GenreArray.push(
            element.idGenre + "|" + element.genre
          );
        });
      }
    },

    languagesInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.languages.push(element.language);
        });
        val.forEach((element) => {
          this.LanguageArray.push(
            element.idLanguage + "|" + element.language
          );
        });
      }
    },

    esrbInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.esrbList.push(element.esrb);
        });
      }
    },
    esrbList: function(val) {
      this.gameInfo.idEsrb = this.esrbList.indexOf(val);
      this.gameInfo.idEsrb++;
    },

    directxInfo: function(val) {
      if (val.length > 0) {
        val.forEach((element) => {
          this.directxList.push(element.directx);
        });
      }
    },
    directxList: function(val) {
      this.gameInfo.directx = this.directxList.indexOf(val);
      console.log(this.gameInfo.directx++);
      this.gameInfo.directx++;
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
</style>

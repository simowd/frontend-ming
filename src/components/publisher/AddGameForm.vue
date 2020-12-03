<template>
  <div>
    <v-container>
      <v-form v-model="valid" ref="form">
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

              <v-select
                dense
                outlined
                color="#66698C"
                item-color="#66698C"
                :items="languages"
                label="Idioma"
                multiple
                id="languageGames"
                @change="languagesValue"
              ></v-select>

              <v-select
                dense
                outlined
                color="#707070"
                item-color="#707070"
                :items="genres"
                label="Género"
                multiple
                id="genreGames"
                @change="genresValue"
              ></v-select>

              <v-text-field
                :rules="[rules.required, rules.sizeLength]"
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
                  :min="1"
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
                      :rules="[rules.minPlayers, rules.maxPlayers]"
                      v-model.number="gameInfo.players"
                      @keypress="isNumber($event)"
                      class="mt-0 pt-0"
                      type="number"
                      style="width: 60px"
                      color="#707070"
                      max="100"
                      min="1"
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
              <v-select
                dense
                outlined
                color="#707070"
                item-color="#707070"
                :items="directx"
                label="DirectX"
                multiple
                small-chips
                deletable-chips
                id="directx"
                @change="DirectXValue"
              ></v-select>

              <v-text-field
                :rules="[rules.required, rules.minValue, rules.maxValue]"
                label="Precio"
                outlined
                color="#707070"
                id="price"
                v-model.number="gameInfo.price"
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
                  label="Seleccione el banner del juego"
                  prepend-icon="mdi-image-plus"
                  outlined
                  accept="image/png, image/jpeg, image/bmp"
                  :show-size="1000"
                  v-model="uploadBanner"
                  @change="subirBanner"
                >
                </v-file-input>

                <v-file-input
                  color="#707070"
                  counter
                  label="Seleccione las Imágenes"
                  multiple
                  prepend-icon="mdi-image-plus"
                  outlined
                  :show-size="1000"
                  accept="image/png, image/jpeg, image/bmp"
                  v-model="imageFiles"
                  @change="subirImage"
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
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                  v-model="uploadFile"
                  @change="subirFile"
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
                    hide-mode-switch
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
              <v-alert
                dense
                border="left"
                colored-border
                type="error"
                v-if="alert"
                width="60rem"
              >
                {{ this.alert_text }}
              </v-alert>
              <v-alert
                dense
                border="left"
                colored-border
                type="success"
                v-if="alert_sucess"
                width="60rem"
              >
                Juego Creado.
              </v-alert>
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
              </v-layout>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import { firebaseConfig } from "@/assets/firebaseAPI.js";
import axios from "axios";

import firebase from "firebase/app";
import "firebase/firebase-storage";

import { nanoid } from "nanoid";

export default {
  props: ["date"],
  name: "AddGameForm",
  data() {
    return {
      valid: null,
      alert: false,
      alert_sucess: false,
      alert_text: null,
      modal: false,
      localDate: this.date,
      ColorValue: null,
      files: [],
      uploadFile: null,
      imageFiles: [],
      uploadImages: null,
      uploadBanner: null,
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
        directx: [],
        operatingSystem: [],
        languageGames: [],
        genreGames: [],
        price: null,
        sale: 0,
      },
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
        minValue: (value) => value >= 0 || "No puede ser menor a 0",
        maxValue: (value) => value <= 9999 || "No puede ser mayor a 9999",
        minPlayers: (value) => value >= 1 || "No puede ser menor a 1",
        maxPlayers: (value) => value <= 100 || "No puede ser mayor a 100",
        sizeLength: (value) => value < 10 || "Debe ser menor",
      },

      storage: null,

      upImage: [],
    };
  },
  created() {
    firebase.initializeApp(firebaseConfig);
    this.storage = firebase.storage();
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
    subirFile() {
      var self = this;
      var storageRef = firebase.storage().ref();
      console.log(storageRef);
      var type = this.uploadFile.name.split(".").pop();
      var nuid = nanoid();
      var uploadTask = storageRef
        .child("files/" + nuid + "." + type)
        .put(this.uploadFile);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          console.log(error);
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            self.gameInfo.download_path = downloadURL;
          });
        }
      );
    },
    subirImage() {
      if (this.gameInfo.images.length > 1) {
        this.gameInfo.images = [];
        this.subirBanner();
      }

      var self = this;
      this.imageFiles.map(function(image, index) {
        console.log(index);
        console.log(image);
        var storageRef1 = firebase.storage().ref();
        let type = image.name.split(".").pop();
        let nuid = nanoid();
        var uploadTask1 = storageRef1
          .child("images/" + nuid + "." + type)
          .put(image);
        uploadTask1.on(
          "state_changed",
          function(snapshot) {
            var progress1 =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress1 + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            console.log(error);
          },
          function() {
            uploadTask1.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
                self.gameInfo.images.push(downloadURL);
              });
          }
        );
      });
    },
    subirBanner() {
      var self = this;
      var storageRef2 = firebase.storage().ref();
      var type2 = this.uploadBanner.name.split(".").pop();
      var nuid2 = nanoid();
      console.log(this.uploadBanner);
      var uploadTask2 = storageRef2
        .child("images/" + nuid2 + "." + type2)
        .put(this.uploadBanner);
      uploadTask2.on(
        "state_changed",
        async function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          console.log(error);
        },
        async function() {
          uploadTask2.snapshot.ref
            .getDownloadURL()
            .then(async function(downloadURL) {
              console.log("File available at", downloadURL);
              await self.gameInfo.images.splice(0, 0, downloadURL);
            });
        }
      );
    },
    create() {
      axios
        .post(
          "http://" + URLBACKEND + "/ming/v1/publisher/1/game",
          this.gameInfo
        )
        .then((response) => (this.gameInfo = response.data));
    },
    verify() {
      if (this.checkProperties(this.gameInfo)) {
        this.alert_text = "Todos los campos deben ser rellenados.";
        this.alert = true;
        this.alertTime();
      } else {
        if (this.valid) {
          this.create();
          this.alert_sucess = true;
          this.alertTime();
        } else {
          this.alert_text = "El formulario no es válido.";
          this.alert = true;
          this.alertTime();
        }
      }
    },
    alertTime() {
      setTimeout(() => {
        this.alert = false;
        this.alert_sucess = false;
      }, 3000);
    },
    checkProperties(obj) {
      var flag = false;
      for (var key in obj) {
        if (obj[key] === null || obj[key] === "" || obj[key].length < 1) {
          flag = true;
        }
      }
      return flag;
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
      this.gameInfo.directx = this.directxList;
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
.v-select input {
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

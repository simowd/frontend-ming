<template>

    <div
        :style="{
            'background-image': 'url(' + backgroundImage + ')',
        }"
        class="highlight-body"
    >
        <div class="image-overlay"></div>
        <div class="content-highlight" v-if="gameInfo.length > 0">
            <NavBar :color="gameInfo[index].color" :linkColor="white" />
            <div class="up-arrow"  @keyup.up="minusIndex" v-if="index > 0">
                <img src="@/assets/up.png" @click="minusIndex"/>
            </div>
        </div>
        <v-layout justify-center>
            <div class="down-arrow"  @keyup.down="addIndex" v-if="index < gameInfo.length-1">
                <img src="@/assets/down.png" @click="addIndex" />
            </div>
        </v-layout>
        <div class="all-content" v-if="gameInfo.length > 0">
            <v-row>
                <v-col :cols="8"></v-col>
                <v-col :cols="4">
                    <h1>
                        {{ gameInfo[index].title }}
                    </h1>
                    <h3>
                        {{ gameInfo[index].description }}
                    </h3>
                    <v-layout justify-center>
                    <v-btn outlined color="white" class="ma-5" width="200" height="50" x-large @click="game">
                        Detalles
                    </v-btn>
                    </v-layout>
                    
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/generic/NavBar.vue";
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";

export default {
    name: "Highlight",
    components: {
        NavBar,
    },
    data() {
        return {
            gameInfo: [],
            index: 0,
            backgroundImage: "",
            white: "#FFFFFF",
            color: "",
            limit: 0,
        };
    },
    mounted() {
        axios
            .get(
                "http://" + URLBACKEND + "/ming/v1/games?page=1&highlight=true"
            )
            .then((response) => (this.gameInfo = response.data));
    },
    methods: {
        addIndex() {
            if (this.index < this.limit - 1) {
                this.index++;
            }
        },
        minusIndex() {
            if (this.index > 0) {
                this.index--;
            }
        },
        game(){
            this.$router.push("/games/" + this.gameInfo[this.index].id);
        }
    },
    watch: {
        index: function(val) {
            this.color = this.gameInfo[val].color;
            this.backgroundImage = this.gameInfo[val].banner;
        },
        gameInfo: function(val) {
            this.backgroundImage = val[this.index].banner;
            this.limit = val.length;
        },
    },
};
</script>

<style lang="scss" scoped>
.highlight-body {
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: 1;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    z-index: 2;
}
.content-highlight {
    z-index: 3;
    position: relative;
}

.vuelta {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;

    border-top: 20px solid #f00;
}

.up-arrow {
    text-align: center;
    padding-top: 1rem;
    z-index: 5;
    cursor: pointer;
}

.down-arrow {
    text-align: center;
    bottom: 0;
    position: fixed;
    z-index: 5;
    padding-bottom: 2rem;
    cursor: pointer;
}
.all-content {
    bottom: 0;
    position: fixed;
    z-index: 4;
    padding-bottom: 20rem;
    padding-right: 5rem;
    width: 100%;
}
h1 {
    font-family: "Montserrat", sans-serif;
    text-decoration: none;
    font-weight: 900;
    font-size: 7rem;
    color: white;
    text-align: center;
}
h3 {
    font-family: "Montserrat", sans-serif;
    text-decoration: none;
    font-weight: 500;
    font-size: 2rem;
    color: white;
    text-align: justify;
}
.details-button{
    text-align: center;
}
</style>

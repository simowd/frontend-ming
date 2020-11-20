<template>
    <div  id="sld">
        <carousel-3d >
            <slide class="card-sale-carousel" v-for="(slide, i) in slides" :index="i" :key="slide">
                
            </slide>
        </carousel-3d>
    </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
    el: '#sld',
    data(){
        return{
            slides: 7
        };
        
    },
    
    components: {
    Carousel3d,
    Slide
    }

}
</script>

<style scoped>

</style>
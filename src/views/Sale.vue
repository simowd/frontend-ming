<template>
  <div >
   <NavBar/>
   <Carousel/> 
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import Carousel from "../components/sale/Carousel.vue";


export default {
  name: 'Sale',
  components: {
   NavBar,
   Carousel
  }
}
</script>

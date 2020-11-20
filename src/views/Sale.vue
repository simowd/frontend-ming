<template>
  <div >
   <NavBar/>
   <Carousel/> 
   <SearchBar/>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import Carousel from "../components/sale/Carousel.vue";
import SearchBar from "../components/sale/SearchBarSale.vue";


export default {
  name: 'Sale',
  components: {
   NavBar,
   Carousel,
   SearchBar
  }
}
</script>

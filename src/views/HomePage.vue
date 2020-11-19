<template>
    <div>
        <NavBar/>
        <SearchBar/>
        <GameCard/>
    </div>
</template>

<script>

import GameCard from '../components/generic/GameCard.vue'
import NavBar from '../components/generic/NavBar.vue'
import SearchBar from '../components/generic/SearchBar.vue'

export default {
  name: 'HomePage',
  components: {
    GameCard,
    SearchBar,
    NavBar
  }
}
</script>
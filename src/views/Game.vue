<template>
    <div class="background-image">
        <NavBar />
        <GameInfo :id="$route.params.id"/>
    </div>
</template>

<script>
import NavBar from "@/components/generic/NavBar.vue"
import GameInfo from "@/components/games/GameInfo.vue"

export default {
    name: "Game",
    components: {
        NavBar,
        GameInfo
    }
}
</script>
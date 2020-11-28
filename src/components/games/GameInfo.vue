<template>
  <div>
    <v-row>
      <v-col :cols="8">
        <LeftColumn :game="game" />
      </v-col>
      <v-col :cols="4" class="block">
        <RightColumn :game="game" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LeftColumn from "@/components/games/LeftColumn.vue";
import RightColumn from "@/components/games/RightColumn.vue";

export default {
  name: "GameInfo",
  props: ["id", "game"],
  components: {
    LeftColumn,
    RightColumn,
  },
  
};
</script>

<style lang="scss" scoped>
.block{
    border-right: 1.5rem;
}
</style>

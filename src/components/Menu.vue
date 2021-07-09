<template>
  <div class="menu-wrapper" v-if="gameState === 0">
    <div class="menu-text">Tetter Totter</div>
    <img src="@/assets/totter.gif" alt="totter jumps" class="menu-gif">
    <div class="menu-text">Press "Enter" button to start</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: "Menu",
  computed: {
    ...mapGetters([
      'gameState'
    ])
  }
}
</script>
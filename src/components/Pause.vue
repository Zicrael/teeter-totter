<template>
  <div class="menu-wrapper" v-if="gameState === 2">
    <h2 class="menu-text">Game paused</h2>
    <div class="menu-text">Press "Enter" button to continue</div>
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
<template>
  <div class="menu-wrapper" v-if="gameState === 4">
    <div class="menu-text">You win! Congratulations :)</div>
    <div class="menu-text">Press "Enter" button for back to menu</div>
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
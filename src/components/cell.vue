<template>
  <a @click="toggle" :class="{ 'active' : active }" href="#" title="row - col"></a>
</template>

<script>
  export default {
    props: {
      row: Number,
      col: Number,
      active: Boolean,
    },
    computed: {
      modalProp: {
        get() { return this.active},
        set(val) { this.$emit('update:active', !this.active)}
      }
    },
    methods: {
      toggle() {
        this.modalProp = false;
        return this.modalProp;
      }
    },

  }
</script>

<!--<style>-->
<!--.game-of-life a.active {-->
<!--background-color: #101010;-->
<!--}-->

<!--.game-of-life a.active:hover {-->
<!--background-color: #444;-->
<!--}-->
<!--</style>-->

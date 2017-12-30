<template>
  <a  @click="toggle()"  :class="{'active':active}" href="#"></a>
</template>

<script>
  export default {

    data() {
      return {
        row: Number,
        col: Number,
        active: Boolean
      } },
    methods: {
      toggle() {
        this.active = !this.active;
      }
    }
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

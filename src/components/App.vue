<template>
  <div id="app">
    <board ></board>
    <!--<div style="clear : both"></div>-->
    <controls></controls>
  </div>
</template>

<script>


  import controls from './Controls.vue';
  import board from './Board.vue';


  export default {
    components : {
      board,
      controls
    }
  }

</script>

<style>

</style>

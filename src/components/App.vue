<template>
  <div id="app">
    <board></board>
    <controls class="controls-style"></controls>
  </div>
</template>

<script>


  import controls from './Controls.vue';
  import board from './Board.vue';
  import {hub} from '../services/events-hub';

  export default {
    render: h => h({board,controls}),
    components : {
      board,
      controls
    },
    mounted(){
      hub.$emit('startApp');
    }
  }

</script>

<style>

  .controls-style{
    position:fixed;
    min-height:20%;
    margin-left: 30%;
    bottom:0px;
  }

</style>

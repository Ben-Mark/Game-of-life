<template>
  <div class="controls" align="center" padding-top="5px">
    <button @click="run">{{ disableButton ? 'Stop' : 'Start' }}</button>
    <button @click="clearBoard" :disabled="disableButton">Clear board</button>
    <button @click="randomizeBoard" :disabled="disableButton">Randomize board</button>
  </div>
</template>

<script>

  import {hub} from '../util/events-hub';
  import gridFactory from '../services/GridFactory'

  export default {

    data() {
      return {
        disableButton: false
      }
    },

    mounted() {
      hub.$on('inProgress', (val) => this.disableButton = val);
    },

    methods: {
      randomizeBoard() {
        hub.$emit('randomizeBoard', gridFactory.createRandomizedBoard());
      },
      clearBoard() {
        hub.$emit('clearBoard', gridFactory.createEmptyBoard());
      },
      run() {
        hub.$emit('run', true);
      }
    }
  }
</script>

<style>

  .controls {

    text-align: center;
    padding-top: 3px;
    margin: auto;
    position: fixed;
    bottom: 10%;
    left: 39%;
  }

</style>

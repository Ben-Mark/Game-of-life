<template>
  <div class="controls" align="center" padding-top="5px">
    <button @click="run">{{ disableButton ? 'Stop' : 'Start' }}</button>
    <button @click="clearBoard" :disabled="disableButton">Clear board</button>
    <button @click="randomizeBoard" :disabled="disableButton">Randomize board</button>
    <button @click="gliderGunBoard" :disabled="disableButton">Glider gun pattern</button>
    <button @click="horizonLineBoard" :disabled="disableButton">Horizontal line pattern</button>
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

    methods: {
      gliderGunBoard() {
        hub.$emit('gliderBoard', gridFactory.getPattern("gliderBoard"));
      },
      horizonLineBoard() {
        hub.$emit('horizonLineBoard', gridFactory.getPattern("horizonLine"));
      },
      randomizeBoard() {
        hub.$emit('randomizeBoard', gridFactory.createRandomizedBoard());
      },
      clearBoard() {
        hub.$emit('clearBoard', gridFactory.createEmptyBoard());
      },
      run() {
        hub.$emit('run', true);
      }
    },

    created() {
      hub.$on('startApp', () => this.run());
      hub.$on('inProgress', (val) => this.disableButton = val);
    },
  }
</script>

<style>

  .controls {
    text-align: center;
  }

</style>

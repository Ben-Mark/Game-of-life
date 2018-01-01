<template>
  <div class="board">
    <table>
      <tbody>
      <tr v-for="row in rows" track-by="$index">
        <td v-for="col in cols" track-by="$index">
          <cell :row.sync="row" :col.sync="col" :active.sync="state[row-1][col-1]"></cell>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import gridFactory from '../services/GridFactory'
  import Cell from './Cell.vue'
  import {hub} from '../util/events-hub';

  export default {
    components: {
      Cell
    },
    render: h => h(Cell),
    data () {
      return {
        rows: gridFactory.rows,
        cols: gridFactory.cols,
        state: gridFactory.state,
        inProgress: false
      }
    },
    created(){
      this.state = gridFactory.createRandomizedBoard();
    },
    methods: {
      toggleInProgress() {
        this.inProgress = !this.inProgress;
        hub.$emit('inProgress', this.inProgress);
        if (!this.inProgress) return;
        const generation = () => {
          if (this.inProgress) {
            this.nextGeneration();
            setTimeout(generation, 1)
          }
        };
        setTimeout(generation, 1)
      },
      nextGeneration() {
        // the fastest way to deep clone an object
       const newState = JSON.parse(JSON.stringify(this.state));
        // Work out new state
        const rowMaxIndex = this.state.length - 1;
        const colMaxIndex = this.state[0].length - 1;

        for (let i = 0; i < this.state.length; i++) {
          for (let j = 0; j < this.state[i].length; j++) {
            let aliveNeighbours = 0;

            const neighbourIndexes = [
              [(i === 0 ? rowMaxIndex : i - 1),(j === 0 ? colMaxIndex : j - 1)],
              [(i === 0 ? rowMaxIndex : i - 1), j],
              [(i === 0 ? rowMaxIndex : i - 1),(j === colMaxIndex ? 0 : j + 1)],
              [i, (j === 0 ? colMaxIndex : j - 1)],
              false,
              [i, (j === colMaxIndex ? 0 : j + 1)],
              [(i === rowMaxIndex ? 0 : i + 1), (j === 0 ? colMaxIndex : j - 1)],
              [(i === rowMaxIndex ? 0 : i + 1), j],
              [(i === rowMaxIndex ? 0 : i + 1), (j === colMaxIndex ? 0 : j + 1)]
            ];
            neighbourIndexes.forEach((neighbour) => {
              if (neighbour && this.state[neighbour[0]][neighbour[1]]) aliveNeighbours++
            });

            newState[i][j] = this.state[i][j] ? (aliveNeighbours >= 2 && aliveNeighbours <= 3) : (aliveNeighbours === 3)
          }
        }
        this.state = newState
      }

    },
    mounted(){
      if (this.inProgress) return;
      hub.$on('randomizeBoard', (val) => this.state = val);
      hub.$on('clearBoard', (val) => this.state = val);
      hub.$on('run', (val) => {
        if(val)this.toggleInProgress();
      });
    }
  }
</script>

<style type="text/css">

  .board  {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000000;
    height: 60%;
    width: 50%;
  }
  .board table {
    height: 100%;
    width: 100%;
  }


</style>

<template>
  <div class="game-of-life">
    <table>
      <tbody>
      <tr v-for="row in rows" track-by="$index">
        <td v-for="col in cols" track-by="$index">
          <cell :row="row" :col="col" :active.sync="state[row-1][col-1]"></cell>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="controls">
      <button @click="toggleInProgress" :class="['btn', { 'btn-success': !inProgress, 'btn-danger': inProgress }]">{{ buttonText }}</button>
      <button @click="clearBoard" :disabled="inProgress" class="btn btn-warning">Clear board</button>
      <button @click="randomizeBoard" :disabled="inProgress" class="btn btn-warning">Randomize board</button>
    </div>
  </div>
</template>

<script>
  import store from './services/GridUtil'
  import Cell from './components/cell.vue'
  export default {
    components: {
      Cell
    },

    data () {
      return {
        rows: store.rows,
        cols: store.cols,
        state: store.state,
        inProgress: false
      }
    },
    computed: {
      buttonText() {
        return this.inProgress ? 'Stop' : 'Start'
      }
    },
    methods: {
      toggleInProgress() {
        this.inProgress = !this.inProgress
        if (!this.inProgress) return
        const tick = () => {
          if (this.inProgress) {
            this.gameTick()
            setTimeout(tick, 100)
          }
        }
        setTimeout(tick, 100)
      },
      gameTick() {
        // Duplicate state
        const newState = JSON.parse(JSON.stringify(this.state))
        // Work out new state
        const rowMaxIndex = this.state.length - 1
        const colMaxIndex = this.state[0].length - 1
        for (let i = 0; i < this.state.length; i++) {
          for (let j = 0; j < this.state[i].length; j++) {
            let aliveNeighbours = 0
            const neighbourIndexes = [
              [(i == 0 ? rowMaxIndex : i - 1), (j == 0 ? colMaxIndex : j - 1)], [(i == 0 ? rowMaxIndex : i - 1), j], [(i == 0 ? rowMaxIndex : i - 1), (j == colMaxIndex ? 0 : j + 1)],
              [i, (j == 0 ? colMaxIndex : j - 1)], false, [i, (j == colMaxIndex ? 0 : j + 1)],
              [(i == rowMaxIndex ? 0 : i + 1), (j == 0 ? colMaxIndex : j - 1)], [(i == rowMaxIndex ? 0 : i + 1), j], [(i == rowMaxIndex ? 0 : i + 1), (j == colMaxIndex ? 0 : j + 1)]
            ]
            neighbourIndexes.forEach((neighbour) => {
              if (neighbour && this.state[neighbour[0]][neighbour[1]]) aliveNeighbours++
            })
            newState[i][j] = this.state[i][j] ? (aliveNeighbours >= 2 && aliveNeighbours <= 3) : (aliveNeighbours === 3)
          }
        }
        this.state = newState
      },
      clearBoard() {
        if (this.inProgress) return
        this.state = store.createEmptyBoard()
      },
      randomizeBoard() {
        if (this.inProgress) return
        this.state = store.createRandomizedBoard()
      }
    }
  }
</script>

<style type="text/css">
  .game-of-life {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .game-of-life table {
    height: 900px;
    width: 900px;
  }
  .game-of-life td {
    padding: 0 1px 1px 0;
  }
  .game-of-life .controls button {
    margin-right: 10px;
    margin-top: 10px;
  }
  .game-of-life a {
    display: block;
    height: 100%;
    background-color: #EEE;
  }
  .game-of-life a:hover {
    background-color: #CCC;
  }
  .game-of-life a.active {
    background-color: #666;
  }
  .game-of-life a.active:hover {
    background-color: #444;
  }
</style>

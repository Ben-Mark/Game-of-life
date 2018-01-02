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
    data() {
      return {
        rows: gridFactory.rows,
        cols: gridFactory.cols,
        state: gridFactory.state,
        inProgress: false
      }
    },
    created() {
      this.state = gridFactory.getPattern('horizonLine');
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

            /**
             *   0,0,0
             *   0,1,0
             *   0,0,0
             */
//            if( this.state[0][j] || this.state[i][0] || this.state[rowMaxIndex][j] || this.state[i][colMaxIndex]){
//              const edgeneighbours = [
//                [(i === 0 ? i+1 : i - 1), (j === 0 ? 0 : j - 1)], //top left corner
//                [(i === 0 ? 0 : i - 1), j], //top edge
//                [(i === 0 ? 0 : i - 1), (j === colMaxIndex ? colMaxIndex : j + 1)], //top right corner
//                [i, (j === 0 ? 0 : j - 1)], //left edge
//                [i, (j === colMaxIndex ? colMaxIndex : j + 1)], //right edge
//                [(i === rowMaxIndex ? rowMaxIndex : i + 1), (j === 0 ? 0 : j - 1)], //bottom left corner
//                [(i === rowMaxIndex ? rowMaxIndex : i + 1), j], //bottom edge
//                [(i === rowMaxIndex ? rowMaxIndex : i + 1), (j === colMaxIndex ? colMaxIndex : j + 1)] //bottom right corner
//              ];
//                newState[i][j] = false;
//              continue;
//            }


            const neighbourIndexes = [
              [(i === 0 ? rowMaxIndex : i - 1), (j === 0 ? colMaxIndex : j - 1)], //top left corner
              [(i === 0 ? rowMaxIndex : i - 1), j], //top edge
              [(i === 0 ? rowMaxIndex : i - 1), (j === colMaxIndex ? 0 : j + 1)], //top right corner
              [i, (j === 0 ? colMaxIndex : j - 1)], //left edge
              [i, (j === colMaxIndex ? 0 : j + 1)], //right edge
              [(i === rowMaxIndex ? 0 : i + 1), (j === 0 ? colMaxIndex : j - 1)], //bottom left corner
              [(i === rowMaxIndex ? 0 : i + 1), j], //bottom edge
              [(i === rowMaxIndex ? 0 : i + 1), (j === colMaxIndex ? 0 : j + 1)] //bottom right corner
            ];


            const neighbourIndexesTest = [
              [(i === 0 ? 0 : i - 1), (j === 0 ? 0 : j - 1)], //top left corner
              [(i === 0 ? 0 : i - 1), j], //top edge
              [(i === 0 ? 0 : i - 1), (j === colMaxIndex ? colMaxIndex : j + 1)], //top right corner
              [i, (j === 0 ? 0 : j - 1)], //left edge
              [i, (j === colMaxIndex ? colMaxIndex : j + 1)], //right edge
              [(i === rowMaxIndex ? rowMaxIndex : i + 1), (j === 0 ? 0 : j - 1)], //bottom left corner
              [(i === rowMaxIndex ? rowMaxIndex : i + 1), j], //bottom edge
              [(i === rowMaxIndex ? rowMaxIndex : i + 1), (j === colMaxIndex ? colMaxIndex : j + 1)] //bottom right corner
            ];

//            if( this.state[0][j] || this.state[i][0] || this.state[rowMaxIndex][j] || this.state[i][colMaxIndex]){
//               if(this.state[0][j])
//              //console.log('hey')
//              newState[i][j] = false;
//              continue;
//            }


            neighbourIndexes.forEach((neighbour) => {
              // if (neighbour !== (this.state[0][j] || state[rowMaxIndex][j] || this.state[i][0] || this.state[i][colMaxIndex]))
//               debugger;
//              let bool = this.state[i][j];
//              let x = i, y = j;
              if (neighbour && this.state[neighbour[0]][neighbour[1]]) aliveNeighbours++
            });


            switch (this.state[i][j]) {
              case true:
                (aliveNeighbours >= 2 && aliveNeighbours <= 3) ? (newState[i][j] = true) : (newState[i][j] = false);
                break;
              case false:
                (aliveNeighbours === 3) ? (newState[i][j] = true) : (newState[i][j] = false);
                break;
            }
//            if (!this.state[i][j]) {
//              if (aliveNeighbours === 3)
//                newState[i][j] = true;
//              else newState[i][j] = false;
//              continue;
//            }
//            else {
//              if(aliveNeighbours >= 2 && aliveNeighbours <= 3)
//                newState[i][j] = true;
//              else newState[i][j] = false;
//              continue;
//            }

            // newState[i][j] = this.state[i][j] ? (aliveNeighbours >= 2 && aliveNeighbours <= 3) : (aliveNeighbours === 3)

//            if(this.state[0][j] || state[rowMaxIndex][j] || this.state[i][0] || this.state[i][colMaxIndex])
//              newState[i][j] = false;
          }
        }
        this.state = newState
      }

    },
    mounted() {
      if (this.inProgress) return;
      hub.$on('randomizeBoard', (val) => this.state = val);
      hub.$on('clearBoard', (val) => this.state = val);
      hub.$on('gliderBoard', (val) => this.state = val);
      hub.$on('horizonLineBoard', (val) => this.state = val);
      hub.$on('run', (val) => {
        if (val) this.toggleInProgress();
      });
    }
  }
</script>

<style type="text/css">

  .board {
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

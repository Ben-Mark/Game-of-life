import Vue from 'vue'
import Main from './Main.vue'
import Test from './Test.vue'

new Vue({
  el: '#app',
  //render: h => h(Main),
  render: h => h(Main),
  components: {
    Main
  }

});

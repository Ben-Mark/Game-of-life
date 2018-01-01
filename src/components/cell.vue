<template>
  <a @click="toggle" :class="[active ? 'active-style' : 'not-active-style']"  href="#" ></a>
</template>

<script>
  export default {
    props: ['row','col','active'],
    computed: {
      status: {
        get() {
          return this.active
        },
        set(val) {
          this.$emit('update:active', val)
        }
      }
    },
    mounted(){

    }
    ,
    methods: {
      toggle() {
        this.status = !this.status;
      },
      getTitle(){
        return 'index: ['+(this.row-1)+','+(this.col-1)+']\n isAlive: '+this.status;
      }
    },

  }
</script>

<style >

  .active-style  {
    background-color: #CCC;
    display: flex;
    height: 100%;
    width: 100%;
  }
  .not-active-style {
    background-color: #000000;
    display: flex;
    height: 100%;
    width: 100%;
  }

</style >
<!--<style>-->
<!--.game-of-life a.active {-->
<!--background-color: #101010;-->
<!--}-->

<!--.game-of-life a.active:hover {-->
<!--background-color: #444;-->
<!--}-->
<!--</style>-->

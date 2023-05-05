<template>
    <tr class="table__row">
      <Cell :content="index" />
      <Cell :content="rowContent.myHum" />
      <Cell :content="rowContent.myPres" />
      <Cell :content="rowContent.myTemp" />
    </tr>
</template>
  
<script>
  import Cell from './Cell.vue'
  
  export default {
    name: 'Row',
    props: {
        rowContent: Object,
        index: Number
    },
    components: {
      Cell
    }
  }
</script>

<style scoped>

</style>
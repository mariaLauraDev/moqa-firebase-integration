<template>
    <tr class="table__row">
      <Cell :content="index" />
      <Cell :content="rowContent.Pres" />
      <Cell :content="rowContent.co2" />
      <Cell :content="rowContent.data" />
      <Cell :content="rowContent.hora" />
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
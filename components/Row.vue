<template>
    <tr class="table__row">
      <Cell :content="index" />
      <!-- <Cell :content="rowContent.user" /> -->
      <Cell :content="formatedStartDate" />
      <Cell :content="formatedEndDate" />
      <Cell :content="rowContent.numberOfDocuments" />
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
    },
    computed: {
    formatedStartDate () {
      return new Date(this.rowContent?.startDate?.seconds * 1000).toISOString()
    },
    formatedEndDate () {
      return new Date(this.rowContent?.endDate?.seconds * 1000).toISOString()
    }
  }
  }
</script>

<style scoped>

</style>
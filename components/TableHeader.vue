<template>
    <thead>
      <tr class="table__header">
        <HeaderCell label="Nº" />
        <!-- <HeaderCell label="User" /> -->
        <HeaderCell label="Selected Start Date" />
        <HeaderCell label="Selected End Date" />
        <HeaderCell label="Nº docs" />
      </tr>
    </thead>
</template>
  
<script>
  import HeaderCell from './HeaderCell.vue';
  
  export default {
    name: 'TableHeader',
    components: {
      HeaderCell
    }
  }
</script>
  
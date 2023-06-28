<template>
    <thead>
      <tr class="table__header">
        <HeaderCell label="Nº" />
        <HeaderCell label="Pres" />
        <HeaderCell label="co2" />
        <HeaderCell label="hora" />
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
  
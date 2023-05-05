<template>
    <thead>
      <tr class="table__header">
        <HeaderCell label="Nº" />
        <HeaderCell label="myHum" />
        <HeaderCell label="myPres" />
        <HeaderCell label="myTemp" />
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
  
<template>
  <div id="app">
    <main>
      <Suspense>
        <table-data />
      </Suspense>
    </main>
  </div>
</template>

<script setup>
import TableData from './components/TableData.vue';
import { Suspense } from 'vue';

</script>

<style>

#app, html, body, main { height: 100%; }
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  background-color: #f8f9fa;
  color: #495057;
  font-family: 'Open Sans', sans-serif;
}

</style>
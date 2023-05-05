<template>
    <div class="container">
        <template v-if="documents.length > 0">
            <h1 class="title">MVP de Dados do MoQa</h1>
            <Table :rows="documents" />
        </template>
        <template v-else>
            <p>Carregando...</p>
        </template>
    </div>
</template>
  
<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { config } from '../firebaseConfig';
import Table from './Table.vue';

export default {
    name: 'TableData',
    components: {
        Table,
    },
    data() {
        return {
        documents: [],
        };
    },
    mounted() {
        const app = initializeApp(config.firebase);
        const db = getFirestore(app);
        const concentrationCol = collection(db, 'system-1');

        onSnapshot(concentrationCol, (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                docs.push(doc.data());
                console.log(doc.data())
            });
            this.documents = docs;
            console.log('this.documents',this.documents)
        });
    },
};
</script>  

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.table {
  width: 100%;
  border-spacing: 0;
  box-sizing: border-box;
}

.table__cell,
.table__header {
  padding: 0.5rem;
  text-align: left;
}

.table__header {
    text-transform: capitalize;
    font-weight: bold;
    text-align: left;
}

.table__cell {
  font-size: 1.2rem;
  padding-inline: .5rem;
}

.table__row:nth-child(even) {
  background-color: #dee2e6;
}

</style>
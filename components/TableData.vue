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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
      isAuthenticated: false,
    };
  },
  async mounted() {
    const firebaseApp = initializeApp(config.firebase);
    const firestoreDb = getFirestore(firebaseApp);
    const concentrationCol = collection(firestoreDb, 'system-1');

    try {
      const auth = getAuth(firebaseApp);
      const runtimeConfig = useRuntimeConfig();

      await signInWithEmailAndPassword(auth, runtimeConfig.public.email, runtimeConfig.public.password);
      // Se a autenticação for bem-sucedida, a partir deste ponto, você pode acessar as coleções protegidas por autenticação
      onSnapshot(concentrationCol, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        this.documents = docs;
      });
    } catch (error) {
      console.error(error);
    }
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
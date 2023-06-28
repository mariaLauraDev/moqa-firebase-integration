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
import { getFirestore, collection, onSnapshot, doc, setDoc,  limit, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Table from './Table.vue';
import download from 'downloadjs';

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
    const runtimeConfig = useRuntimeConfig();
    const firebaseApp = initializeApp(runtimeConfig.public.firebaseConfig);
    const firestoreDb = getFirestore(firebaseApp);
    const concentrationCol = collection(firestoreDb, 'system-1');

    // const timestamp = new Date();
    // const date = timestamp.toLocaleDateString('pt-BR');
    // const time = timestamp.toLocaleTimeString('pt-BR', { hour12: false });


//     const payload = {
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD34F0",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// };
// const moqa9 = {
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_A5BBFC",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// };
// const moqa10 = {
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_E4D1F0",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// };
// const moqa11 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DC2298",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa12 = {
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DC3824",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa13 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD1504",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa14 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD31EC",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa15 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD56F0",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa16 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DC3674",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa17={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD5A08",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa18={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DDCA1C",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa19={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DCB604",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa20={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DD3468",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa21 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DC6774",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa22={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_DC0980",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }
// const moqa23 ={
//   "Pres": 0,
//   "adc0": 2064,
//   "adc1": 9760,
//   "adc2": 9936,
//   "adc3": 5920,
//   "adsLog": 0,
//   "ccsLog": 0,
//   "co2": 400,
//   "data": "6/22/2023",
//   "erroLog": 2,
//   "extTemp": 0,
//   "hora": "11:26:40",
//   "hum": 0,
//   "intTemp": 0,
//   "moqaID": "12moqa392_A70044",
//   "msdLog": 0,
//   "myTimestamp": {"seconds": 1687433200, "nanoseconds": 0},
//   "pm1": 3,
//   "pm10": 7,
//   "pm25": 5,
//   "pmsLog": 0,
//   "rtcLog": 0,
//   "tvocs": 0
// }


// async function saveTemplatesToDatabase(payload, collectionRef) {
//   try {
//     for (let i = 0; i < 120; i++) {
//       const newDocRef = doc(concentrationCol);
//       await setDoc(newDocRef, payload);
//       console.log(`Template ${i + 1} successfully saved with document ID: ${newDocRef.id}`);
//     }
//     console.log('All templates saved to the database.');
//   } catch (error) {
//     console.error('Error saving templates:', error);
//   }
// }

    try {
      const auth = getAuth(firebaseApp);

      await signInWithEmailAndPassword(auth, runtimeConfig.public.email, runtimeConfig.public.password);
      // Se a autenticação for bem-sucedida, a partir deste ponto, você pode acessar as coleções protegidas por autenticação
      // for (let i = 0; i < 120; i++) {
      //   const newDocRef = doc(concentrationCol);
      //   await setDoc(newDocRef, payload);
      //   console.log(`Document ${i} ${newDocRef.id} successfully written with payload:`, payload);
      // }

      // console.log('moqa9')
      // await saveTemplatesToDatabase(moqa9, concentrationCol);
      // //wriite until moqa 25 with console.log before
      // console.log('moqa10')
      // await saveTemplatesToDatabase(moqa10, concentrationCol);
      // console.log('moqa11')
      // await saveTemplatesToDatabase(moqa11, concentrationCol);
      // console.log('moqa12')
      // await saveTemplatesToDatabase(moqa12, concentrationCol);
      // console.log('moqa13')
      // await saveTemplatesToDatabase(moqa13, concentrationCol);
      // console.log('moqa14')
      // await saveTemplatesToDatabase(moqa14, concentrationCol);
      // console.log('moqa15')
      // await saveTemplatesToDatabase(moqa15, concentrationCol);
      // console.log('moqa16')
      // await saveTemplatesToDatabase(moqa16, concentrationCol);
      // console.log('moqa17')
      // await saveTemplatesToDatabase(moqa17, concentrationCol);
      // console.log('moqa18')
      // await saveTemplatesToDatabase(moqa18, concentrationCol);
      // console.log('moqa19')
      // await saveTemplatesToDatabase(moqa19, concentrationCol);
      // console.log('moqa20')
      // await saveTemplatesToDatabase(moqa20, concentrationCol);
      // console.log('moqa21')
      // await saveTemplatesToDatabase(moqa21, concentrationCol);
      // console.log('moqa22')
      // await saveTemplatesToDatabase(moqa22, concentrationCol);
      // console.log('moqa23')
      // await saveTemplatesToDatabase(moqa23, concentrationCol);
      // console.log('moqa24')
      // await saveTemplatesToDatabase(moqa24, concentrationCol);
      // console.log('moqa25')
      // await saveTemplatesToDatabase(moqa25, concentrationCol);



      let documentsQuery = null;
      // onSnapshot(concentrationCol, (snapshot) => {
      //   const docs = [];
      //   snapshot.forEach((doc) => {
      //     docs.push(doc.data());
      //   });
      //   this.documents = docs;
      // });

      // //Get the last 10 documents registered on the database
      // documentsQuery = query(
      //   concentrationCol,
      //   orderBy('myTimestamp', 'desc'),
      //   limit(2)
      // );


      // documentsQuery = query(
      //   concentrationCol,
      //   limit(10)
      // );
      
      //Get que first 2 documents that has myTimestamp.seconds >=1675488000
      // documentsQuery = query(
      //   concentrationCol,
      //   where("data", '>', "6/13/2023"),
      //   limit(2)
      //   );

      // documentsQuery = query(
      //   concentrationCol,
      //   where("data", '>', "6/4/2023"),
      //   where("data", '<', "6/10/2023"),
      //   );

      const timestamp = Timestamp.fromDate(new Date(2023, 6, 27))
      console.log('timestamp', timestamp)
      documentsQuery = query(
        concentrationCol,
        // where("data", "in", ["6/27/2023", "6/6/2023", "6/7/2023", "6/8/2023", "6/9/2023"]),
        where("myTimestamp", ">=", timestamp),
        limit(2)
      );

        console.log('documentsQuery', documentsQuery)

      // onSnapshot(documentsQuery, (snapshot) => {
      //   const docs = [];
      //   snapshot.forEach((doc) => {
      //     console.log("doc", doc.data())
      //     docs.push(doc.data());
      //   });
      //   this.documents = docs;
      // });



      onSnapshot(documentsQuery, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          console.log('doc1', doc)
          console.log("doc", doc.data());
          console.log("mytime", doc.data().myTimestamp);
          docs.push(doc.data());
        });
        this.documents = docs;
        

        // Converter os documentos para CSV
        const csvData = this.convertToCsv(this.documents);

        // Iniciar o download do arquivo CSV
        download(csvData, 'output.csv', 'text/csv');
      });

    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    convertToCsv(data) {
      const fields = Object.keys(data[0]);
      const csvRows = [];

      // Cabeçalho do CSV
      const csvHeader = fields.join(',');

      // Linhas do CSV
      const csvData = data.map((row) => {
        return fields.map((field) => {
          return row[field];
        }).join(',');
      }).join('\n');

      return `${csvHeader}\n${csvData}`;
    },
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
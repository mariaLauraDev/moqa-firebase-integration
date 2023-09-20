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
    const concentrationCol = collection(firestoreDb, 'monitoring-control');

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
const moqas = [
  { id: 1, idDb: 'DC40AC', lat: -3.724067, long: -38.583269, name: 'Vila Velha' },
  { id: 2, idDb: 'DDF290', lat: -3.718879, long: -38.516058, name: 'CITINOVA' },
  { id: 3, idDb: '0B1664', lat: -3.711960, long: -38.555400, name: 'Leste  Oeste' },
  { id: 4, idDb: 'DD2BA4', lat: -3.721830, long: -38.478900, name: 'Iate Plaza' },
  { id: 5, idDb: 'DDCF60', lat: -3.718275, long: -38.465940, name: 'Cais do Porto' },
  { id: 6, idDb: 'DD0EB0', lat: -3.733390, long: -38.496900, name: 'Praça Portugal' },
  { id: 7, idDb: 'E4C790', lat: -3.726120, long: -38.495100, name: 'Beira Mar' },
  { id: 8, idDb: 'DD34F0', lat: -3.725460, long: -38.532700, name: 'Praça da Lagoinha' },
  { id: 9, idDb: 'A5BBFC', lat: -3.751800, long: -38.525800, name: 'Nossa Sra. de Fátima' },
  { id: 10, idDb: 'E4D1F0', lat: -3.731834, long: -38.544744, name: 'Farias Brito' },
  { id: 11, idDb: 'DC01E4', lat: -3.784397, long: -38.580495, name: 'Siqueira' },
  { id: 12, idDb: 'DC2298', lat: -3.829935, long: -38.590254, name: 'Aracapé' },
  { id: 13, idDb: 'DC3824', lat: -3.828380, long: -38.556700, name: 'José Walter' },
  { id: 14, idDb: 'DD1504', lat: -3.787530, long: -38.547900, name: 'Itaperi' },
  { id: 15, idDb: 'DD31EC', lat: -3.816270, long: -38.531700, name: 'Hospital Sarah' },
  { id: 16, idDb: 'DD56F0', lat: -3.846320, long: -38.522900, name: 'Areninha Conj. Palmeiras' },
  { id: 17, idDb: 'DC3674', lat: -3.828810, long: -38.521300, name: 'Lagoa São Cristovâo' },
  { id: 18, lat: -3.725252, long: -38.523764, name: 'Paço Municipal' },
  { id: 19, idDb: 'DDCA1C', lat: -3.758520, long: -38.583900, name: 'Imaculado Coração de Maria' },
  { id: 20, lat: -3.751196, long: -38.500498, name: 'SCSP' },
  { id: 21, idDb: 'DD3468', lat: -3.831720, long: -38.494000, name: 'Pracinha da Messejana' },
  { id: 22, idDb: 'DC6774', lat: -3.829530, long: -38.466600, name: 'Praça da Lagoa Redonda' },
  { id: 23, lat: -3.769965, long: -38.616180, name: 'HNSC' },
  { id: 24, idDb: 'A70044', lat: -3.781510, long: -38.502600, name: 'Areninha Lagoa da Zeza' },
  { id: 26, lat: -3.789774, long: -38.586485, name: 'Terminal Messejana' }
];


    try {
      const auth = getAuth(firebaseApp);

      await signInWithEmailAndPassword(auth, runtimeConfig.public.email, runtimeConfig.public.password);

      //save moqas to database
      try {
        await Promise.all(
          moqas.map(async (moqa) => {
            const docRef = doc(concentrationCol, `${moqa.id}`);
            const data = { ...moqa };

            await setDoc(docRef, data);
            console.log(`Moqa salvo: ${data.name}`);
          })
        );

        console.log('Todos os moqas foram salvos com sucesso.');
      } catch (error) {
        console.error('Ocorreu um erro ao salvar os moqas:', error);
      }

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
      //   where("data", '>', "6/22/2023"),
      //   limit(2)
      //   );

      // documentsQuery = query(
      //   concentrationCol,
      //   where("data", '>', "6/4/2023"),
      //   where("data", '<', "6/10/2023"),
      //   );

      // let date = new Date(2023,6,26).getTime()

      // console.log('date 1', date)
      // console.log('date 2 ', date/1000)
      // console.log('date 3', Math.floor(date))

      // let date1 = 1688958000
      // let date1 = 1690991283
      // let date2 = 1690761600
      // const timestamp1 = new Timestamp(date1, 0);
      // const timestamp2 = new Timestamp(date2, 0);

      // console.log('timestamp1', timestamp1)
      // console.log('timestamp2', timestamp2)

      // documentsQuery = query(
      //   concentrationCol,
      //   where("Timestamp", "<=", timestamp1),
      //   where("Timestamp", ">=", timestamp2),
      //   orderBy('Timestamp', 'desc'),
      //   );

      // const startDate = new Date('2023-06-26T00:00:00Z');
      // // const endDate = new Date('2023-06-27T23:59:59Z');

      // const startTimestamp = Math.floor(startDate.getTime() / 1000);
      // // const endTimestamp = Math.floor(endDate.getTime() / 1000);
      // console.log('startTimestamp', startTimestamp)
      // // console.log('endTimestamp', endTimestamp)

      // documentsQuery = query(
      //   concentrationCol,
      //   where("Timestamp", ">=", startTimestamp),
      //   limit(2)
      // );
      
        // console.log('documentsQuery', documentsQuery)

      // onSnapshot(documentsQuery, (snapshot) => {
      //   const docs = [];
      //   snapshot.forEach((doc) => {
      //     console.log("doc", doc.data())
      //     docs.push(doc.data());
      //   });
      //   this.documents = docs;
      // });

      // documentsQuery = query(
      //   concentrationCol,
      //   where("user", "==", "cassiano9189@gmail.com"),
      // );

      // console.log('documentsQuery', documentsQuery)

      // onSnapshot(documentsQuery, (snapshot) => {
      //   const docs = [];
      //   snapshot.forEach((doc) => {
      //     docs.push(doc.data());
      //   });
      //   this.documents = docs;
        

      //   // Converter os documentos para CSV
      //   const csvData = this.convertToCsv(this.documents);

      //   // Iniciar o download do arquivo CSV
      //   download(csvData, 'output.csv', 'text/csv');
      // });

    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    convertToCsv(data) {
      const fields = Object.keys(data[0])

      const csvHeader = fields.join(',')

      const csvData = data.map((row) => {
        return fields.map((field) => {
          if (field === 'endDate' || field === 'startDate') {
            const timestamp = row[field]
            const formattedTimestamp = new Date(timestamp.seconds * 1000).toISOString()
            return formattedTimestamp
          } else {
            return row[field]
          }
        }).join(',')
      }).join('\n')

      return `${csvHeader}\n${csvData}`
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
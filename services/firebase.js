const axios = require('axios');

const login_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtn_0eGG5dRv1UMX_T4AsoCGR92EwpB94";

const payload = {
  email: "marialauradev@gmail.com",
  password: "Test123",
  returnSecureToken: true
};

axios.post(login_url, payload)
  .then(response => {
    if (response.data.idToken) {
      const idToken = response.data.idToken;
      console.log("Token ID:", idToken);
    } else {
      console.log("Error:", response.data.error.message);
    }
  })
  .catch(error => {
    console.log("Error:", error.message);
});

// Obtenha a data e hora atuais
const dataAtual = new Date();
const horaAtual = dataAtual.getHours();

// Defina a data e hora 1 hora atrás
const umaHoraAtras = new Date();
umaHoraAtras.setHours(horaAtual - 1);

// Converta a data e hora para o formato ISO 8601
const umaHoraAtrasISO = umaHoraAtras.toISOString();

const query_url = "https://firestore.googleapis.com/v1/projects/moqatrama-stg/databases/(default)/documents/:runQuery";

const queryPayload = {
    "structuredQuery": {
      "where": {
        "fieldFilter": {
          "field": { "fieldPath": "myTimestamp" },
          "op": "GREATER_THAN",
          "value": { "timestampValue": umaHoraAtrasISO }
        }
      },
      "from": [{ "collectionId": "firebase-data" }]
    }
  };
  
  const config = {
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json"
    }
  };
  
  axios.post(query_url, queryPayload, config)
    .then(response => {
      const payload = response.data;
      console.log("Payload:", payload);
      
      // Aqui você pode calcular a média de cada poluente em cada documento
      // e realizar outras manipulações nos dados retornados
      
    })
    .catch(error => {
      console.log("Error:", error.message);
    });

    // Supondo que o payload retornado esteja armazenado na variável 'payload'

// Array para armazenar as médias dos poluentes
const mediasPoluentes = [];

// Percorrer cada documento no payload
payload.documents.forEach(document => {
  const data = document.fields;

  // Verificar se o documento contém o campo do poluente
  if (data.poluente) {
    const poluenteValues = data.poluente.arrayValue.values;

    // Calcular a média dos valores do poluente
    const mediaPoluente = poluenteValues.reduce((sum, value) => {
      const poluenteValue = value.integerValue; // Ou use 'doubleValue' se o valor for decimal
      return sum + poluenteValue;
    }, 0) / poluenteValues.length;

    // Adicionar a média dos poluentes ao array
    mediasPoluentes.push(mediaPoluente);
  }
});

console.log("Médias dos Poluentes:", mediasPoluentes);

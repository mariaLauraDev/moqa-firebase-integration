// Obtenha a data e hora atuais
const dataAtual = new Date();
const horaAtual = dataAtual.getHours();

// Defina a data e hora 1 hora atrás
const umaHoraAtras = new Date();
umaHoraAtras.setHours(horaAtual - 1);

// Converta a data e hora para o formato ISO 8601
const umaHoraAtrasISO = umaHoraAtras.toISOString();

// Crie o objeto de payload da consulta
const payload = {
  structuredQuery: {
    where: {
      fieldFilter: {
        field: { fieldPath: "myTimestamp" },
        op: "GREATER_THAN",
        value: { timestampValue: umaHoraAtrasISO }
      }
    },
    from: [{ collectionId: "firebase-data" }]
  }
};

// Faça algo com o payload (por exemplo, envie-o para o Firebase)
// ...


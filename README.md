# Integração MoQa Firebase

Neste repositório, você encontrará informações sobre como integrar o Firebase no projeto MOQA para adicionar recursos de autenticação, armazenamento em nuvem e banco de dados em tempo real.

## Visualização

Desenvolvemos uma aplicação usando Nuxtjs e Vuejs, usando a coleção “system -1” no banco de produção (moqatrama-prod) como teste.

#### Visualização do documento de teste no console do firebase
![image](https://user-images.githubusercontent.com/112260675/236957717-339afea2-d3f6-4985-a39c-0eaa7fbd81dc.png)

#### Visualização do front-end de teste de integração
![https://user-images.githubusercontent.com/112260675/236358335-d0085eb9-6d86-432b-b51f-d7c7eea26edd.png](https://user-images.githubusercontent.com/112260675/236358335-d0085eb9-6d86-432b-b51f-d7c7eea26edd.png)

#### Capacidade de tempo real de leitura dos dados usando a função onSnapshot()
Aqui, gravei uma janela da aplicação de front end lendo os dados em tempo real que estavam sendo cadastrados em uma janela secundária, para ressaltar a importância de usar a função ```onSnapshot()``` para a leitura dos dados.

https://user-images.githubusercontent.com/112260675/236958673-78ec8255-d26c-452a-bb1a-48fc8a5eb2c4.mp4


## Integração

### Variáveis de ambiente

O objeto de configuração do firebase (apiKey, projectId, etc) estão como variáveis de ambiente no arquivo nuxt.config.js, para não expô-las. Pode-se usar outra forma de usar os arquivos de envs. O mais importante é não expor e-mail e senha repassados no código.

### Componente TableData.vue (’~/components/TableData.vue’)

Nesse componente, na parte de script, realizamos a integração com o firebase, importando o módulo do firebase instalado via ```npm```, bem como os serviços do firestore e auth.

```jsx
<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

...

  async mounted() {
    ...
  },
};
</script>
```

A parte do script apresentado ```async mounted()``` é executada imediatamente após o componente ser montado (ou seja, injetado no DOM). Dessa forma, em uma aplicação sem framework, daria para replicar o comportamento construindo uma função assíncrona. Ela deve ser assíncrona devido ao processo de autenticação (login por usuário e senha) ser assíncrono.  Por outro lado, não é necessário usar funções assíncronas para fazer leituras nas coleções do firebase

## Configuração do projeto de “MVP de dados”

### Configuração

Certifique-se de instalar as dependências:

```
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install

```

### Servidor de desenvolvimento

Inicie o servidor de desenvolvimento em `http://localhost:3000`

```
npm run dev

```

### Produção

Construir a aplicação para produção:

```
npm run build

```

Pré-visualizar localmente a compilação de produção:

```
npm run preview

```

Consulte a [documentação do Nuxt 3] ([https://nuxt.com/docs/getting-started/introduction](https://nuxt.com/docs/getting-started/introduction)) para saber mais.

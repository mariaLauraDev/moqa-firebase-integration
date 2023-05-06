// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side

    // Keys within public, will be also exposed to the client-side
    public : { 
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
    private: {

    }
  }
});
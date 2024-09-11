<template>

    <div class="main-div">
      <v-container class="d-flex justify-end align-end absoluteClass w-100 h-100" fluid>
        <LogoImpacto />
      </v-container>
      <LoginFormProf/>
    </div>
  
  </template>
  
  <script>
  import LogoImpacto from '@/components/LogoImpacto.vue'
  import LoginFormProf from '@/components/LoginFormProf.vue';
  import axios from 'axios';
  
  export default {
    name: 'Login',
    components: {
      LoginFormProf,
      LogoImpacto
    },
  
    mounted() {
      this.verificaLogin();
    },
  
    methods: {
      verificaLogin() {
        console.log('TESTE123')
        const dataToken = localStorage.getItem('tokenProf');
        
        if (dataToken === null || dataToken === undefined) {
          console.log('O localStorage está vazio ou o item "token" não está definido.');
        } else {
          const data = {
            token: dataToken
          };
          axios({ url: 'https://ta-back.onrender.com/professores/verificaToken', data, method: 'POST' })
            .then((response) => {
              console.log(response.status)
              if (response.status === 200) { // Token é válido
                this.$router.push('/turma');
              }
            })
            .catch((error) => {
              // Tratar erros aqui
              localStorage.removeItem('tokenProf');
              this.$router.push('/proflogin');
              console.error(error);
            });
        }
  
      }
  
    }
  }
  
  
  </script>
  
  <style>
  .main-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    background: url('../assets/imgs/homeBackground.jpg');
    background-size: cover;
  }
  
  .absoluteClass {
    position: absolute;
    width: 100%;
  }
  </style>
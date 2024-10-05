<template>Oi</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import LogoImpacto from '@/components/LogoImpacto.vue'
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    LoginForm,
    LogoImpacto
  },

  mounted() {
    this.verificaLogin();
  },

  methods: {
    verificaLogin() {
      const dataToken = localStorage.getItem('token');
      
      if (dataToken === null || dataToken === undefined) {
        console.log('O localStorage está vazio ou o item "token" não está definido.');
      } else {
        const data = {
          token: dataToken
        };
        axios({ url: 'https://ta-back.onrender.com/alunos/verificaToken', data, method: 'POST' })
          .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
              // Token é válido
              this.$router.push('/welcome');
            }
          })
          .catch((error) => {
            // Tratar erros aqui
            localStorage.removeItem('token');
            this.$router.push('/login');
            console.error(error);
          });
      }

    }

  }
}


</script>

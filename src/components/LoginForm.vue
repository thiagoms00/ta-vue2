<template>
  <v-container class="fill-height teste main-container">
    <v-sheet class="main-sheet
        d-flex align-center justify-center flex-column
        text-center mx-auto px-4
        rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="55vw" height="70vh" border="md">
      <LogoPlanoA class="logo-planoA" />
      <v-container style="max-width: 32vw;" class="form-container">
        <v-container class="d-flex">
          <h1 class="text-login">Login</h1>
        </v-container>

        <v-form v-model="valid" class="w-40 main-form" @submit.prevent="submitForm">
          <v-container class="">
            <v-text-field class="form-field aluno-field" v-model="email" :rules="emailRules" label="Aluno"
              variant="outlined" bg-color="white" color="#1E3892" prepend-inner-icon="mdi-account">

            </v-text-field>

            <v-text-field class="form-field senha-field" v-model="senha" :rules="senhaRules" label="Senha"
              variant="outlined" bg-color="white" color="#1E3892" prepend-inner-icon="mdi-lock-outline" type="password">

            </v-text-field>
          </v-container>
          <v-btn class="btnTeste" size="large" type="submit" variant="flat" color="#1E3892" elevation-15
            :loading="loading">
            {{ buttonText }}
          </v-btn>

          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        </v-form>



        <v-divider class="my-4"></v-divider>


      </v-container>
    </v-sheet>
  </v-container>


</template>

<script>
import LogoPlanoA from './LogoPlanoA.vue'
import { mapActions } from 'vuex'


export default {
  name: 'LoginForm',
  components: {
    LogoPlanoA,
  },

  data: () => ({
    loading: false,
    buttonText: 'Entrar',

    error: '',

    valid: false,
    email: '',
    senha: '',

    emailRules: [
      value => {
        if (value) return true

        return 'Insira um usuário.'
      }
    ],
    senhaRules: [
      value => {
        if (value) return true

        return 'Insira sua senha.'
      }
    ],
  }),

  created() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log('teste');

  },

  methods: {
    ...mapActions([
      'login'
    ]),

    submitForm() {
      this.buttonText = 'Carregando...';
      this.loading = true;
      this.error = '';


      // Processamento do formulário
      const userData = {
        id: this.email,
        senha: this.senha
      };


      this.login(userData)
        .then(() => {
          // Ação a ser executada após o login bem-sucedido
          console.log('Login bem-sucedido');
          this.$router.push('/welcome')
        })
        .catch((error) => {
          // Ação a ser executada se ocorrer um erro durante o login
          console.error('Erro no login:', error);
          this.error = 'Usuário ou senha incorretos. Por favor, tente novamente.';
          this.loading = false;
          this.buttonText = 'Entrar';

          setTimeout(() => {

            // Define loading para false para esconder o botão de carregamento
            this.error = '';
            // Aqui você pode adicionar lógica para tratar a resposta do backend
          }, 5000);

        });
    },










  }
}

</script>


<style>
.text-login {
  font-size: 3rem;
  font-family: Manrope;
}

.btnTeste {
  width: 24vw;
  height: 10vh;
  font-family: Manrope;
  font-size: 2rem;
  font-weight: bold;
}

@media(max-width: 1400px) {

  .logo-planoA {
    width: 13vw;
  }

  .text-login {
    font-size: 1.4rem !important;
    margin-top: 0px !important;

  }

  .form-container {
    margin-top: 0px !important;
    align-items: flex-start !important;
    padding-top: 0px !important;
  }

  .main-form {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }


  .form-field input {
    font-size: 0.8rem !important;
  }


  .form-field label {
    font-size: 0.6rem !important;
  }

  .btnTeste {
    width: 25vw !important;
    height: 6.3vh !important;
    font-size: 0.8rem !important;
  }

}

/* Tablet: Modo com altura menur */


@media(max-width: 1024px) {

.logo-planoA {
  width: 20vw;
}

.text-login {
  font-size: 1.4rem !important;
  margin-top: 0px !important;

}

.form-container {
  margin-top: 0px !important;
  align-items: flex-start !important;
  padding-top: 0px !important;
}

.main-form {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.main-sheet{
  width: 70vw !important;
}
.form-container {
  margin-top: 0px !important;
  align-items: flex-start !important;
  padding-top: 0px !important;
  max-width: 45vw !important;
}

.text-login{
  font-size: 1.7rem !important;

}
.form-field input {
  font-size: 0.9rem !important;
}


.form-field label {
  font-size: 0.9rem !important;
}

.btnTeste {
  width: 26vw !important;
  height: 6vh !important;
  font-size: 0.9rem !important;
}

}


/* Tablet: Modo com altura maior */

@media(max-width: 768px) {

.logo-planoA {
  width: 32vw;
}

.text-login {
  font-size: 1.7rem !important;
  margin-top: 0px !important;

}

.main-sheet{
  width: 75vw !important;
}

.form-container {
  margin-top: 0px !important;
  align-items: flex-start !important;
  padding-top: 0px !important;
  max-width: 60vw !important;
}

.main-form {
  margin-top: 0 !important;
  padding-top: 0 !important;
}


.form-field input {
  font-size: 1.0rem !important;
}


.form-field label {
  font-size: 1.0rem !important;
}

.btnTeste {
  width: 40vw !important;
  height: 5.3vh !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
}

}




</style>
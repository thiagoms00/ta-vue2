<template>
  <v-container class="main-div" fluid>
    <v-row class="full-height d-flex justify-center align-center">
      <v-col cols="3" sm="2" md="3" class="text-center">
      </v-col>

      <v-col cols="6" sm="8" md="6" class="text-center">
        <v-sheet class="rounded-lg elevation-2 pb-14">
          
          <!-- Parte da Logo do planoA -->
          <v-row class="d-flex justify-center">
            <v-col cols="8" sm="6" md="4" xs="3">
                <img
                  src="../assets/imgs/Logo-PlanoA-removebg.png"
                  alt="Logo Plano A"
                  class="logo-image-planoa"
                />
            </v-col>
          </v-row>

          <!-- Parte do formulário de login. -->
          <v-row class="d-flex justify-center">
            <v-col cols="8" >
              <div class="text-h2 text-md-h2 text-sm-h4 text-xs-h5 d-flex px-4">Login</div>
              <div>
                <v-form
                  v-model="valid"
                  @submit.prevent="submitForm"
                >
                  <v-container class="">
                    <v-text-field
                      class="form-field aluno-field"
                      v-model="email"
                      :rules="emailRules"
                      label="Aluno"
                      variant="outlined"
                      bg-color="white"
                      color="#1E3892"
                      prepend-inner-icon="mdi-account"
                    >
                    </v-text-field>

                    <v-text-field
                      class="form-field senha-field"
                      v-model="senha"
                      :rules="senhaRules"
                      label="Senha"
                      variant="outlined"
                      bg-color="white"
                      color="#1E3892"
                      prepend-inner-icon="mdi-lock-outline"
                      type="password"
                    >
                    </v-text-field>
                  </v-container>
                  <v-btn
                    class="btnTeste"
                    size="large"
                    type="submit"
                    variant="flat"
                    color="#1E3892"
                    elevation-15
                    :loading="loading"
                  >
                    {{ buttonText }}
                  </v-btn>

                  <v-alert v-if="error" type="error" class="mt-4">{{
                    error
                  }}</v-alert>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col cols="3" sm="2" md="3" class="full-height d-flex justify-end align-end">
        <v-img class="logo-imp"
        src="../assets/imgs/Logo-Impacto-removebg.png"
        contain
        :max-width="300"
        aspect-ratio="16/9"
    ></v-img> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import LogoImpacto from "@/components/LogoImpacto.vue";
import axios from "axios";

export default {
  name: "LoginLogin",
  components: {
    LoginForm,
    LogoImpacto,
  },
  data: () => ({
    loading: false,
    buttonText: "Entrar",

    error: "",

    valid: false,
    email: "",
    senha: "",

    emailRules: [
      (value) => {
        if (value) return true;

        return "Insira um usuário.";
      },
    ],
    senhaRules: [
      (value) => {
        if (value) return true;

        return "Insira sua senha.";
      },
    ],
  }),

  mounted() {
    this.verificaLogin();
  },

  methods: {
    verificaLogin() {
  const dataToken = localStorage.getItem("token");

  if (!dataToken) {
    console.log('O localStorage está vazio ou o item "token" não está definido.');
    this.$router.push("/login");
    return;
  }

  const data = { token: dataToken };

  axios.post("https://ta-back.onrender.com/alunos/verificaToken", data)
    .then((response) => {
      if (response.status === 200) {
        // Token é válido
        this.$router.push("/welcome");
      }
    })
    .catch((error) => {
      console.error('Erro na verificação do token:', error.response?.status || error.message);
      localStorage.removeItem("token");
      this.$router.push("/login");
    });
}
,

    submitForm() {
      this.buttonText = "Carregando...";
      this.loading = true;
      this.error = "";

      // Processamento do formulário
      const userData = {
        id: this.email,
        senha: this.senha,
      };

      this.login(userData)
        .then(() => {
          // Ação a ser executada após o login bem-sucedido
          console.log("Login bem-sucedido");
          this.$router.push("/welcome");
        })
        .catch((error) => {
          // Ação a ser executada se ocorrer um erro durante o login
          console.error("Erro no login:", error);
          this.error =
            "Usuário ou senha incorretos. Por favor, tente novamente.";
          this.loading = false;
          this.buttonText = "Entrar";

          setTimeout(() => {
            // Define loading para false para esconder o botão de carregamento
            this.error = "";
            // Aqui você pode adicionar lógica para tratar a resposta do backend
          }, 5000);
        });
    },
  },
};
</script>

<style scoped>
.main-div {
  width: 100%;
  height: 100vh; /* Use 100vh para garantir que cubra toda a altura da janela */
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo verticalmente */
  background: url("../assets/imgs/homeBackground.jpg") no-repeat center center;
  background-size: cover;
}

.logo-image-planoa {
  max-width: 200px;
  width: 100%;
  height: auto;
}

.full-height {
  height: 100vh; /* Ocupa toda a altura da tela */
}
</style>

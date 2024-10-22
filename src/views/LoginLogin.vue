<template>
  <v-container class="main-div fill-height" fluid>
    <v-row class="fill-height d-flex justify-center align-center">
      <!-- Coluna invisível -->
      <v-col cols="3" sm="2" md="3"> </v-col>

      <!-- Coluna de conteudo -->
      <v-col cols="8" sm="8" md="6">
        <v-sheet class="rounded-lg elevation-4 pa-4 pb-10">
          <v-row class="d-flex justify-center">
            <v-col cols="10" md="8" sm="9">
              <div class="d-flex justify-center">
                <v-img
                  src="../assets/imgs/Logo-PlanoA-removebg.png"
                  contain
                  max-width="250"
                  aspect-ratio="16/9"
                ></v-img>
              </div>

              <div class="text-h2 text-md-h4 text-sm-h4 text-xs-h5 d-flex mb-2">
                Login
              </div>

              <v-form v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  variant="outlined"
                  bg-color="white"
                  color="#1E3892"
                  prepend-inner-icon="mdi-account"
                >
                </v-text-field>

                <v-text-field
                  v-model="senha"
                  :rules="senhaRules"
                  variant="outlined"
                  bg-color="white"
                  color="#1E3892"
                  prepend-inner-icon="mdi-lock-outline"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibility"
                >
                </v-text-field>

                <div class="d-flex justify-center">
                  <v-btn
                    type="submit"
                    variant="flat"
                    color="#1E3892"
                    :loading="loading"
                    elevation="2"
                    width="200"
                    max-width="200"
                    size="large"
                  >
                    {{ buttonText }}
                  </v-btn>
                </div>

                <v-alert v-if="error" type="error" class="mt-4">{{
                  error
                }}</v-alert>
              </v-form>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col
        cols="3"
        sm="2"
        md="3"
        class="fill-height d-flex justify-end align-end"
      >
        <v-img
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
import LogoImpacto from "@/components/LogoImpacto.vue";
import axios from "axios";
import { verificaLogin } from "@/utils/helpers";

export default {
  name: "LoginLogin",
  components: {
    LogoImpacto,
  },
  data: () => ({
    loading: false,
    buttonText: "Entrar",

    error: "",

    valid: false,
    email: "",
    senha: "",
    showPassword: false,

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

 created() {
    verificaLogin(this.$router, this.$route);
  },

  methods: {
    // Alterna entre mostrar e ocultar a senha
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Envia os dados para o login
    submitForm() {
      this.setLoadingState(true, "Carregando...");
      this.clearError(); // Limpa a mensagem de erro ao iniciar o login

      const userData = {
        id: this.email,
        senha: this.senha,
      };

      axios({
        url: "https://ta-back.onrender.com/generalMethods/login",
        data: userData,
        method: "POST",
      })
        .then((response) => {
          const type = response.data.type;

          if (type === "aluno") {
            const token = response.data.token;
            const id = response.data.id;
            const anoAtual = response.data.anoAtual;
            const idTurma = response.data.idTurma;
            const estratoInicial = response.data.estratoInicial;

            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            localStorage.setItem("anoAtual", anoAtual);
            localStorage.setItem("idTurma", idTurma);
            localStorage.setItem("estratoInicial", estratoInicial);
            localStorage.setItem("type", type);

            this.clearError();
            this.$router.push("/welcome");
          }

          if (type === "prof") {
            const tokenProf = response.data.tokenProf;
            const idProf = response.data.idProf;
            const admin = response.data.admin;

            localStorage.setItem("token", tokenProf);
            localStorage.setItem("idProf", idProf);
            localStorage.setItem("type", type);
            localStorage.setItem("admin", admin)

            this.clearError();
            this.$router.push("/turma");
          }

          if (type === "dir" || type === "coord" || type === "admin") {
            localStorage.setItem("type", type);

            this.clearError();
            this.$router.push("/turma");
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          console.error("Erro no login:", error);
          this.error =
            "Usuário ou senha incorretos. Por favor, tente novamente.";
        })
        .finally(() => {
          this.loading = false;
          this.buttonText = "Entrar";

          // Não há necessidade de setTimeout para limpar a mensagem de erro aqui
        });
    },

    // Método auxiliar de login, muda a animação de botão
    setLoadingState(isLoading, buttonText) {
      this.loading = isLoading;
      this.buttonText = buttonText;
    },

    // Método auxiliar de login, muda a animação de botão
    clearError() {
      this.error = "";
    },

    // Método auxiliar de login, muda a animação de botão
    handleLoginError(error) {
      console.error("Erro no login:", error);
      this.error = "Usuário ou senha incorretos. Por favor, tente novamente.";
      this.setLoadingState(false, "Entrar");

      setTimeout(() => {
        this.clearError();
        // Adicionar lógica adicional para tratar a resposta do backend aqui
      }, 5000);
    },
  },
};
</script>

<style scoped>
.main-div {
  background: url("../assets/imgs/homeBackground.jpg") no-repeat center center;
  background-size: cover;
}
</style>

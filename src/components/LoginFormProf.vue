<template>
  <v-container class="fill-height teste">
    <v-sheet
      class="d-flex align-center justify-center flex-column text-center mx-auto px-4 rounded-lg"
      elevation="10"
      rounded-shaped
      color="grey-lighten-5"
      width="55vw"
      height="70vh"
      border="md"
    >
      <LogoPlanoA class="logo-planoA" />
      <v-container style="max-width: 32vw" class="form-container">
        <v-container class="d-flex">
          <h1 class="text-login">Login</h1>
        </v-container>

        <v-form
          v-model="valid"
          class="w-40 main-form"
          @submit.prevent="submitForm"
        >
          <v-container class="">
            <v-text-field
              dense
              class="form-field aluno-field"
              v-model="email"
              :rules="emailRules"
              label="Email"
              variant="outlined"
              bg-color="white"
              color="#1E3892"
              prepend-inner-icon="mdi-account"
            >
            </v-text-field>

            <v-text-field
              dense
              class="form-field senha-field"
              v-model="senha"
              :rules="senhaRules"
              label="Senha"
              variant="outlined"
              bg-color="white"
              color="#1E3892"
              type=""
              prepend-inner-icon="mdi-lock-outline"
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

          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        </v-form>

        <v-divider class="my-4"></v-divider>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import LogoPlanoA from "./LogoPlanoA.vue";
import axios from "axios";

export default {
  name: "LoginForm",
  components: {
    LogoPlanoA,
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

  methods: {
    submitForm() {
      this.buttonText = "Carregando...";
      this.loading = true;
      this.error = "";

      const userData = {
        email: this.email,
        senha: this.senha,
      };

      axios({
        url: "https://ta-back.onrender.com/professores/login",
        data: userData,
        method: "POST",
      })
        .then((response) => {
          
          const token = response.data.token;
          const id = response.data.id;
          const tokenProf = response.data.tokenProf;
          const idProf = response.data.idProf;
          const type = response.data.type;

          if (type == "admin") {

            localStorage.setItem("tokenAdmin", token);
            localStorage.setItem("idAdmin", id);
            localStorage.setItem("type", type);

            axios.defaults.headers.common["Authorization"] = token;
            console.log("Login de admin bem-sucedido");
            this.$router.push("/admin");

          } else {

            localStorage.setItem("tokenProf", tokenProf);
            localStorage.setItem("idProf", idProf);
            localStorage.setItem("type", type);

            axios.defaults.headers.common["Authorization"] = tokenProf;

            console.log("Login bem-sucedido");
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

@media (max-width: 1600px) {
  .logo-planoA {
    width: 16vw;
  }

  .text-login {
    font-size: 1.5rem !important;
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
    height: 5.3vh !important;
    font-size: 0.8rem !important;
    border-radius: 2px !important;
  }

  .v-input__control {
    height: 8vh !important;
    width: 27vw !important;
  }

  .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }
}
</style>

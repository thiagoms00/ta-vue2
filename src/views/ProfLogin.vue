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

              <div class="text-md-h3 text-sm-h4 text-xs-h5 d-flex mb-10">
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

                <v-alert v-if="showAlert" color="red-darken-1" type="error" class="mt-4">
                  {{ error }}
                </v-alert>

                <v-progress-linear
                  v-if="showAlert"
                  :model-value="progress"
                  height="10"
                  color="red-darken-1"
                  class="mt-2"
                  striped
                ></v-progress-linear>
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

export default {
  name: "Login",
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
    showAlert: false,
    progress: 100,

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
    verificaLogin(){
      const dataTokenProf = localStorage.getItem("tokenProf");
      const dataTokenAdmin = localStorage.getItem("tokenAdmin");
      let data = null

      if (dataTokenProf != null && dataTokenAdmin == null) {
        data = { 
          token: dataTokenProf,
          type: localStorage.getItem("type")
        };
      }
      else if(dataTokenProf == null && dataTokenAdmin != null){
        data = { 
          token: dataTokenAdmin,
          type: localStorage.getItem("type")
        };
        
      }

      if(dataTokenProf != null || dataTokenAdmin != null){
        axios({
          url: "https://ta-back.onrender.com/generalMethods/verificaToken",
          data,
          method: "POST",
        })
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              if(localStorage.getItem("type") === "prof"){
                this.$router.push("/turma");  
              }
              else if(localStorage.getItem("type") === "admin"){
                this.$router.push("/admin");
              }
            }
          })
          .catch((error) => {
            // Tratar erros aqui
            localStorage.removeItem("tokenProf");
            this.$router.push("/proflogin");
            console.error(error);
          });
      }
      else{
        console.log("Não há token pré-salvos nesta sessão.")
      }
      
      
        
    },

    submitForm() {
      this.buttonText = "Carregando...";
      this.loading = true;
      this.error = "";

      const userData = {
        email: this.email,
        senha: this.senha,
      };

      axios({
        url: "https://ta-back.onrender.com/generalMethods/login",
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

          } else if(type == "prof"){
            localStorage.setItem("tokenProf", tokenProf);
            localStorage.setItem("idProf", idProf);
            localStorage.setItem("type", type);

            axios.defaults.headers.common["Authorization"] = tokenProf;
            console.log("Login de prof bem-sucedido");
            this.$router.push("/turma");
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          console.error("Erro no login:", error);
          this.showAlert = true;
          this.error =
            "Usuário ou senha incorretos. Por favor, tente novamente.";
          this.startProgress();
        })
        .finally(() => {
          this.loading = false;
          this.buttonText = "Entrar";

          setTimeout(() => {
            this.showAlert = false;
            this.error = "";
          }, 7000);
        });
    },

    // Animação de erro de login ou senha
    startProgress() {
      const duration = 7000; 
      const intervalTime = 100; 
      const decrement = 100 / (duration / intervalTime); 

      const interval = setInterval(() => {
        if (this.progress <= 0) {
          clearInterval(interval); 
          this.progress = 100;
        } else {
          this.progress -= decrement;
        }
      }, intervalTime);
    },

    // Permite visualizar ou não senha
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style>
.main-div {
  background: url("../assets/imgs/homeBackground.jpg");
  background-size: cover;
}
</style>

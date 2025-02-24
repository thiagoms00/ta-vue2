import { createStore } from "vuex";
import axios from "axios";
import turma from "./turma";

export default createStore({
  modules: {
    turma,
  },
  state: {
    token: localStorage.getItem("token") || "",
    status: "",
  },
  getters: {},
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {

    verificarTokenProfs({ commit }, { router }) {
      const type = localStorage.getItem("type");
      let urlAdd = "";
      if (type === "coord") {
        urlAdd = "https://ta-back.onrender.com/coordenadores/verificaToken";
      } else if (type === "dir") {
        urlAdd = "https://ta-back.onrender.com/diretores/verificaToken";
      } else {
        urlAdd = "https://ta-back.onrender.com/professores/verificaToken";
      }

      const data = {
        token: localStorage.getItem("tokenProf"),
      };
      return axios({ url: urlAdd, data, method: "POST" })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            // Token é válido
            commit("auth_success", response.data);
          } else {
            // Token não é válido, você pode remover o token do localStorage e redirecionar para o login.
            localStorage.removeItem("tokenProf");
            this.$router.push("/proflogin");
          }
        })
        .catch((error) => {
          // Tratar erros aqui
          localStorage.removeItem("tokenProf");
          router.push("/proflogin");
          console.error(error);
        });
    },
  },
});

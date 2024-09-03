import { createStore } from "vuex";
import axios from 'axios';


export default createStore({
    state:{
        token: localStorage.getItem('token') || '',
        status: '',
    },
    getters:{

    },
    mutations:{
        auth_request(state) {
            state.status = 'loading';
          },
          auth_success(state, token) {
            state.status = 'success';
            state.token = token;
          },
          auth_error(state) {
            state.status = 'error';
          },
          logout(state) {
            state.status = '';
            state.token = '';
          },
    },
    actions:{

        login({commit}, user){
            
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: 'https://ta-back.onrender.com/alunos/login', data: user, method: 'POST' })
                  .then((response) => {
                    const token = response.data.token;
                    const id = response.data.id;
                    const anoAtual = response.data.anoAtual;
                    const idTurma = response.data.idTurma;
                    const estratoInicial = response.data.estratoInicial;

                    localStorage.setItem('token', token);
                    localStorage.setItem('id', id)
                    localStorage.setItem('anoAtual', anoAtual);
                    localStorage.setItem('idTurma', idTurma);
                    localStorage.setItem('estratoInicial', estratoInicial);


                    axios.defaults.headers.common['Authorization'] = token;
                    commit('auth_success', token);
                    resolve(response);
                  })
                  .catch((error) => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(error);
                  });
              });
        },

        verificarToken({ commit }, {router} ){

          const data = {
            token : localStorage.getItem('token')
          };

          return axios({ url: 'https://ta-back.onrender.com/alunos/verificaToken', data, method: 'POST' })
          .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
              // Token é válido
              commit('auth_success', response.data);
            }
            else {
              // Token não é válido, você pode remover o token do localStorage e redirecionar para o login.
              localStorage.removeItem('token');
              this.$router.push('/login');
            }
          })
          .catch((error) => {
            // Tratar erros aqui
            localStorage.removeItem('token');
            router.push('/login');
            console.error(error);
          });

        },

        verificarTokenProfs({ commit }, {router} ){

          const data = {
            token : localStorage.getItem('tokenProf')
          };

          return axios({ url: 'https://ta-back.onrender.com/professores/verificaToken', data, method: 'POST' })
          .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
              // Token é válido
              commit('auth_success', response.data);
            }
            else {
              // Token não é válido, você pode remover o token do localStorage e redirecionar para o login.
              localStorage.removeItem('tokenProf');
              this.$router.push('/proflogin');
            }
          })
          .catch((error) => {
            // Tratar erros aqui
            localStorage.removeItem('tokenProf');
            router.push('/proflogin');
            console.error(error);
          });

        },


    }
})
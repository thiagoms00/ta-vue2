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
                axios({ url: 'https://ta-back.onrender.com/login', data: user, method: 'POST' })
                  .then((response) => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
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
        }

    }
})
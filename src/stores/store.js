
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    personas: []
  },
  mutations: {
    SET_PERSONAS(state, personas) {
      state.personas = personas;
    }
  },
  actions: {
    fetchPersonas({ commit }) {
      axios.get('http://localhost:3000/api/persona/')
        .then(response => {
          commit('SET_PERSONAS', response.data);
        })
        .catch(error => {
          console.error("Error fetching personas:", error);
        });
    }
  },
  getters: {
    personas: state => state.personas
  }
});
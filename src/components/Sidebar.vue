<template>
  <v-navigation-drawer app>
    <v-list density="compact" class="sidebar">
      <v-list-item class="logo-container">
        <v-list-item-title>LOGO SPACE</v-list-item-title>
      </v-list-item>

      <v-list-group :disabled="loadingGlobal">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" style="color: white !important">
            <template v-slot:prepend>
              <v-icon style="opacity: 0.6; color: white !important">
                mdi-school
              </v-icon>
            </template>
            <v-list-item-title style="color: white !important">
              Turma
              <v-progress-circular
                v-if="loadingGlobal"
                indeterminate
                size="20"
                width="2"
                color="white"
                class="ml-2"
              ></v-progress-circular>
            </v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item
          v-for="(turma, index) in turmas"
          :key="index"
          class="submenu-item"
          style="color: white !important"
          @click="selecionaTurma(turma, index)"
        >
          <v-list-item-title style="color: white !important">
            {{ turma.nome }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.route"
        color="primary"
        class="menu-item"
        :class="{ 'active-item': $route.path === item.route }"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      turmas: [],
      menuItems: [
        { title: "Estágios de aprendizado", icon: "mdi-book-open-variant", route: "/estagios" },
        { title: "Fases do teste", icon: "mdi-timer", route: "/fases" },
        { title: "Dados gerais", icon: "mdi-chart-bar", route: "/dados" },
        { title: "Panorama da turma", icon: "mdi-view-dashboard", route: "/panorama" },
      ],
      loadingGlobal: false,
      loadingStatesTurmas: [],
      turmaSelecionada: null,
    };
  },

  created() {
    this.returnTurmas();
  },

  computed: {
    ...mapState("turma", ["turmaAtiva"]),
  },

  methods: {
    returnTurmas() {
      const data = { tokenProf: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2YzYUBnbWFpbC5jb20iLCJzZW5oYSI6InNlbmhhM2EifQ.XvcvVQGS9rFLHnldsDynsZ2BWGQND03yd3gzlIRJosI" };
      
      this.loadingGlobal = true;
      let url = "https://ta-back.onrender.com/professores/returnTurmas"
      
      axios.post(url, data)
        .then(response => {
          this.turmas = response.data.listaTurmas;
          this.loadingStatesTurmas = Array(this.turmas.length).fill(false);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.loadingGlobal = false;
        });
    },
    
    selecionaTurma(turma, index) {
      if (this.loadingGlobal) return;

      this.loadingStatesTurmas[index] = true;
      this.loadingGlobal = true;

      const data = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2YzYUBnbWFpbC5jb20iLCJzZW5oYSI6InNlbmhhM2EifQ.XvcvVQGS9rFLHnldsDynsZ2BWGQND03yd3gzlIRJosI",
        idTurma: turma.id,
        idProfessor: "66e389aa2636b0ecb8ab4b73",
      };

      let url = "https://ta-back.onrender.com/professores/dadosTurma";

      axios
        .post(url, data)
        .then((response) => {
          console.log("Dados da turma carregados:", response.data);
          this.setTurmaAtiva(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar dados da turma:", error);
        })
        .finally(() => {
          this.loadingStatesTurmas[index] = false;
          this.loadingGlobal = false;
        });
    },

    ...mapMutations("turma", ["setTurmaAtiva"]),
  },
};
</script>

<style scoped>
.sidebar {
  background: linear-gradient(to bottom, #2c2f4e, #343856, #3a3e66);
  height: 100%;
}

.logo-container {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background: linear-gradient(to bottom, #2c2f4e, #343856);
}

.menu-item, .submenu-item {
  color: white;
}

.menu-item:hover, .submenu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.active-item {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border-radius: 4px;
}

.v-list-item--active {
  color: white !important;
}
</style>

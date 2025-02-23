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

  methods: {
    returnTurmas() {
      const type = localStorage.getItem("type");
      const data = { tokenProf: localStorage.getItem("tokenProf") };
      
      this.loadingGlobal = true;
      let url = type === "coord" ? "https://ta-back.onrender.com/coordenadores/retorna_turmas" :
                type === "dir" ? "https://ta-back.onrender.com/diretores/retorna_turmas" :
                "https://ta-back.onrender.com/professores/returnTurmas";
      
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
      this.turmaSelecionada = turma.id;
      
      const data = {
        token: localStorage.getItem("tokenProf"),
        idTurma: turma.id,
        idProfessor: localStorage.getItem("idProf"),
      };
      
      const type = localStorage.getItem("type");
      let url = type === "coord" ? "https://ta-back.onrender.com/coordenadores/dadosTurma" :
                type === "dir" ? "https://ta-back.onrender.com/diretores/dadosTurma" :
                "https://ta-back.onrender.com/professores/dadosTurma";
      
      axios.post(url, data)
        .then(response => {
          console.log("Dados da turma carregados:", response.data);
        })
        .catch(error => {
          console.error("Erro ao carregar dados da turma:", error);
        })
        .finally(() => {
          this.loadingStatesTurmas[index] = false;
          this.loadingGlobal = false;
        });
    },
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

<template>
    <v-navigation-drawer app>
      <v-list density="compact" class="sidebar" >
        <!-- Espaço para o logo dentro do v-list -->
        <v-list-item class="logo-container">
          <v-list-item-title>LOGO SPACE</v-list-item-title>
        </v-list-item>
  
        <!-- Turma - Item com submenu -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" color="primary">
              <template v-slot:prepend>
                <v-icon>mdi-school</v-icon>
              </template>
              <v-list-item-title>Turma</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(turma, index) in turmas"
            :key="index"
            :to="turma.route"
            color="primary"
            class="submenu-item"
          >
            <v-list-item-title>{{ turma.nome }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-divider :thickness="8" color="white"></v-divider>
  
        <!-- Outros itens do menu -->
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
  export default {
    data() {
      return {
        turmas: [
          { nome: "Turma A", route: "/turma/a" },
          { nome: "Turma B", route: "/turma/b" },
          { nome: "Turma C", route: "/turma/c" },
        ],
        menuItems: [
          { title: "Estágios de aprendizado", icon: "mdi-book-open-variant", route: "/estagios" },
          { title: "Fases do teste", icon: "mdi-timer", route: "/fases" },
          { title: "Dados gerais", icon: "mdi-chart-bar", route: "/dados" },
          { title: "Panorama da turma", icon: "mdi-view-dashboard", route: "/panorama" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Gradiente invertido */
  .sidebar {
    background: linear-gradient(to bottom, #2c2f4e, #343856, #3a3e66);
    height: 100%;
  }
  
  /* Logo dentro do v-list */
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
  
  /* Itens do menu */
  .menu-item,
  .submenu-item {
    color: white;
  }
  
  /* Hover */
  .menu-item:hover,
  .submenu-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* Efeito "vidro fosco" no item selecionado */
  .active-item {
    background: rgba(255, 255, 255, 0.2) !important;
    color: white !important; /* Mantém o texto branco */
    border-radius: 4px;
  }
  
  /* Evita mudança de cor ao selecionar */
  .v-list-item--active {
    color: white !important;
  }
  </style>
  
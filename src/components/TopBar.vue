<template>
    <v-app-bar app class="top-bar">
      <!-- Três tracinhos (menu lateral) -->
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
  
      <v-spacer></v-spacer>
  
      <!-- Ícones do lado direito -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  
      <v-btn icon>
        <v-icon>mdi-message-text</v-icon>
      </v-btn>
  
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
  
      <!-- Foto do usuário e nome -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="user-btn">
            <v-avatar size="40">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
            </v-avatar>
            <span class="user-name">João Silva</span>
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Barra superior */
  .top-bar {
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 0 16px;
  }
  
  /* Ícones */
  .v-btn {
    color: black;
  }
  
  /* Estilização do usuário */
  .user-btn {
    display: flex;
    align-items: center;
    color: black;
    text-transform: none;
  }
  
  .user-name {
    margin-left: 8px;
    font-weight: bold;
  }
  </style>
  
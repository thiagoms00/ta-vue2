<template>
  <v-app-bar app class="top-bar" elevation="0">
    <v-btn icon>
      <v-icon class="btn-icon-color">mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon class="btn-icon-color">mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon class="btn-icon-color">mdi-message-text</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon class="btn-icon-color">mdi-bell</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="user-btn">
          <v-avatar size="40">
            <img
              class="avatar-img"
              src="https://cdn-icons-png.flaticon.com/512/10438/10438143.png"
              alt="User"
            />
          </v-avatar>

          <span class="user-name">Ana Luiza</span>
          <v-icon class="dropdown-icon">mdi-chevron-down</v-icon>
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

.dropdown-icon {
  font-size: 18px;
  transition: transform 0.2s ease-in-out;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.btn-icon-color {
  color: rgba(52, 56, 86, 0.6);
}

.top-bar {
  background-color: white;
}

.user-btn {
  display: flex;
  align-items: center;
  color: black;
  text-transform: none;
  gap: 8px;
}

.user-name {
  margin-left: 8px;
  font-weight: bold;
  color: rgba(52, 56, 86, 0.6);
}
</style>

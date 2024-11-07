<template>
  <v-app id="inspire">
    <NavBar />

    <v-main class="bg-blue-grey-lighten-5">
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-row>
              <v-col cols="2" style="min-width: 270px">
                <div>
                  <v-sheet class="elevation-2 rounded-lg d-flex flex-column py-4">
                    <!-- AVATAR -->
                    <div class="d-flex justify-center">
                      <v-avatar color="grey" rounded="0" size="100">
                        <v-img
                          src="https://thumbs.dreamstime.com/b/light-blue-outline-user-avatar-flat-icon-light-blue-outline-user-avatar-flat-icon-isolated-white-background-vector-illustration-250739962.jpg"
                          cover></v-img>
                      </v-avatar>
                    </div>

                    <div class="d-flex justify-center">
                      <p class="font-weight-bold">Nome Sobrenome</p>
                    </div>

                    <div class="d-flex justify-center">
                      <p class="font-weight-medium">ADMIN</p>
                    </div>
                  </v-sheet>
                </div>

                <v-sheet class="custom-switch mt-4 elevation-2 d-flex justify-center align-center" rounded="lg">
                  <v-tabs v-model="tab" color="primary" direction="vertical" style="width: 100%">
                    <v-tab value="option-1" class="pl-4 d-flex justify-start" prepend-icon="mdi-town-hall">
                      <span>Escolas</span>
                    </v-tab>

                    <v-tab prepend-icon="mdi-database-outline" value="option-2" class="pl-4 d-flex justify-start">
                      <span>Banco de Itens</span>
                    </v-tab>

                    <v-tab prepend-icon="mdi-note-plus-outline" value="option-4" class="pl-4 d-flex justify-start">
                      <span>Adicionar Itens</span>
                    </v-tab>

                    <v-tab prepend-icon="mdi-account-clock-outline" value="option-3" class="pl-4 d-flex justify-start">
                      <span>Logs de Login</span>
                    </v-tab>
                    <!-- <v-tab
                  prepend-icon="mdi-remote-desktop"
                  text="Compara"
                  value="option-5"
                  class="pa-1 d-flex justify-center"
                ></v-tab> -->
                    <!-- <v-tab
                      prepend-icon="mdi-cog"
                      value="option-6"
                      class="pl-4 d-flex justify-start"
                    >
                      <span>Configurações</span>
                      <v-tooltip
                        activator="parent"
                        :open-delay="0"
                        :close-delay="0"
                        transition="fade-transition"
                      >
                        Configurações da turma
                      </v-tooltip>
                    </v-tab> -->
                  </v-tabs>
                </v-sheet>
              </v-col>

              <v-col>
                <!-- MENSAGEM DE SELEÇÂO DE TURMA -->
                <div>
                  <v-sheet class="rounded-lg d-flex  elevation-4" color="grey-lighten-5" min-height="500">
                    <v-window v-model="tab" class="w-100">
                      <!-- Janela de Dados 1 -->
                      <v-window-item value="option-1">
                        <Escolas />
                      </v-window-item>

                      <!-- Janela de Dados 2 -->
                      <v-window-item value="option-2">
                        <TurmaItensInfo ref="turmaDataInfo">
                        </TurmaItensInfo>
                      </v-window-item>

                      <!-- Janela de Dados 3 -->

                      <v-window-item value="option-3">
                        TELA 3
                      </v-window-item>
                    </v-window>

                  </v-sheet>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import * as XLSX from "xlsx";
import Escolas from "@/components/Escolas.vue";
import TurmaItensInfo from "@/components/TurmaItensInfo.vue";


export default {
  name: "Turma",
  components: {
    Escolas,
    TurmaItensInfo,
    NavBar,

  },

  data: () => ({
    tab: "option-1",
  }),

  created() { },

  methods: {},
  // FIM DO METHODSSSSSSS

  computed: {},
};
</script>

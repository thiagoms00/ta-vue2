<template>
  <v-app id="inspire">
    <NavBar />

    <v-main class="bg-blue-grey-lighten-5">
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <v-col cols="12">
            <v-row>
              <v-col cols="2" style="min-width: 270px" class="ml-10">
                <div>
                  <v-sheet
                    class="elevation-2 rounded-lg d-flex flex-column pb-4"
                  >
                    <!-- AVATAR -->
                    <div class="d-flex justify-center">
                      <div class="avatar-color d-flex align-center justify-center rounded-t-lg">
                        <v-avatar color="grey" size="75" class="elevation-2 admin-avatar">
                         <v-img 
                          src="https://thumbs.dreamstime.com/b/light-blue-outline-user-avatar-flat-icon-light-blue-outline-user-avatar-flat-icon-isolated-white-background-vector-illustration-250739962.jpg"
                          cover
                        ></v-img> 

                      </v-avatar>
                      </div>
                      
                    </div>

                    <div class="d-flex justify-center">
                      <p class="text-profile text-name">João da Silva</p>
                    </div>

                    <div class="d-flex justify-center">
                      <p class="text-profile text-function">Administrador</p>
                    </div>
                  </v-sheet>
                </div>

                <v-sheet
                  class="custom-switch mt-5 elevation-2 d-flex justify-center align-center"
                  rounded="lg"
                  v-if="layer!='turmaselecionado'"
                >
                  <v-tabs class="py-2"
                    v-model="tab"
                    color="primary"
                    direction="vertical"
                    style="width: 100%"
                  >
                    <v-tab
                      value="option-1"
                      class="pl-5 d-flex justify-start"
                      prepend-icon="mdi-town-hall"
                    >
                      <span class="menu-option">Escolas</span>
                    </v-tab>

                   <!--  <v-tab
                      prepend-icon="mdi-account-clock-outline"
                      value="option-3"
                      class="pl-5 d-flex justify-start"
                    >
                      <span class="menu-option">Logs de Login</span>
                    </v-tab> -->
                    <v-divider :thickness="8" color="blue"></v-divider>

                    <v-tab
                      prepend-icon="mdi-database-outline"
                      value="option-2"
                      class="pl-5 d-flex justify-start"
                    >
                      <span class="menu-option">Itens (percurso)</span>
                    </v-tab>
                    <v-tab
                      prepend-icon="mdi-database-outline"
                      value="option-4"
                      class="pl-5 d-flex justify-start"
                    >
                      <span class="menu-option">Itens (habilidades)</span>
                    </v-tab>
                    <v-tab
                      prepend-icon="mdi-note-plus-outline"
                      value="option-5"
                      class="pl-5 d-flex justify-start"
                    >
                      <span class="menu-option">Adicionar Itens</span>
                    </v-tab>
                  </v-tabs>
                </v-sheet>

                <!-- DIV DE SUBMENU DE UMA TURMA -->
                <div v-if="layer=='turmaselecionado'">
                  <v-sheet
                    class="custom-switch mt-4 elevation-2 d-flex justify-center align-center"
                    rounded="lg"
                  >
                    <v-tabs
                      v-model="tab_turma"
                      color="primary"
                      direction="vertical"
                      style="width: 100%"
                    >
                      <v-tab
                        value="option-1"
                        class="pl-4 d-flex justify-start"
                        prepend-icon="mdi-menu"
                      >
                        <span>Níveis de aprendizado</span>
                        <v-tooltip
                          activator="parent"
                          :open-delay="0"
                          :close-delay="0"
                          transition="fade-transition"
                        >
                          Níveis individual de cada aluno
                        </v-tooltip>
                      </v-tab>

                      <v-tab
                        prepend-icon="mdi-compass-outline"
                        value="option-2"
                        class="pl-4 d-flex justify-start"
                      >
                        <span>Sequência na avaliação</span>
                        <v-tooltip
                          activator="parent"
                          :open-delay="0"
                          :close-delay="0"
                          transition="fade-transition"
                        >
                          Trajeto de habilidades do aluno no último teste
                        </v-tooltip>
                      </v-tab>

                      <v-tab
                        prepend-icon="mdi-checkbox-outline"
                        value="option-3"
                        class="pl-4 d-flex justify-start"
                      >
                        <span>Dados gerais</span>
                        <v-tooltip
                          activator="parent"
                          :open-delay="0"
                          :close-delay="0"
                          transition="fade-transition"
                        >
                          Dados individuais de cada aluno
                        </v-tooltip>
                      </v-tab>

                      <v-divider
                        :thickness="5"
                        color="#4f5263"
                        class="border-opacity-25"
                      ></v-divider>

                      <v-tab
                        prepend-icon="mdi-chart-bar"
                        value="option-4"
                        class="pl-4 d-flex justify-start"
                      >
                        <span>Panorama da Turma</span>
                        <v-tooltip
                          activator="parent"
                          :open-delay="0"
                          :close-delay="0"
                          transition="fade-transition"
                        >
                          Um resumo que enfatiza uma visão geral e integrada da
                          turma
                        </v-tooltip>
                      </v-tab>

                    </v-tabs>
                  </v-sheet>
                  <!-- Campo de busca de aluno -->

                  <v-text-field
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Buscar aluno"
                    variant="solo"
                    v-model="search"
                    class="custom-border buscar-field mt-4"
                    style="width: 100%"
                  >
                  </v-text-field>
                </div>
              </v-col>

              <v-col cols="9">
                <!-- MENSAGEM DE SELEÇÂO DE TURMA -->
                <div>
                  <v-sheet
                    class="rounded-lg d-flex elevation-4"
                    color="grey-lighten-5"
                  >
                    <v-window v-model="tab" class="w-100">
                      <!-- Janela de Dados 1 -->
                      <v-window-item value="option-1">
                        <Escolas @levelAplicationValue="levelAplicationValue" 
                        :tab_turma="tab_turma"
                        :search="search"/>
                      </v-window-item>

                      <!-- Janela de Dados 2 -->
                      <v-window-item value="option-2">
                        <TurmaItensInfo ref="turmaItensInfo"> </TurmaItensInfo>
                      </v-window-item>

                      <!-- Janela de Dados 3 -->

                      <v-window-item value="option-3"> TELA 3 </v-window-item>

                      <!-- Janela de Dados 4 -->

                      <v-window-item value="option-4">
                        <TurmaItensHab ref="turmaHabInfo"> </TurmaItensHab>
                      </v-window-item>

                      <!-- Janela de Dados 5 -->

                      <v-window-item value="option-5">
                        <AdminAddItem ref="AdminAddItem"></AdminAddItem>
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
import TurmaItensHab from "@/components/TurmaItensHab.vue";
import AdminAddItem from "@/components/AdminAddItem.vue";

export default {
  name: "Turma",
  components: {
    Escolas,
    TurmaItensInfo,
    NavBar,
    TurmaItensHab,
    AdminAddItem,
  },

  data: () => ({
    tab_turma: "option1",
    tab: "option-1",
    layer: false,
    menuBanco: ["Percursos", "Habilidades"],
    search: "",
  }),

  created() {

  },

  methods: {
    levelAplicationValue(layer) {
      this.layer = layer;
      console.log(this.layer)
    },
  },
  // FIM DO METHODSSSSSSS

  computed: {},
};
</script>

<style>
.borda-diagonal {
  border-radius: 16px 0 16px 0 !important;
  /* Bordas diagonais arredondadas */
}

.degrade {
  background: linear-gradient(
    to bottom right,
    #e3f2fd,
    /* Azul bem claro no canto superior esquerdo */ #cfd8dc
      /* Cinza claro no canto inferior direito */
  );
}

.text-profile {
  font-family: "Urbanist-Regular";
}

.avatar-color{
  width: 100%;
  align-items: center;
  overflow: hidden;
  height: 11vh;
  background: linear-gradient(to bottom, #1E3892 58%, transparent 50%);
}

.admin-avatar{
  margin-top: 1vh;
  border: 1px solid #fff;
}

.text-name {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 1.2vh;
}

.text-profile {
  font-size: 1.3rem;
}

.text-function{
  font-size: 0.92rem;
  font-style: italic;
}



</style>

<template>
  <v-app id="inspire">
    <NavBar :admin="adminVer" />

    <v-main class="bg-blue-grey-lighten-5">
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-row>
              <v-col cols="2" style="min-width: 270px">
                <div>
                  <v-sheet
                    class="elevation-2 rounded-lg d-flex flex-column py-4"
                  >
                    <!-- AVATAR -->
                    <div class="d-flex justify-center">
                      <v-avatar color="grey" rounded="0" size="100">
                        <v-img
                          src="https://thumbs.dreamstime.com/b/light-blue-outline-user-avatar-flat-icon-light-blue-outline-user-avatar-flat-icon-isolated-white-background-vector-illustration-250739962.jpg"
                          cover
                        ></v-img>
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

                <v-sheet
                  class="custom-switch mt-4 elevation-2 d-flex justify-center align-center"
                  rounded="lg"
                >
                  <v-tabs
                    v-model="tab"
                    color="primary"
                    direction="vertical"
                    style="width: 100%"
                  >
                    <v-tab
                      @click="changeItens(false)"
                      value="option-1"
                      class="pl-4 d-flex justify-start"
                      prepend-icon="mdi-town-hall"
                    >
                      <span>Escolas</span>
                    </v-tab>

                    <v-tab
                      @click="changeItens(true)"
                      prepend-icon="mdi-database-outline"
                      value="option-7"
                      class="pl-4 d-flex justify-start"
                    >
                      <span>Banco de Itens</span>
                    </v-tab>

                    <v-tab
                      @click="changeItens(false)"
                      prepend-icon="mdi-account-clock-outline"
                      value="option-4"
                      class="pl-4 d-flex justify-start"
                    >
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
                <!-- Campo de busca de aluno -->
              </v-col>

              <v-col>
                <!-- MENSAGEM DE SELEÇÂO DE TURMA -->
                <div>
                  <v-sheet
                    v-if="!controlOptions && !controlItens"
                    class="rounded-lg d-flex pa-4 elevation-4"
                    color="grey-lighten-5"
                    height="500"
                  >
                    <div class="d-flex flex-column w-100" >
                      <p
                        class="text-overline mt-16 d-flex justify-center"
                        style="
                          color: #cfd8dc;
                          font-size: 3rem !important;
                          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                        "
                      >
                        Selecione uma escola
                      </p>

                      <div class="mt-16">
                        <v-row>
                          <v-col
                            v-for="(escola, index) in escolas"
                            :key="index"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                          >
                            <v-sheet
                              elevation="3"
                              rounded="lg"
                              class="pa-4 d-flex flex-column align-center 
                              borda-diagonal degrade"
                            >
                              <v-avatar size="64" class="mb-2">
                                <v-icon large>mdi-school</v-icon>
                              </v-avatar>
                              <div class="text-center">{{ escola.nome }}</div>
                            </v-sheet>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </v-sheet>
                </div>

                <v-window v-model="tab">
                  <!-- Janela de Dados 1 -->
                  <v-window-item value="option-1" v-if="controlOptions">
                    <TurmaNiveisInfo
                      :listaDeAlunos="listaFiltrada"
                      :nomeTurma="nomeTurmaSelecionada"
                      ref="turmaVisualInfo"
                    />
                  </v-window-item>

                  <!-- Janela de Dados 2 -->
                  <v-window-item value="option-2" v-if="controlOptions">
                    <TurmaMapInfo
                      :listaDeAlunos="listaFiltrada"
                      :anoTurma="anoTurma"
                      :nomeTurma="nomeTurmaSelecionada"
                      ref="turmaMapInfo"
                    />
                  </v-window-item>

                  <!-- Janela de Dados 3 -->

                  <v-window-item value="option-3" v-if="controlOptions">
                    <TurmaDataInfo
                      :listaDeAlunos="listaFiltrada"
                      ref="turmaDataInfo"
                      @eventDeleteTest="excluirTeste"
                    />
                  </v-window-item>
                </v-window>
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
// import Chart from '@/components/Chart.vue'
import ChartBar from "@/components/ChartBar.vue";
import DialogExcluirTeste from "@/components/DialogExcluirTeste.vue";
import TurmaDataInfo from "@/components/TurmaDataInfo.vue";
import NavBar from "@/components/NavBar.vue";
import * as XLSX from "xlsx";
import TurmaMapInfo from "@/components/TurmaMapInfo.vue";
import TurmaNiveisInfo from "@/components/TurmaNiveisInfo.vue";
import TurmaGraphInfo from "@/components/TurmaGraphInfo.vue";
import TurmaConfig from "@/components/TurmaConfig.vue";
import TurmaCompara from "@/components/TurmaCompara.vue";
import TurmaItensInfo from "@/components/TurmaItensInfo.vue";
import { verificaLogin } from "@/utils/helpers";

export default {
  name: "Turma",
  components: {
    // Chart,
    ChartBar,
    NavBar,
    DialogExcluirTeste,
    TurmaDataInfo,
    TurmaMapInfo,
    TurmaNiveisInfo,
    TurmaGraphInfo,
    TurmaConfig,
    TurmaCompara,
    TurmaItensInfo,
  },

  data: () => ({
    tab: "option-1",
    habilidadesTurmaAtual: {},
    escolas: [
      { nome: "Escola A" },
      { nome: "Escola B" },
      { nome: "Escola C" },
      { nome: "Escola D" },
    ],
  }),

  created() {},

  methods: {},
  // FIM DO METHODSSSSSSS

  computed: {},
};
</script>

<style>
.borda-diagonal {
  border-radius: 16px 0 16px 0 !important; /* Bordas diagonais arredondadas */
}

.degrade {
  background: linear-gradient(
    to bottom right,
    #e3f2fd,   /* Azul bem claro no canto superior esquerdo */
    #cfd8dc    /* Cinza claro no canto inferior direito */
  );
}
</style>

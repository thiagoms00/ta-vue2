<template>
  <v-sheet class="rounded-t-lg">
    <v-expansion-panels :readonly="true">
      <v-expansion-panel
        class="rounded-t-lg"
        bg-color="#1E3892"
        style="border-radius: 0px"
      >
        <v-expansion-panel-title style="height: 4vh" disable-icon>
          <template v-slot:actions>
            <!-- Só pra retirar o ícone. -->
          </template>

          <v-row class="dflex align-center">
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                block
                :append-icon="icon[0]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(0, 'nome')"
                >Nome</v-btn
              >
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                block
                :append-icon="icon[1]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(1, 'extrato')"
                >Estrato Final</v-btn
              >
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                :append-icon="icon[2]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(2, 'nQuestoes')"
                >Nº de questões</v-btn
              >
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                block
                :append-icon="icon[3]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(3, 'percentTeste')"
                >Porcentagem</v-btn
              >
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                block
                :append-icon="icon[4]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(4, 'tempo')"
                >Tempo</v-btn
              >
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <v-btn
                block
                :append-icon="icon[4]"
                :ripple="false"
                variant="text"
                @click="toggleIcon(4, 'status')"
                >Status</v-btn
              >
            </v-col>
          </v-row>
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>

  <!-- Mensagem de Seleção de Turma -->
  <div>
    <v-sheet
      v-if="mostrarDiv"
      class="d-flex justify-center align-center rounded-b-lg"
      height="250"
      color="grey-lighten-5"
      border="md"
    >
      <p
        class="text-overline"
        style="
          color: #cfd8dc;
          font-size: 3rem !important;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        "
      >
        Selecione uma turma
      </p>
    </v-sheet>
  </div>

  <v-sheet
    v-if="!mostrarDiv"
    rounded="lg"
    class=""
    :class="{ 'fade-in': animacaoListaAtiva }"
  >
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(item, indexAluno) in listaDeAlunos"
        :key="item.nome"
        :readonly="item.nTestes === 0"
        ref="panels"
        class="rounded-b-lg"
        style="border-radius: 0px"
      >
        <v-expansion-panel-title style="height: 5vh" class="color-painel">
          <v-row class="d-flex align-center">
            <v-col cols="2" class="d-flex justify-center">
              <p
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                "
              >
                {{ item.user["nome"] }}
              </p>
            </v-col>

            <v-col cols="2" class="d-flex justify-center">
              {{
                item.listaDeTestes.length > 0 &&
                item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                  "Finalizado"
                  ? item.listaDeTestes[item.listaDeTestes.length - 1]
                      .resultado_final
                  : "-"
              }}
            </v-col>

            <v-col cols="2" class="d-flex justify-center">
              {{
                item.listaDeTestes.length > 0 &&
                item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                  "Finalizado"
                  ? item.listaDeTestes[item.listaDeTestes.length - 1]
                      .numero_questoes_feitas
                  : "-"
              }}
            </v-col>

            <v-col cols="2" class="d-flex justify-center">
              {{
                item.listaDeTestes.length > 0 &&
                item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                  "Finalizado"
                  ? (
                      item.listaDeTestes[item.listaDeTestes.length - 1]
                        .porcentagem_questoes || 0
                    ).toFixed(2) + "%"
                  : "-"
              }}
            </v-col>

            <v-col cols="2" class="d-flex justify-center">
              {{
                item.listaDeTestes.length > 0 &&
                item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                  "Finalizado"
                  ? formatTime(
                      item.listaDeTestes[item.listaDeTestes.length - 1]
                        .tempoDoTeste
                    )
                  : "-"
              }}
            </v-col>

            <v-col cols="2" class="d-flex justify-center">
              <v-chip
                size="small"
                :color="
                  getColor(
                    item.listaDeTestes?.[item.listaDeTestes.length - 1]
                      ?.status ?? ''
                  )
                "
              >
                <v-icon
                  :icon="
                    getIcon(
                      item.listaDeTestes?.[item.listaDeTestes.length - 1]
                        ?.status ?? 'Não Iniciado'
                    )
                  "
                  start
                >
                </v-icon>
                {{
                  item.listaDeTestes?.[item.listaDeTestes.length - 1]?.status ??
                  "Não Iniciado"
                }}
              </v-chip>
            </v-col>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text class="border-bottom-orange">
          <v-container>
            <v-card>
              <v-tabs v-model="tab" bg-color="orange">
                <v-tab value="dados">
                  <v-icon icon="mdi-account"></v-icon>
                  Dados
                </v-tab>

                <v-tab value="testes">
                  <v-icon icon="mdi-animation"></v-icon>
                  Testes
                </v-tab>
              </v-tabs>

              <v-window v-model="tab">
                <!-- Tela de dados gerais do aluno -->
                <v-window-item value="dados">
                  <v-container>
                    <div>
                      <span class="font-weight-bold">
                        {{ item.user["nome"] }}
                      </span>
                      de matrícula
                      <span class="font-weight-bold">
                        {{ item.user["mat"] }}
                      </span>
                    </div>

                    <v-row>
                      <v-col cols="6">
                        <ChartBar :data="item.listaDeHab['linguaPortuguesa']" />
                      </v-col>

                      <v-col cols="6" class="border-lg">
                        <v-list>
                          <v-list-item
                            v-for="(habilidade, index) in item.listaDeHab[
                              'linguaPortuguesa'
                            ]"
                            :key="index"
                          >
                            <span class="text-overline">
                              Habilidade {{ habilidade.habilidade }} -
                            </span>
                            <span class="text-caption">
                              {{ habilidade.porcentagemAcertos }} % em relação a
                              turma.
                            </span>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-window-item>

                <!-- Tela da lista de testes do aluno -->
                <v-window-item value="testes">
                  <v-card>
                    <v-table density="compact">
                      <thead>
                        <tr>
                          <th>Disciplina</th>
                          <th>Data</th>
                          <th>Estrato Final</th>
                          <th>Quest. Feitas</th>
                          <th>% de Acerto</th>
                          <!-- <th>
                        N. de Hab.
                      </th> -->
                          <th>Tempo do Teste</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(teste, indexTeste) in item.listaDeTestes"
                          :key="teste._id"
                        >
                          <td>{{ teste.disciplina }}</td>
                          <td>{{ getTableValue(teste, "horaInicio") }}</td>
                          <td>{{ getTableValue(teste, "extratoFinal") }}</td>
                          <td>
                            {{ getTableValue(teste, "numero_questoes_feitas") }}
                          </td>
                          <td>
                            {{
                              getTableValue(teste, "porcentagem_questoes", true)
                            }}
                          </td>
                          <!--<td>{{ getTableValue(teste, 'nDeHabilidades') }}</td>  -->
                          <td>
                            {{
                              getTableValue(teste, "tempoDoTeste", false, true)
                            }}
                          </td>
                          <td>
                            <v-chip
                              size="small"
                              :color="getColor(teste.status)"
                            >
                              <v-icon
                                :icon="getIcon(teste.status)"
                                start
                              ></v-icon>
                              {{ teste.status }}
                            </v-chip>
                          </td>
                          <td>
                            <!-- <transition name="fade">
                          <p v-if="textoPlanilha" class="hover-text">teste</p>
                        </transition> -->
                            <div class="d-inline-flex">
                              <v-btn
                                variant="text"
                                class="optionButton"
                                @click="
                                  geraXlsx(
                                    teste.planilha_teste,
                                    item.user['nome']
                                  )
                                "
                              >
                                <v-tooltip activator="parent" location="top"
                                  >Download CSV</v-tooltip
                                >
                                <v-icon
                                  size="large"
                                  icon="mdi-google-spreadsheet"
                                ></v-icon>
                              </v-btn>

                              <DialogExcluirTeste
                                @trigger-metododeexclusão="
                                  excluirTeste(
                                    item,
                                    teste,
                                    indexAluno,
                                    indexTeste
                                  )
                                "
                              />

                              <!-- <v-btn variant="text" class="optionButton" @click="excluirTeste(item, teste)">
                            <v-tooltip activator="parent" location="top">Excluir Teste</v-tooltip>
                            <v-icon size="large" icon="mdi-delete-forever" color="red"></v-icon>
                          </v-btn> -->
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-card>
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script>
import DialogExcluirTeste from "@/components/DialogExcluirTeste.vue";
import ChartBar from "@/components/ChartBar.vue";
import * as XLSX from "xlsx";

export default {
  name: "TurmaDataInfo",

  components: {
    DialogExcluirTeste,
    ChartBar,
  },

  data: () => ({
    mostrarDiv: true,
    animacaoListaAtiva: false,
    icon: ["", "", "", "", "", ""],
    tab: "dados",
  }),

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  emits: ['eventDeleteTest'],

  methods: {
    ativarAnimacaoLista() {
      this.animacaoListaAtiva = true;
      // Após um certo tempo, desativar a animação
      setTimeout(() => {
        this.animacaoListaAtiva = false;
      }, 500); // Tempo correspondente à duração da animação em milissegundos
    },

    toggleIcon(index, value) {
      // Reset all icons
      this.icon = this.icon.map((icon, i) =>
        i === index
          ? this.lastClicked === index
            ? "mdi-menu-down"
            : "mdi-menu-up"
          : ""
      );

      // Update last clicked index
      this.lastClicked = this.lastClicked === index ? -1 : index;
      this.toggle = value;
      this.listaTurma = this.listaTurmaOrdenada(this.sortOrder);
      this.sortOrder = !this.sortOrder;
    },

    getIcon(chipValue) {
      if (chipValue === "Não Iniciado") {
        return "mdi-cancel"; // Default
      } else if (chipValue === "Iniciado") {
        return "mdi-minus-circle"; // Verde
      } else if (chipValue === "Finalizado") {
        return "mdi-checkbox-marked-circle"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getColor(chipValue) {
      // Lógica para determinar a cor com base no valor de chipValue
      if (chipValue === "Não Iniciado") {
        return ""; // Default
      } else if (chipValue === "Iniciado") {
        return "orange"; // Verde
      } else if (chipValue === "Finalizado") {
        return "green"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    formatTime(seconds) {
      const roundedSeconds = Math.round(seconds);
      const minutes = Math.floor(roundedSeconds / 60);
      const remainingSeconds = roundedSeconds % 60;
      return minutes > 0
        ? `${minutes}m ${remainingSeconds}s`
        : `${remainingSeconds}s`;
    },

    getTableValue(teste, key, isPercentage = false, isTime = false) {
      if (teste.status !== "Finalizado") {
        return "-";
      }
      let value = teste[key];
      if (isPercentage) {
        return (value || 0).toFixed(2).replace(".", ",");
      }
      if (isTime) {
        return this.formatTime(value);
      }
      return value !== undefined ? value : "-";
    },

    mudarTela() {
      this.mostrarDiv = false;
    },

    geraXlsx(planilha, nome) {
      let data = [
        [
          "TESTE",
          "Estrato",
          "Habilidade",
          "Item",
          "Gabarito",
          "Resposta",
          "Acerto",
          "Tempo Gasto(s)",
          "Tipo",
          "Resultado",
        ],
      ];
      planilha.forEach((item) => {
        data.push([
          item.questaoNum,
          item.estrato,
          item.habilidade,
          item.id_item,
          item.gabarito.toLowerCase(),
          item.resposta,
          item.acerto,
          item.tempo_gasto,
          item.tipo,
          item.resultado,
        ]);
      });
      // Criar uma nova planilha
      let ws = XLSX.utils.aoa_to_sheet(data);

      // Criar um novo workbook
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Planilha");

      // Gerar arquivo Excel e fazer o download
      for (let col = 0; col < data[0].length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cellAddress]) {
          ws[cellAddress].s = {
            font: {
              bold: true,
              sz: 14,
              color: { rgb: "000000" }, // cor preta
            },
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
          };
        }
      }
      XLSX.writeFile(wb, `${nome}_planilha.xlsx`);
    },

    excluirTeste(item, teste, indexAluno, indexTeste) {
      const data = {
        token: item.token,
        id: item._id,
        idTeste: teste._id,
        indexAluno : indexAluno,
        indexTeste : indexTeste
      };

      this.$emit('eventDeleteTest', data);
    },
  },
};
</script>

<style></style>

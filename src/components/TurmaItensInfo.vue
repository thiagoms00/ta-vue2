<template>
  <!-- Componente que exibe os itens separados por percurso -->
  <v-sheet class="rounded-t-lg" :class="{ 'fade-in': animacaoListaAtiva }">
    <v-tabs v-model="tab" bg-color="#1E3892" class="rounded-t-lg tab-toolbar">
      <v-tab value="p1" class="tab-name" @click="selectedTab(1)"
        >Percurso 1</v-tab
      >
      <v-tab value="p2" class="tab-name" @click="selectedTab(2)"
        >Percurso 2</v-tab
      >
      <v-tab value="p3" class="tab-name" @click="selectedTab(3)"
        >Percurso 3</v-tab
      >
      <v-tab value="p4" class="tab-name" @click="selectedTab(4)"
        >Percurso 4</v-tab
      >
      <v-tab value="p5" class="tab-name" @click="selectedTab(5)"
        >Reportados</v-tab
      >
      <v-tab value="p6" class="tab-name" @click="selectedTab(6)"
        >Pendentes</v-tab
      >

      <v-spacer></v-spacer>
      <!--  <v-btn variant="text" prepend-icon="mdi-swap-horizontal" class="change-exibition" @click="changeItemExibition()">
        {{itemExibition }}
      </v-btn>  -->
    </v-tabs>

    <v-skeleton-loader type="table-tbody" v-if="loadingSkeleton">
    </v-skeleton-loader>

    <v-sheet
      class="d-flex pa-3 align-center border-b-sm"
      v-if="percursoInfo && !loadingSkeleton"
    >
      <div class="d-flex align-center pa-1">
        <v-icon
          icon="mdi-bullseye-arrow"
          color="light-blue-darken-1"
          size="24"
        ></v-icon>
        <h3 class="perc-text ml-1">
          Total de exposições: {{ percursoAtual.tentativas }}
        </h3>
      </div>

      <div class="d-flex flex-row pa-1 ml-4">
        <v-icon
          color="green-darken-2"
          icon="mdi-check-circle-outline"
          size="large"
        ></v-icon>
        <h3 class="perc-text ml-1">
          Percentual de acerto:
          {{ calculaPercAlt(percursoAtual.acertos, percursoAtual.tentativas) }}
          %
        </h3>
      </div>
    </v-sheet>

    <v-window v-model="tab" v-if="!loadingSkeleton">
      <v-row class="dflex align-center title-row">
        <v-col cols="3" class="d-flex justify-center">
          <v-btn class="title-btn" block :ripple="false" variant="text">{{
            colmunTitles[0]
          }}</v-btn>
        </v-col>

        <v-col cols="3" class="d-flex justify-center">
          <v-btn
            class="title-btn"
            block
            :append-icon="icon[1]"
            :ripple="false"
            variant="text"
            >{{ colmunTitles[1] }}</v-btn
          >
        </v-col>

        <v-col cols="3" class="d-flex justify-center pr-9">
          <v-btn
            class="title-btn"
            block
            :append-icon="icon[2]"
            :ripple="false"
            variant="text"
            >{{ colmunTitles[2] }}</v-btn
          >
        </v-col>
        <v-col cols="3" class="d-flex justify-center pr-15">
          <v-btn
            class="title-btn pr-11"
            block
            :append-icon="icon[3]"
            :ripple="false"
            variant="text"
            >{{ colmunTitles[3] }}</v-btn
          >
        </v-col>
      </v-row>

      <v-window-item value="p1">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            v-model="expansionPanelModel[0]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItens0"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
              style="border-radius: 0px"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center"> Geral </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    <div>
                      <v-chip
                        v-if="item.status === 'Disponivel'"
                        color="green"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1">mdi-check</v-icon>
                        {{ item.status }}
                      </v-chip>

                      <v-chip
                        v-if="item.status === 'Em revisão'"
                        color="orange"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1"
                          >mdi-alert-circle-outline</v-icon
                        >
                        {{ item.status }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet class="rounded-lg">
                  <v-row>
                    <v-col>
                      <v-table>
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">
                              {{ this.itemSelected.resposta }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Tentativas Realizadas</td>
                            <td class="td-right">
                              {{
                                item.dadosAlt.qtdA +
                                item.dadosAlt.qtdB +
                                item.dadosAlt.qtdC +
                                item.dadosAlt.qtdD
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Nível de exposição</td>
                            <td class="td-right">
                              <div>
                                <v-row align="center" dense>
                                  <v-col cols="auto">
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).mensagem
                                      }}
                                    </v-chip>
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc.toFixed(2)
                                      }}
                                      %
                                    </v-chip>
                                  </v-col>
                                  <v-col>
                                    <v-progress-linear
                                      :model-value="
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc
                                      "
                                      height="8"
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      rounded
                                    >
                                    </v-progress-linear>
                                  </v-col>
                                </v-row>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td class="td-left">Percentual de escolhas:</td>
                            <td class="td-right">
                              <v-chip
                                v-for="(alt, index) in ['A', 'B', 'C', 'D']"
                                :key="alt"
                                class="ma-1"
                                :color="
                                  itemSelected.alternativaCorreta ===
                                  alt.toLowerCase()
                                    ? 'green-lighten-1'
                                    : 'red-lighten-1'
                                "
                                text-color="black"
                              >
                                {{ alt }}:
                                {{
                                  calculaPercAlt(
                                    item.dadosAlt[`qtd${alt}`],
                                    item.dadosAlt.qtdA +
                                      item.dadosAlt.qtdB +
                                      item.dadosAlt.qtdC +
                                      item.dadosAlt.qtdD
                                  ) + " %"
                                }}
                              </v-chip>
                            </td>
                          </tr>

                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">
                              {{ this.itemSelected.fonte }}
                            </td>
                          </tr>
                          <!--  <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-sheet
                  class="mt-6 rounded-lg px-4 py-2 d-flex align-center justify-space-between"
                >
                  <div>
                    <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="openItem(index)"
                    >
                      Ver item
                    </v-btn>

                    <!--  <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="reportDialog = true"
                    >
                      Reportar item
                    </v-btn> -->
                  </div>

                  <div class = "text-button"> Ações </div>
                </v-sheet>

              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>

      <v-window-item value="p2">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            class=""
            v-model="expansionPanelModel[1]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItens1"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                class="color-painel"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center"> Geral </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    <div>
                      <v-chip
                        v-if="item.status === 'Disponivel'"
                        color="green"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1">mdi-check</v-icon>
                        {{ item.status }}
                      </v-chip>

                      <v-chip
                        v-if="item.status === 'Em revisão'"
                        color="orange"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1"
                          >mdi-alert-circle-outline</v-icon
                        >
                        {{ item.status }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet class="rounded-lg" >
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">
                              {{ this.itemSelected.resposta }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Tentativas Realizadas</td>
                            <td class="td-right">
                              {{
                                item.dadosAlt.qtdA +
                                item.dadosAlt.qtdB +
                                item.dadosAlt.qtdC +
                                item.dadosAlt.qtdD
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Nível de exposição</td>
                            <td class="td-right">
                              <div>
                                <v-row align="center" dense>
                                  <v-col cols="auto">
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).mensagem
                                      }}
                                    </v-chip>
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc.toFixed(2)
                                      }}
                                      %
                                    </v-chip>
                                  </v-col>
                                  <v-col>
                                    <v-progress-linear
                                      :model-value="
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc
                                      "
                                      height="8"
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      rounded
                                    >
                                    </v-progress-linear>
                                  </v-col>
                                </v-row>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de escolhas:</td>
                            <td class="td-right">
                              <v-chip
                                v-for="(alt, index) in ['A', 'B', 'C', 'D']"
                                :key="alt"
                                class="ma-1"
                                :color="
                                  itemSelected.alternativaCorreta ===
                                  alt.toLowerCase()
                                    ? 'green-lighten-1'
                                    : 'red-lighten-1'
                                "
                                text-color="black"
                              >
                                {{ alt }}:
                                {{
                                  calculaPercAlt(
                                    item.dadosAlt[`qtd${alt}`],
                                    item.dadosAlt.qtdA +
                                      item.dadosAlt.qtdB +
                                      item.dadosAlt.qtdC +
                                      item.dadosAlt.qtdD
                                  ) + " %"
                                }}
                              </v-chip>
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">
                              {{ this.itemSelected.fonte }}
                            </td>
                          </tr>
                          <!--  <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-sheet
                  class="mt-6 rounded-lg px-4 py-2 d-flex align-center justify-space-between"
                >
                  <div>
                    <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="openItem(index)"
                    >
                      Ver item
                    </v-btn>

                    <!--  <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="reportDialog = true"
                    >
                      Reportar item
                    </v-btn> -->
                  </div>

                  <div class = "text-button"> Ações </div>
                </v-sheet>

              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>

      <v-window-item value="p3">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            class=""
            v-model="expansionPanelModel[2]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItens2"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
              style="border-radius: 0px"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                class="color-painel"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center"> Geral </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    <div>
                      <v-chip
                        v-if="item.status === 'Disponivel'"
                        color="green"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1">mdi-check</v-icon>
                        {{ item.status }}
                      </v-chip>

                      <v-chip
                        v-if="item.status === 'Em revisão'"
                        color="orange"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1"
                          >mdi-alert-circle-outline</v-icon
                        >
                        {{ item.status }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet class="rounded-lg"> 
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">
                              {{ this.itemSelected.resposta }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Tentativas Realizadas</td>
                            <td class="td-right">
                              {{
                                item.dadosAlt.qtdA +
                                item.dadosAlt.qtdB +
                                item.dadosAlt.qtdC +
                                item.dadosAlt.qtdD
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Nível de exposição</td>
                            <td class="td-right">
                              <div>
                                <v-row align="center" dense>
                                  <v-col cols="auto">
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).mensagem
                                      }}
                                    </v-chip>
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc.toFixed(2)
                                      }}
                                      %
                                    </v-chip>
                                  </v-col>
                                  <v-col>
                                    <v-progress-linear
                                      :model-value="
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc
                                      "
                                      height="8"
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      rounded
                                    >
                                    </v-progress-linear>
                                  </v-col>
                                </v-row>
                              </div>
                            </td>
                          </tr>
 
                          <tr>
                            <td class="td-left">Percentual de escolhas:</td>
                            <td class="td-right">
                              <v-chip
                                v-for="(alt, index) in ['A', 'B', 'C', 'D']"
                                :key="alt"
                                class="ma-1"
                                :color="
                                  itemSelected.alternativaCorreta ===
                                  alt.toLowerCase()
                                    ? 'green-lighten-1'
                                    : 'red-lighten-1'
                                "
                                text-color="black"
                              >
                                {{ alt }}:
                                {{
                                  calculaPercAlt(
                                    item.dadosAlt[`qtd${alt}`],
                                    item.dadosAlt.qtdA +
                                      item.dadosAlt.qtdB +
                                      item.dadosAlt.qtdC +
                                      item.dadosAlt.qtdD
                                  ) + " %"
                                }}
                              </v-chip>
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">
                              {{ this.itemSelected.fonte }}
                            </td>
                          </tr>
                          <!--  <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-sheet
                  class="mt-6 rounded-lg px-4 py-2 d-flex align-center justify-space-between"
                >
                  <div>
                    <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="openItem(index)"
                    >
                      Ver item
                    </v-btn>

                    <!--  <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="reportDialog = true"
                    >
                      Reportar item
                    </v-btn> -->
                  </div>

                  <div class = "text-button"> Ações </div>
                </v-sheet>

              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>

      <v-window-item value="p4">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            class=""
            v-model="expansionPanelModel[3]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItens3"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
              style="border-radius: 0px"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                class="color-painel"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center"> Geral </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    <div>
                      <v-chip
                        v-if="item.status === 'Disponivel'"
                        color="green"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1">mdi-check</v-icon>
                        {{ item.status }}
                      </v-chip>

                      <v-chip
                        v-if="item.status === 'Em revisão'"
                        color="orange"
                        dark
                        class="ma-2"
                      >
                        <v-icon left class="mr-1"
                          >mdi-alert-circle-outline</v-icon
                        >
                        {{ item.status }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet class="rounded-lg">
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">
                              {{ this.itemSelected.resposta }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Tentativas Realizadas</td>
                            <td class="td-right">
                              {{
                                item.dadosAlt.qtdA +
                                item.dadosAlt.qtdB +
                                item.dadosAlt.qtdC +
                                item.dadosAlt.qtdD
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Nível de exposição</td>
                            <td class="td-right">
                              <div>
                                <v-row align="center" dense>
                                  <v-col cols="auto">
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).mensagem
                                      }}
                                    </v-chip>
                                    <v-chip
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      dark
                                      class="ml-2"
                                    >
                                      {{
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc.toFixed(2)
                                      }}
                                      %
                                    </v-chip>
                                  </v-col>
                                  <v-col>
                                    <v-progress-linear
                                      :model-value="
                                        calculaNivelExp(
                                          item.dadosAlt.qtdA +
                                            item.dadosAlt.qtdB +
                                            item.dadosAlt.qtdC +
                                            item.dadosAlt.qtdD
                                        ).perc
                                      "
                                      height="8"
                                      :color="
                                        getBarColor(
                                          calculaNivelExp(
                                            item.dadosAlt.qtdA +
                                              item.dadosAlt.qtdB +
                                              item.dadosAlt.qtdC +
                                              item.dadosAlt.qtdD
                                          ).perc
                                        )
                                      "
                                      rounded
                                    >
                                    </v-progress-linear>
                                  </v-col>
                                </v-row>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td class="td-left">Percentual de escolhas:</td>
                            <td class="td-right">
                              <v-chip
                                v-for="(alt, index) in ['A', 'B', 'C', 'D']"
                                :key="alt"
                                class="ma-1"
                                :color="
                                  itemSelected.alternativaCorreta ===
                                  alt.toLowerCase()
                                    ? 'green-lighten-1'
                                    : 'red-lighten-1'
                                "
                                text-color="black"
                              >
                                {{ alt }}:
                                {{
                                  calculaPercAlt(
                                    item.dadosAlt[`qtd${alt}`],
                                    item.dadosAlt.qtdA +
                                      item.dadosAlt.qtdB +
                                      item.dadosAlt.qtdC +
                                      item.dadosAlt.qtdD
                                  ) + " %"
                                }}
                              </v-chip>
                            </td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">
                              {{ this.itemSelected.fonte }}
                            </td>
                          </tr>
                          <!--  <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-sheet
                  class="mt-6 rounded-lg px-4 py-2 d-flex align-center justify-space-between"
                >
                  <div>
                    <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="openItem(index)"
                    >
                      Ver item
                    </v-btn>

                    <!--  <v-btn
                      variant="outlined"
                      class="item-btn"
                      @click="reportDialog = true"
                    >
                      Reportar item
                    </v-btn> -->
                  </div>

                  <div class = "text-button"> Ações </div>
                </v-sheet>

              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>

      <!-- Janela dos itens reportados -->
      <v-window-item value="p5">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            class=""
            v-model="expansionPanelModel[3]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItensReportados"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
              style="border-radius: 0px"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                class="color-painel"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.idItem }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.percurso }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.emailAdmin }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.dataErro }}
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ item.idItem }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ item.percurso }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Administrador</td>
                            <td class="td-right">{{ item.emailAdmin }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Erro</td>
                            <td class="td-right">{{ item.msgErro }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>
                <v-divider :thickness="4"></v-divider>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>

      <!-- Janela dos itens sugeridos -->
      <v-window-item value="p6">
        <v-sheet
          rounded="lg"
          class=""
          :class="{ 'fade-in': animacaoListaAtiva }"
        >
          <v-expansion-panels
            variant="accordion"
            class=""
            v-model="expansionPanelModel[3]"
          >
            <v-expansion-panel
              v-for="(item, index) in listaItensSugeridos"
              :key="item.id"
              ref="panels"
              class="rounded-b-lg"
              style="border-radius: 0px"
            >
              <v-expansion-panel-title
                style="height: 5vh"
                class="color-painel"
                @click="changeItem(index, this.tabNumber)"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.idItem }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.percurso }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.emailAdmin }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.data }}
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ item.idItem }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Habilidade</td>
                            <td class="td-right">{{ item.hab }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ item.percurso }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Administrador</td>
                            <td class="td-right">{{ item.emailAdmin }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Enunciado</td>
                            <td class="td-right">{{ item.comando }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa a</td>
                            <td class="td-right">{{ item.alt1 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa b</td>
                            <td class="td-right">{{ item.alt2 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa c</td>
                            <td class="td-right">{{ item.alt3 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa d</td>
                            <td class="td-right">{{ item.alt4 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa correta</td>
                            <td class="td-right">{{ item.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Referência</td>
                            <td class="td-right">{{ item.fonte }}</td>
                          </tr>
                          <!-- <tr>
                            <td class="td-left">Imagem</td>
                            <td class="td-right"><v-btn @click="abrirImg(item.imagem)">IMG</v-btn></td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>
                <v-divider :thickness="4"></v-divider>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-window-item>
    </v-window>
    <!-- Dialog de report -->
    <v-dialog v-model="reportDialog" width="auto">
      <v-card min-width="700">
        <v-toolbar color="#1E3892" density="comfortable">
          <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
          <v-toolbar-title class="ml-2 toolbar-title"
            >Reportar Item</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>

        <template v-slot:actions class="">
          <div class="d-flex flex-column report-area pa-5">
            <h4 class="ml-2 report-id">{{ this.itemSelected.id }}</h4>
            <v-text-field
              clearable
              label="Erro"
              variant="outlined"
              class="mt-5"
              v-model="errorModel"
              :rules="[rules.required]"
            >
            </v-text-field>
            <div class="report-buttons d-flex mt-5">
              <v-btn
                variant="outlined"
                class="mx-auto report-button"
                text="Reportar"
                @click="reportaItem(this.itemSelected)"
              ></v-btn>
              <v-btn
                variant="outlined"
                class="mx-auto report-button"
                text="Voltar"
                @click="(reportDialog = false), clearErrorField()"
              ></v-btn>
            </div>
          </div>
        </template>
      </v-card>
    </v-dialog>

    <!-- Dialog de report bem sucedido-->

    <v-dialog v-model="reportSuccess" width="auto">
      <v-card min-width="500">
        <v-toolbar color="#1E3892" density="comfortable">
          <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
          <v-toolbar-title class="ml-2 toolbar-title"
            >Reportar Item</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>

        <template v-slot:actions class="">
          <div class="d-flex flex-column report-area pa-5">
            <h4 class="mx-auto report-success-text">
              O Item foi reportado com sucesso!!
            </h4>
            <div class="report-buttons d-flex mt-5">
              <v-btn
                variant="outlined"
                class="mx-auto report-button"
                text="Fechar"
                @click="(reportSuccess = false), clearErrorField()"
              ></v-btn>
            </div>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import DialogExcluirTeste from "@/components/DialogExcluirTeste.vue";
import ChartBar from "@/components/ChartBar.vue";
import TurmaProgInfo from "./TurmaProgInfo.vue";
import axios from "axios";

//Informações sobre os itens.
import jsonDataQuestoes0 from "../assets/questao/questoes_extrato0.json";
import jsonDataQuestoes1 from "../assets/questao/questoes_extrato1.json"; //Primeiro estrato a ser utilizado.
import jsonDataQuestoes2 from "../assets/questao/questoes_extrato2.json";
import jsonDataQuestoes3 from "../assets/questao/questoes_extrato3.json";

export default {
  name: "TurmaItensInfo",

  components: {
    DialogExcluirTeste,
    ChartBar,
    TurmaProgInfo,
  },

  data: () => ({
    loadingSkeleton: true,
    animacaoListaAtiva: false,
    icon: ["", "", "", "", "", ""],
    tab: null,
    listaTurma: [], //Lista com os alunos.
    listaItens0: [], //Lista de Itens do percurso 1
    listaItens1: [], //Lista de Itens do percurso 2
    listaItens2: [], //Lista de Itens do percurso 3
    listaItens3: [], //Lista de Itens do percurso 4
    listaItensReportados: [], //Lista com os itens reportados
    listaItensSugeridos: [],
    listaPercursos: [],
    percursoAtual: {},

    listaItens: [], //Itens sendo exibidos, começando pelo estrato 1.

    itemSelected: {
      id: "",
      percurso: "",
      resposta: "",
      fonte: "",
      layout: "",
      alternativaCorreta: "",
    },

    questoesP1: [],
    questoesP2: [],
    questoesP3: [],
    questoesP4: [],
    tabNumber: 1,
    lastIndex: 0,
    expansionPanelModel: [null, null, null, null],
    reportDialog: false, // Variavel de controle do dialog de report.
    reportSuccess: false, // Variavel de controle do dialog de report bem sucedido.
    errorModel: "", //Model do text-field de erro.
    colmunTitles: ["Código", "Habilidade", "Aprendizagem", "Status"], //Títulos que aparecem nas colunas.
    itemExibition: "habilidades",
    rules: {
      //Objeto utilizado para verificar se um campo obrigatório foi preenchido.
      required: (value) => !!value || "Campo obrigatório",
    },
    percursoInfo: true,
    totalTent: 0, //conta quantas vezes os itens foram respondidos(todos os percursos)
  }),

  props: {},

  watch: {},

  created() {
    this.returnItens();
    this.returnItensReportados();
    this.returnItensSugeridos();

    this.questoesP1 = jsonDataQuestoes0.questoes;
    this.questoesP2 = jsonDataQuestoes1.questoes;
    this.questoesP3 = jsonDataQuestoes2.questoes;
    this.questoesP4 = jsonDataQuestoes3.questoes;

    /* Dados que vão ser exibidos no expansive-text */
    this.itemSelected.id = this.questoesP1[0].id;
    this.itemSelected.layout = this.questoesP1[0].layout;
    this.itemSelected.percurso = 1;
    this.itemSelected.resposta = this.questoesP1[0].answer;
    this.itemSelected.fonte = this.questoesP1[0].fonte;
    this.itemSelected.alternativaCorreta =
      this.questoesP1[0].alternativaCorreta;
  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
  },

  emits: ["eventDeleteTest"],

  methods: {
    //Função que muda o modo de visualização dos itens.
    changeItemExibition() {
      if (this.itemExibition === "habilidades") {
        this.itemExibition = "percursos";
      } else if (this.itemExibition === "percursos") {
        this.itemExibition = "habilidades";
      }
    },

    abrirImg(img) {
      console.log(img);
      const blob = new Blob([img], { type: "image/jpeg" }); // Adjust the MIME type if necessary
      const imageUrl = URL.createObjectURL(blob);
      window.open(imageUrl, "_blank");
    },

    //Função que envia um item reportado para o back-end.
    async reportaItem(item) {
      if (this.errorModel != "") {
        this.reportDialog = false;
        this.reportSuccess = true;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("pt-BR");
        const itemReportado = {
          idItem: item.id,
          idAdmin: localStorage.getItem("idAdmin"),
          tokenAdmin: localStorage.getItem("tokenAdmin"),
          msgErro: this.errorModel,
          percurso: this.tabNumber,
          dataErro: formattedDate,
        };
        console.log(`Item reportado: ${JSON.stringify(itemReportado)}`);
        const data = itemReportado;

        axios({
          url: "https://ta-back.onrender.com/admin/reportItens",
          data,
          method: "POST",
        })
          .then((response) => {
            console.log(
              `Status da resposta do servidor: ${response.status} \n`
            );
            console.log(`Mensagem do servidor: ${response.data.message}`);
            this.returnItensReportados();
            this.returnItens();
          })

          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
      }
    },

    //Função que limpa o text field do erro de item reportado.
    clearErrorField() {
      this.errorModel = "";
    },

    selectedTab(tabNum) {
      this.tabNumber = tabNum;
      this.expansionPanelModel = [null, null, null, null];
      if (tabNum >= 5) {
        this.colmunTitles = ["Código", "Percurso", "Administrador", "Data"];
        this.percursoInfo = false;
      } else {
        this.colmunTitles = ["Código", "Habilidade", "Aprendizagem", "Status"];
        this.percursoInfo = true;
        switch (
          tabNum //Muda os dados exibidos no v-card do percurso.
        ) {
          case 1:
            this.percursoAtual = this.listaPercursos[0];
            break;
          case 2:
            this.percursoAtual = this.listaPercursos[1];

            break;
          case 3:
            this.percursoAtual = this.listaPercursos[2];

            break;
          case 4:
            this.percursoAtual = this.listaPercursos[3];
            break;
        }
      }
    },

    openItem(index) {
      let dadosItem = {
        index: index,
        percurso: this.tabNumber,
      };
      const routeData = this.$router.resolve({
        name: "Itens",
        query: { data: JSON.stringify(dadosItem) },
      });

      window.open(routeData.href, "_blank");
    },

    //Muda o item selecionado na tabela.
    changeItem(index, percurso) {
      this.newIndex = index; //para o changeItem do changeTab
      switch (percurso) {
        case 1:
          this.itemSelected.id = this.questoesP1[index].id;
          this.itemSelected.layout = this.questoesP1[index].layout;
          this.itemSelected.percurso = 1;
          this.itemSelected.resposta = this.questoesP1[index].answer;
          this.itemSelected.fonte = this.questoesP1[index].fonte;
          this.itemSelected.alternativaCorreta =
            this.questoesP1[index].alternativaCorreta;

          break;
        case 2:
          this.itemSelected.id = this.questoesP2[index].id;
          this.itemSelected.layout = this.questoesP2[index].layout;
          this.itemSelected.percurso = 2;
          this.itemSelected.resposta = this.questoesP2[index].answer;
          this.itemSelected.fonte = this.questoesP2[index].fonte;
          this.itemSelected.alternativaCorreta =
            this.questoesP2[index].alternativaCorreta;

          break;
        case 3:
          this.itemSelected.id = this.questoesP3[index].id;
          this.itemSelected.layout = this.questoesP3[index].layout;
          this.itemSelected.percurso = 3;
          this.itemSelected.resposta = this.questoesP3[index].answer;
          this.itemSelected.fonte = this.questoesP3[index].fonte;
          this.itemSelected.alternativaCorreta =
            this.questoesP3[index].alternativaCorreta;

          break;
        case 4:
          this.itemSelected.id = this.questoesP4[index].id;
          this.itemSelected.layout = this.questoesP4[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.questoesP4[index].answer;
          this.itemSelected.fonte = this.questoesP4[index].fonte;
          this.itemSelected.alternativaCorreta =
            this.questoesP4[index].alternativaCorreta;

          break;
        default:
          break;
      }
    },

    //Retorna os dados relativos aos itens.
    returnItens() {
      axios({
        url: "https://ta-back.onrender.com/professores/dadosItens",
        method: "POST",
      })
        .then((response) => {
          this.listaItens = response.data.itens.listaItens1;
          this.listaItens0 = response.data.itens.listaItens0;
          this.listaItens1 = response.data.itens.listaItens1;
          this.listaItens2 = response.data.itens.listaItens2;
          this.listaItens3 = response.data.itens.listaItens3;
          this.listaPercursos = response.data.listaPercursos;
          this.percursoAtual = this.listaPercursos[0];
          for (const number in this.listaPercursos) {
            //Obtendo o total de tentativas.
            this.totalTent += this.listaPercursos[number].tentativas;
          }
        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    returnItensReportados() {
      const data = {
        idAdmin: localStorage.getItem("idAdmin"),
        tokenAdmin: localStorage.getItem("tokenAdmin"),
      };
      axios({
        url: "https://ta-back.onrender.com/admin/returnReported",
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaItensReportados = response.data.itens_reportados;
          //console.log(this.listaItensReportados);
        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    calculaNivelExp(qtdItem) {
      let perc = (qtdItem * 100) / this.totalTent;
      let mensagem;

      if (perc >= 70) {
        mensagem = "Muito exposto";
      } else if (perc < 70 && perc >= 20) {
        mensagem = "Exposto moderadamente";
      } else if (perc < 20 && perc >= 1) {
        mensagem = "Pouco exposto";
      } else {
        mensagem = "Não aplicado";
      }

      return { mensagem, perc }; // Retorna a mensagem e a porcentagem
    },

    getBarColor(perc) {
      if (perc >= 70) {
        return "red"; // Muito exposto
      } else if (perc < 70 && perc >= 20) {
        return "orange"; // Exposto moderadamente
      } else if (perc < 20 && perc >= 1) {
        return "light-blue"; // Pouco exposto
      } else {
        return "block"; // Não aplicado
      }
    },

    //Retorna o percentual geral.
    calculaPercAcerto(item) {
      let tentativas =
        item.dadosAlt.qtdA +
        item.dadosAlt.qtdB +
        item.dadosAlt.qtdC +
        item.dadosAlt.qtdD;
      let acertos =
        item.dadosAlt.acertosA +
        item.dadosAlt.acertosB +
        item.dadosAlt.acertosC +
        item.dadosAlt.acertosD;
      if (tentativas === 0 || acertos === 0) {
        return 0;
      } else {
        const percAcerto = (acertos * 100) / tentativas;
        return percAcerto.toFixed(2);
      }
    },

    //Retorna o percentual de escolha de cada alternativa.
    calculaPercAlt(acertos, qtd) {
      if (Number(qtd) === 0 || isNaN(Number(qtd))) {
        return 0;
      }

      const resultado = (Number(acertos) * 100) / Number(qtd);
      const resultadoFormatado = parseFloat(resultado.toFixed(2));

      return resultadoFormatado;
    },

    returnItensSugeridos() {
      const data = {
        idAdmin: localStorage.getItem("idAdmin"),
        tokenAdmin: localStorage.getItem("tokenAdmin"),
      };
      axios({
        url: "https://ta-back.onrender.com/admin/returnSuggested",
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaItensSugeridos = response.data.itens_sugeridos;
          this.loadingSkeleton = !this.loadingSkeleton;
          console.log(this.listaItensSugeridos);
        })

        .catch((error) => {
          console.error(error);
        });
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
  },
};
</script>

<style scoped>
.v-expansion-panel--active .v-expansion-panel-title {
  background-color: #d5d8dc;
}

.v-expansion-panel--active .v-expansion-panel-text {
  background-color: #d5d8dc;

  padding: 16px; /* Opcional: ajuste de espaçamento interno */
}

@font-face {
  font-family: "Urbanist-SB";
  src: url(../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf);
}

.perc-text {
  font-family: "Urbanist-Regular";
}

.item-btn {
  font-weight: 600;
  font-family: "Urbanist-Regular";
}

.title-btn {
  font-size: 0.9rem;
  font-weight: 600;
  height: 5vh;
}

.td-left {
  font-weight: bold;
  font-size: 0.95rem;
}

.td-right {
  font-weight: 400;
  font-size: 0.95rem;
}

.btn-area {
  display: flex;
  flex-direction: row;
  height: 7vh;
  align-items: center;
  padding-left: 2vh;
}

.report-card {
  width: 500px;
  height: 25vh;
}

.toolbar-title {
  font-family: "Urbanist-Regular";
  font-size: 1.3rem;
}

.report-area {
  width: 100%;
}

.report-buttons {
  width: 100%;
}

.report-id {
  font-size: 1.05rem;
}

.report-button {
  width: 10vw;
  height: 4vh;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Urbanist-Regular";
}

.report-success-text {
  font-size: 1.5rem;
  font-family: "Urbanist-Regular";
}

.tab-name {
  font-family: "Urbanist-Regular";
  font-size: 0.83rem;
  font-weight: bold;
}

.percurso-select {
  font-family: "Urbanist-Regular";
  font-size: 3rem !important;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.change-exibition {
  font-family: "Urbanist-Regular";
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.6vh;
  margin-right: 0.4vw;
}

.color-disponivel {
  color: #34a52a !important;
  font-weight: 600;
}

.color-revisao {
  color: #ee4e4e !important;
  font-weight: 600;
}

.tooltip1Teste {
  color: #fff;
}
</style>

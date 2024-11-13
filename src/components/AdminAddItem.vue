<template>

    <v-sheet class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between" color="#1E3892"
        height="50">

        <div class="d-flex align-center">
            <div class="ml-2 tab-name">Adicionar items</div>
        </div>

    </v-sheet>
    <v-row cols=12>
        <v-col cols="6" class="">
            <v-sheet class="mx-auto main-sheet" width="550">
                <div class="custom-form">

                    <h3 class="label-form">Código:</h3>
                    <v-text-field label="" variant="outlined" density="compact" class="message-field" ></v-text-field>

                    <h3 class="label-form">Habilidade:</h3>
                    <v-select v-model="selectHab" :items="opcoesHab" density="compact"
                        :rules="[v => !!v || 'Item is required']" label="" variant="outlined" class="message-field"
                        required></v-select>

                    <h3 class="label-form">Percurso:</h3>
                    <v-select v-model="selectPercurso" :items="opcoesPercurso" density="compact"
                        :rules="[v => !!v || 'Item is required']" label="" variant="outlined" class="message-field"
                        required></v-select>

                    <h3 class="label-form">Alternativa 1</h3>
                    <v-text-field label="" variant="outlined" density="compact" class="message-field"></v-text-field>

                    <h3 class="label-form">Alternativa 2</h3>
                    <v-text-field label="" variant="outlined" density="compact" class="message-field"></v-text-field>

                    <h3 class="label-form">Alternativa 3</h3>
                    <v-text-field label="" variant="outlined" density="compact" class="message-field"></v-text-field>

                    <h3 class="label-form">Alternativa 4</h3>
                    <v-text-field label="" variant="outlined" density="compact" class="message-field"></v-text-field>

                   
                </div>

            </v-sheet>
        </v-col>
        <v-col cols="">
            <v-sheet class="mx-auto main-sheet" width="550">
                <div class=custom-form>
                   
                    <h3 class="label-form">Resposta:</h3>
                    <v-text-field label="" class="message-field" variant="outlined" density="compact"></v-text-field>

                    <h3 class="label-form">Fonte:</h3>
                    <v-text-field label="" class="message-field" variant="outlined" density="compact"></v-text-field>

                    <v-btn class="mt-5 submit-button mx-auto" type="submit" block>Enviar</v-btn>
                </div>
            </v-sheet>
        </v-col>
    </v-row>

</template>

<script>
import ChartBar from "@/components/ChartBar.vue";
import TurmaProgInfo from "./TurmaProgInfo.vue";
import axios from 'axios';


export default {
    name: "TurmaItensInfo",

    components: {
        ChartBar,
        TurmaProgInfo,
    },

    data: () => ({
        animacaoListaAtiva: false,
        icon: ["", "", "", "", "", ""],
        tab: null,
        listaTurma: [],   //Lista com os alunos.


        listaItens: [], //Itens sendo exibidos, começando pelo estrato 1.

        itemSelected: {
            id: '',
            percurso: '',
            resposta: '',
            fonte: '',
            layout: '',
        },

        opcoesPercurso: [
            'Percurso 1',
            'Percurso 2',
            'Percurso 3',
            'Percurso 4',
        ],

        opcoesHab: [
            'H01',
            'H02',
            'H02.1',
            'H03',
            'H04',
            'H05',
            'H05.1',
            'H06',
            'H07',
            'H08',
            'H09',
            'H10',
            'H11'
        ],
        selectPercurso: '',
        selectHab: '',

        expansionPanelModel: [null, null, null, null],
        reportDialog: false,  // Variavel de controle do dialog de report.
        reportSuccess: false, // Variavel de controle do dialog de report bem sucedido.
        errorModel: '', //Model do text-field de erro.
        colmunTitles: ['Código', 'Habilidade', 'Aprendizagem', 'Status'], //Títulos que aparecem nas colunas.
        itemExibition: 'habilidades',

    }),

    props: {

    },

    watch: {
        // Observa mudanças em `listaDeAlunos`
        /* listaDeAlunos(newVal) {
          this.listaTurma = newVal;
        }, */

    },

    created() {



    },

    mounted() {
    },


    emits: ["eventDeleteTest"],

    methods: {


    },
};
</script>

<style scoped>
@font-face {
    font-family: 'Urbanist-SB';
    src: url(../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf);
}

.main-sheet {
    height: 80vh;
}

.custom-form {
    margin-top: 5vh;
}

.tab-name {
    font-family: 'Urbanist-Regular';
    font-size: 1.2rem;
    font-weight: bold;
}

.right-col {
    border-radius: 2px;
}

.label-form {
    font-family: 'Urbanist-Regular';
    font-size: 1.15rem;
    margin-left: 0.05vw;
}

.message-field {
    margin-top: 1.3vh;
}

.submit-button {
    background-color: #1E3892;
    color: #FFF;
    height: 4.5vh !important;
    width: 14vw !important;
    min-width: 1vw !important;
    font-size: 0.8rem !important;
    font-weight: 600;
    font-family: 'Urbanist-Regular';
}



</style>
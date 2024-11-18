<template>

    <v-sheet class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between" color="#1E3892"
        height="50">

        <div class="d-flex align-center">
            <div class="ml-3 mt-1 tab-name-admin">Adicionar items</div>
        </div>

    </v-sheet>
    <v-sheet class="rounded-b-lg d-flex elevation-4 aux-sheet" color="">
        <v-row cols=12 class="main-row">
            <v-col cols="6" class="">
                <v-sheet class="mx-auto main-sheet left-sheet">
                    <div class="custom-form">

                        <h3 class="label-form">Código *</h3>
                        <v-text-field label="" variant="outlined" density="compact" class="message-field"
                            v-model="codModel" :rules="[rules.required]"></v-text-field>

                        <h3 class="label-form">Habilidade *</h3>
                        <v-select v-model="selectHab" :items="opcoesHab" density="compact" label="" variant="outlined"
                            class="message-field" :rules="[rules.required]"></v-select>

                        <h3 class="label-form">Percurso *</h3>
                        <v-select v-model="selectPercurso" :items="opcoesPercurso" density="compact" label=""
                            variant="outlined" class="message-field" :rules="[rules.required]"></v-select>

                        <h3 class="label-form">Alternativa 1</h3>
                        <v-text-field label="" variant="outlined" density="compact" class="message-field"
                            v-model="alt1Model"></v-text-field>

                        <h3 class="label-form">Alternativa 2</h3>
                        <v-text-field label="" variant="outlined" density="compact" class="message-field"
                            v-model="alt2Model"></v-text-field>

                        <h3 class="label-form">Alternativa 3</h3>
                        <v-text-field label="" variant="outlined" density="compact" class="message-field"
                            v-model="alt3Model"></v-text-field>

                        <h3 class="label-form">Alternativa 4</h3>
                        <v-text-field label="" variant="outlined" density="compact" class="message-field"
                            v-model="alt4Model"></v-text-field>



                    </div>

                </v-sheet>
            </v-col>
            <v-col cols="">
                <v-sheet class="mx-auto main-sheet rigth-sheet" width="">
                    <div class=custom-form>

                        <h3 class="label-form">Comando</h3>
                        <v-text-field label="" class="message-field" variant="outlined" density="compact"
                            v-model="comandoModel"></v-text-field>

                        <h3 class="label-form">Áudio</h3>
                        <v-text-field label="" class="message-field" variant="outlined" density="compact"
                            v-model="audioModel"></v-text-field>

                        <h3 class="label-form">Resposta</h3>
                        <v-text-field label="" class="message-field" variant="outlined" density="compact"
                            v-model="respoModel"></v-text-field>

                        <h3 class="label-form">Fonte</h3>
                        <v-text-field label="" class="message-field" variant="outlined" density="compact"
                            v-model="fonteModel"></v-text-field>

                        <h3 class="label-form">Imagem</h3>


                        <v-file-input accept="image/*" variant="outlined" density="compact" class="message-field"
                            v-model="image1Model"></v-file-input>



                        <v-btn class="mt-5 submit-button mx-auto" type="submit" block
                            @click="verificaDadosForm()">Enviar</v-btn>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
    <!-- Pop-up de itens inseridos com sucesso -->
    <v-dialog v-model="sugestModel" width="auto">
        <v-card min-width="250">

            <v-toolbar color="#1E3892" density="comfortable">
                <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
                <v-toolbar-title class="ml-2 toolbar-title">Adicionar Item</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <template v-slot:actions class="">
                <div class="d-flex flex-column report-area pa-5">
                    <h4 class="mx-auto report-success-text">O Item foi adicionado com sucesso!!</h4>
                    <div class="report-buttons d-flex mt-5">
                        <v-btn variant="outlined" class="mx-auto report-button" text="Fechar"
                            @click="sugestModel = false"></v-btn>
                    </div>
                </div>

            </template>
        </v-card>
    </v-dialog>

    <!-- Dados obrigatórios faltando -->
    <v-dialog v-model="erroModel" width="auto">
        <v-card min-width="250">

            <v-toolbar color="#1E3892" density="comfortable">
                <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
                <v-toolbar-title class="ml-2 toolbar-title">Adicionar Item</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <template v-slot:actions class="">
                <div class="d-flex flex-column report-area pa-5">
                    <h4 class="mx-auto report-success-text">Informe os dados obrigatórios antes de enviar</h4>
                    <div class="report-buttons d-flex mt-5">
                        <v-btn variant="outlined" class="mx-auto report-button" text="Fechar"
                            @click="erroModel = false"></v-btn>
                    </div>
                </div>

            </template>
        </v-card>
    </v-dialog>

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
            '1',
            '2',
            '3',
            '4',
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

        /* Models do form */
        codModel: '',
        alt1Model: '',
        alt2Model: '',
        alt3Model: '',
        alt4Model: '',
        respoModel: '',
        fonteModel: '',
        audioModel: '',
        comandoModel: '',
        image1Model: '',

        sugestModel: false, //Model do pop-up de sucesso.
        erroModel: false,


        expansionPanelModel: [null, null, null, null],
        reportDialog: false,  // Variavel de controle do dialog de report.
        reportSuccess: false, // Variavel de controle do dialog de report bem sucedido.
        errorModel: '', //Model do text-field de erro.
        colmunTitles: ['Código', 'Habilidade', 'Aprendizagem', 'Status'], //Títulos que aparecem nas colunas.
        itemExibition: 'habilidades',
        rules: {  //Objeto utilizado para verificar se um campo obrigatório foi preenchido.
            required: value => !!value || 'Campo obrigatório',
        },

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

        verificaDadosForm() {
            if (!this.codModel || !this.selectHab || !this.selectPercurso) {
                this.erroModel = true;
            }
            else {
                this.sugestModel = true;
            }
        },


        sendCustomForm() {
            console.log(`Código : ${this.codModel}\n Habilidade : ${this.selectHab} \n Percurso : ${this.selectPercurso}`);

        },
        sugereItem() {
            console.log(this.image1Model)
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('pt-BR');
            const itemSugerido = {
                id: this.codModel,
                hab: this.selectHab,
                percurso: this.selectPercurso,
                alt1: this.alt1Model,
                alt2: this.alt2Model,
                alt3: this.alt3Model,
                alt4: this.alt4Model,
                comando: this.comandoModel,
                audio: this.audioModel,
                resposta: this.respoModel,
                fonte: this.fonteModel,
                imagem: this.image1Model,
                data: formattedDate,
                idAdmin: localStorage.getItem('idAdmin'),
                tokenAdmin: localStorage.getItem('tokenAdmin'),

            }
            console.log(`Item sugerido: ${JSON.stringify(itemSugerido)}`);
            const data = itemSugerido;

             axios({ url: 'https://ta-back.onrender.com/admin/addItem', data, method: 'POST' })
               .then((response) => {
                   console.log(`Status da resposta do servidor: ${response.status} \n`);
                   console.log(`Mensagem do servidor: ${response.data.message}`);
                 
               })

               .catch((error) => {
                   // Tratar erros aqui
                   console.error(error);
               });  
        },

    },
};
</script>

<style scoped>
@font-face {
    font-family: 'Urbanist-SB';
    src: url(../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf);
}

.aux-sheet {
    background-color: #fff !important;

}

.main-sheet {
    padding-bottom: 7vh;
    background-color: #fff;


}

.custom-form {
    margin-top: 5vh;
    background-color: #fff !important;

}

.tab-name-admin {
    font-family: 'Urbanist-SB';
    font-size: 1.2rem !important;

}

.left-sheet {
    width: 25vw;
}

.rigth-sheet {
    width: 25vw;
}

.right-col {
    border-radius: 2px;
}

.label-form {
    font-family: 'Urbanist-Regular';
    font-size: 1.15rem;
    margin-left: 0.05vw;
    margin-top: 1vh;
}

.message-field {
    margin-top: 1vh;
    background-color: #fff;

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

.report-area {
    width: 100%;
}

.report-button {
    width: 10vw;
    height: 4vh;
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Urbanist-Regular';
    margin-top: 1vh;
}


.report-success-text {
    font-size: 1.34rem;
    font-family: 'Urbanist-Regular';
}

.toolbar-title {
    font-family: 'Urbanist-SB';
    font-size: 1.3rem;

}



@media (max-width: 1400px) {
    .submit-button {
        height: 6vh !important;
        width: 17vw !important;
    }
}
</style>
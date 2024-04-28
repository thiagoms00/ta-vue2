<template>
    <div class="text-center">
        <v-dialog v-model="dialogOpen" content-class="bottom-left-dialog">

            <v-card width="40%" class="ml-16" max-width="500">
                <v-card-title class="d-flex align-center" style="background-color: #1E3892; color: white;">
                    <v-icon icon="mdi-thumb-up-outline"></v-icon>
                    <p class="ml-4"> Muito bem !</p>
                </v-card-title>
                <v-card-text class="pop-msg">
                    <p>
                        Vamos continuar com mais algumas questões.<br>
                    </p>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn @click="closeDialog" class="ms-auto" text="Fechar"></v-btn>
                </template>
            </v-card>

            <v-img :aspect-ratio="1" src="../assets/imgs/prancheto-popup.png" width="200" class="img-mascote"></v-img>


        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'PopupIntervalo',
    data() {
        return {
            dialogOpen: false,
        };
    },
    methods: {
        openDialog() {
            this.dialogOpen = true;
        },
        closeDialog() {
            this.dialogOpen = false;
            this.$emit('playAudio');
        }
    },
};
</script>

<style>
.pop-msg {
    font-weight: 600 !important;
}

.bottom-left-dialog {
    bottom: 0;
    left: 0;
}
</style>
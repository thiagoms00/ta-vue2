<template>
    <v-container class="d-flex justify-center">
        <!-- <v-sheet class="rounded-lg" elevation="12" width="95" height="95" border="sm" border-color="red">

        </v-sheet> -->
        <div class="icon-mega" @click="playAudio()">
            <span class="tooltipText">Escutar</span>
        </div>
    </v-container>


</template>

<script>

import audiowelcome from '@/assets/audios/outros_audios/audio_bemvindo.mp3'

export default{
    name:'Megaphone',
    components:{

    },
    methods: {
    playAudio(){


        let audio = new Audio(audiowelcome);
        console.log('teste');
        audio.play();

    },
}
}



</script>

<style>
.icon-mega {
    background: url(../assets/icons/megaphone.svg);
    width: 95px;
    height: 95px;
    background-size: cover;
    border: 1px solid rgba(76, 75, 75, 0.612);
    border-radius: 5px;
    cursor: pointer;
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
    transform: translateY(-1px);

}

.icon-mega:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
    transform: translateY(-2px);
    transition: transform 0.2s;
}

.icon-mega:active {
    box-shadow: #ffffff72 0 1px 3px inset;
    transform: translateY(1px);
}

.icon-mega .tooltipText {
    font-family: Manrope;
    visibility: hidden;
    width: 120px;
    font-size: 23px;
    background-color: rgba(61, 61, 61, 0.961);
    color: #ffffff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    bottom: 100%;
    left: 50%;
    margin-left: -54px;
    box-shadow: rgba(45, 35, 66, 0.8) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #ffffff 0 0 0 inset;
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    z-index: 1;
}

.icon-mega:hover .tooltipText {
    visibility: visible;
    opacity: 1;
}

@media (max-width:1550px){
    .icon-mega{
        width: 70px;
        height: 70px;
    }

    .icon-mega .tooltipText{
        font-size: 1rem;
        width:7vw;
        margin-left:-3.5vw;
    }
}

</style>
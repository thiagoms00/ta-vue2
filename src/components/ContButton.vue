<template>
    <button class="question-button">Continuar</button>
</template>

<script>

export default {
    name : 'ContButton'
}


</script>

<style>

.question-button{
    background-color: #1E3892;
    color: #fff;
    width: 50%;
    height: 55px;
    border: 1px solid rgb(81, 81, 81);
    border-radius: 5px;
    font-size: 23px;
    cursor:pointer;
    font-family: Manrope-Light;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    margin-top: 90px;
    align-self: center;
    
    
}
.question-button:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #545151 0 -1px 0 inset;
    transform: translateY(-2px);
    transition: transform 0.2s;
}  

.question-button:active {
    box-shadow: #ffffff72 0 1px 3px inset;
    transform: translateY(1px);
}
</style>
<template>
    <form action="" class="question-form" id="questionForm">
                   
            <div class="alternative">
                <input type="radio" id="alt1" name="question-choice" value="1" class="option">
                <label for="alt1" class="radio-text" id="radioLabel1">Alt 1</label><br>
            </div>
           
            <div class="alternative">

                <input type="radio" id="alt2" name="question-choice" value="2" class="option">
                <label for="alt2" class="radio-text" id="radioLabel2">Alt 2</label><br>
                       
                </div>

            <div class="alternative">
                <input type="radio" id="alt3" name="question-choice" value="3" class="option">
                <label for="alt3" class="radio-text" id="radioLabel3">Alt 3</label>
            </div>

                       <!-- <br> -->  
                   
            <div class="alternative">
                <input type="radio" id="alt4" name="question-choice" value="4" class="option">
                <label for="alt4" class="radio-text" id="radioLabel4">Alt 4</label>
            </div>
                       
             <br>  

    </form>
</template>

<script>

export default {
    name : 'FormQuestion'
}


</script>

<style>
.question-form{
    padding-left: 1.5vw;
    width: 100%;
    height: 30vh;
    margin-top: 1vh;
}

.alternative{
    display: flex;
    flex-direction: row;
    padding: 1vh 1vw 1vh 1vw;
    align-items: center;
    border: 0.15rem solid #f8f9fd;
    border-radius: 5px;
    -webkit-transition: border-color 0.5s ease;
    -moz-transition: border-color 0.5s ease;
    -o-transition: border-color 0.5s ease;
    -ms-transition: border-color 0.5s ease;
    transition: border-color 0.3s ease;       
    cursor: pointer;
    width: 30vw;
    
}

.alternative:hover{
    border-color: #6CA6C1;
}


/* input circular(Radio input) */
.option{ 
    font-size: 50px;
    cursor: pointer;
    content: '';
    background: #f4f4f4;
    border-radius: 100%;
    border: 1px solid darken(#000000, 25%);
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
}


.radio-text{
    font-size: 23px;
    margin-left: 13px;
    color: rgba(0, 0, 0, 0.889);
    font-family: Manrope-light;
    font-weight: 600;
    cursor: pointer;


}

.radio-text:hover{
    color: rgb(0, 0, 0);
    font-weight: bold;
    transition: color 0.2s;
}
</style>
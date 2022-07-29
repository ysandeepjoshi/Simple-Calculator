$(document).ready(function(){

    let input = "" // holds the value of button pressed
    let result = "0" // field where the input is shown
    let history = "0" // field where the chain of arithmetic operation will be shown
    let answer = "" // holds the answer
    let MAX_LENGTH = 9; // max digit allowed on input screen
    let MAX_LENGTH_HISTORY = 21 // max digit allowed on history screen

    $('button').click(function(){


        input = $(this).attr("value");
        checkHistory();  // if history limit is reached or not
        if(result.length < MAX_LENGTH){

            //if the number is digit or not
            if(!isNaN(input)){
                if(answer === ""){
                    isDigit(input);
                }
                else if(!isNaN(answer)){
                    let curr_input = input;
                    reset_all();
                    setResult(curr_input);
                    setHistory(curr_input);
                }
            }
            //dot
            else if(input === "."){
                checkDotExists();
            }
            //sign
            else if(input === '/' || input ==='*' || input ==='+' || input ==='-' ){
                if(checkZeroResult() && history ==='0'){
                    if(input === '-' || input === '+'){
                        setResult(input);
                        setHistory(input);
                    }
                    else if(input === '/'){
                        setResult(input);
                        concHistory(input);
                    }
                    return;
                }

                if(answer === ""){
                    // check if sign exist
                    if(!checkSign()){
                        concHistory(input);
                        setResult(input);
                    }
                    else if(input === '-' && 
                    (history.slice(-1) === '/' || history.slice(-1) === '*' )){
                        concHistory(input);
                        setResult(input);
                    }
                }
                else if(!isNaN(answer)){
                    setHistory(answer+ input);
                    setResult(input);
                    answer = "";
                }
            }
            else if(input === '='){
                try{
                    answer = Math.round(eval(history)*100) /100;

                    if(answer.toString().length > MAX_LENGTH ||
                    (history+'='+answer).length > MAX_LENGTH_HISTORY){
                        limitReached();
                        return;
                    }
                    setResult(answer+"");
                    concHistory("="+ answer);
                }
                catch(e){
                    console.log(e.message + ': '+"Incomplete arithmetic operation")
                }
            }
            else if(input ==='ac'){
                reset_all();
            }
            else if(input ==='ce'){
                if(answer !== ''){
                    reset_all()
                }else{
                    if(history.length - result.length !== 0){
                        history = history.substring(0,history.length - result.length);
                    }
                    else{
                        history = "0"
                    }
                    setHistory(history);
                    setResult("0")
                }
            }
        }
        else{
            limitReached();
        }
    })

// helper functions

    function checkSign(){
        return result.length === 1 && (result === '/'
        || result === '*'
        || result === '+'
        || result === '-')
    }

    function limitReached(){
        result = '0';
        history ='LIMIT REACHED'
        answer = "";
        setResult(result)
        setHistory(history);
    }
    function checkDotExists(){
        if(result.indexOf(".")<0){
            concResult(input);
            concHistory(input)
        }
    }
    function reset_all(){
        input = "" 
        result = "0" 
        history = "0"
        answer = ""
        setHistory("0");
        setResult("0")
    }

    function checkZeroResult(){
        return result.length === 1 && result.charAt(0) === "0"
    }
    function setResult(newResult){
        result = newResult;
        $('.result > p').text(newResult);
    }
    function concHistory(newInput){
        history += newInput;
        setHistory(history);
    }
    function concResult(newInput){
        result += newInput;
        setResult(result);
    }

    function isDigit(newDigit){
        if(checkZeroResult()){
            setResult(newDigit);

            if(history !== "0"){
                concHistory(newDigit);
            }
            else{
                setHistory(newDigit);
            }
        }
        else if(checkSign()){
            setResult(newDigit);
            concHistory(newDigit)
        }
        else{
            concResult(newDigit);
            concHistory(newDigit)
        }
    }
    function checkHistory(){
        if(history === "LIMIT REACHED"){
            setHistory("0")
        }
    }

    function setHistory(newHistory){
        history = newHistory;
        $('.history> p').text(newHistory);
    }























})
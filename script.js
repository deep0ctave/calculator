const num_btns = Array.from(document.querySelectorAll(".btn.num"));
const op_btns = Array.from(document.querySelectorAll(".btn.op"));
const clr_btn = document.querySelector("#clear");
const del_btn = document.querySelector("#delete");
const pnt_btn = document.querySelector("#point");
const eq_to_btn = document.querySelector("#equal-to");

const current_input = document.querySelector(".current-input");
const result = document.querySelector(".result");

let curr_operator = null;
let prev_operator = null;
let val = "0";
let operand_1 = "0";
let operand_2 = "0";
let res = "0";
let op_entered = false;
let temp = "";


function add(a, b) {
   return a + b
}
  
function substract(a, b) {
   return a - b
}
  
function multiply(a, b) {
   return a * b
}
  
function divide(a, b) {
   return a / b
}
  
function operate(operator, a, b) {
   a = Number(a)
   b = Number(b)
   switch (operator) {
     case "+":
       return add(a, b)
     case "-":
       return substract(a, b)
     case "x":
       return multiply(a, b)
     case "/":
       if (b > 0) return divide(a, b)
       else alert("Division by zero not possible !")
     default:
       return null
   }
}

function handle_input(ch){

    if (["0","1","2","3","4","5","6","7","8","9","."].includes(ch)){

        console.log(ch)
        if (val === "0" && ch === "0")
        {
            val = "0";
        }
        else if (val === "0" && ch === ".")
        {
            val = "0.";
        }
        else if (ch == "." && val.includes(ch))
        {
            return;
        }
        else if (val === "0" && ch !== "0" && ch !== ".")
        {
            val = ch;
        }
        else {
            val = val + ch;
        }

        op_entered = false;
        console.log("getting number ...")
        result.textContent = val;

        if(prev_operator !== null && prev_operator !== "=")
        {
            current_input.textContent = res + " " + curr_operator;
        }
        else if(prev_operator === null && curr_operator !== null){
            current_input.textContent = res + " " + curr_operator;
        }

    }
    else if (["+","-","x","/"].includes(ch)){

            if ( op_entered === true){
                curr_operator = ch;
            }
            else {

                prev_operator = curr_operator;
                curr_operator = ch;

                if (prev_operator === null){
                    curr_operator = ch;
                    operand_1 = val;
                    res = operand_1;
                }
                else 
                {   
                    operand_2 = val;
                    res = operate(prev_operator,operand_1,operand_2);
                    curr_operator = ch;
                    operand_1 = res;
                }
            }

            val = "0";
            op_entered = true;
            console.log("Got operator")
            result.textContent = val;

            if(prev_operator !== null && prev_operator !== "=")
            {
                current_input.textContent = res + " " + curr_operator;
            }
            else if(prev_operator === null && curr_operator !== null){
                current_input.textContent = res + " " + curr_operator;
            }
        }
    else {
        if(curr_operator !== null && op_entered === false)
        {
            prev_operator = curr_operator;
            curr_operator = ch;
            operand_2 = val;
            res = operate(prev_operator,operand_1,operand_2);
            curr_operator = ch;
            current_input.textContent = operand_1 + " " + prev_operator + " " + operand_2 + " = ";
            val = String(res);
            result.textContent = val;
            operand_1 = res;
            op_entered = true;
            console.log("Got operator")
            prev_operator = null;
            curr_operator = null;
        }
    }            

    console.log(op_entered);
    console.log(operand_1,operand_2,res,prev_operator,curr_operator);
}

function clear(){
    curr_operator = null;
    prev_operator = null;
    val = "0";
    operand_1 = "0";
    operand_2 = "0";
    res = "0";
    op_entered = false;
    temp = "";
    current_input.textContent = "0";
    result.textContent = "0";
}

function delete_chr(){
    console.log(typeof(val))

    if(val !== "0"&& val.length > 1)
    {
        val = val.slice(0, -1);
    }
    else{
        val = "0"
    }
    result.textContent = val;
    op_entered = false;
}

num_btns.forEach(button => button.addEventListener('click', ch => handle_input(ch.target.textContent)));
op_btns.forEach(button => button.addEventListener('click', ch => handle_input(ch.target.textContent)));
pnt_btn.addEventListener('click', ch => handle_input(ch.target.textContent));
clr_btn.addEventListener('click', () => clear());
del_btn.addEventListener('click', () => delete_chr());
eq_to_btn.addEventListener('click', ch => handle_input(ch.target.textContent));




  
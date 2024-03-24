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

        console.log(val,ch);

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
    }
    else if (["+","-","x","/"].includes(ch)){

        if (op_entered === true){
            curr_operator = ch;
        }
        else {
            if (prev_operator === null){
                op_entered = false;
                curr_operator = ch;
                prev_operator = ch;
                res = val;
            }
            else 
            {   
                operand_1 = val;
                res = operate(prev_operator,res,operand_1);
                op_entered = false;
                curr_operator = ch;
                prev_operator = ch;
            }
            val = "0";
        }

    }
    else if (ch === "=")
    {
        console.log("ops")
        temp = operand_1;
        operand_1 = val;
        res = operate(prev_operator,res,operand_1);
        op_entered = false;
        curr_operator = ch;
        prev_operator = ch;
    }

    result.textContent = val;

    if(prev_operator !== null && prev_operator !== "=")
    {
        current_input.textContent = res + " " + prev_operator;
    }
    else if(prev_operator !== null && prev_operator === "=")
    {
        current_input.textContent = temp + " " + prev_operator + " " + operand_1 + "= ";
        result.textContent = res;
    }
}

num_btns.forEach(button => button.addEventListener('click', ch => handle_input(ch.target.textContent)));
op_btns.forEach(button => button.addEventListener('click', ch => handle_input(ch.target.textContent)));
pnt_btn.addEventListener('click', ch => handle_input(ch.target.textContent));
pnt_btn.addEventListener('click', ch => handle_input(ch.target.textContent));
eq_to_btn.addEventListener('click', ch => handle_input(ch.target.textContent));




  
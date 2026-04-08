const button = document.getElementById('rock');
let count = 0;

button.addEventListener('click',function(event) {
    count++;
    count2 = 0;
    count3 = 0;
    console.log('Clicked element:', event.target);
});

const button1 = document.getElementById('scissors');
let count2 = 0;

button1.addEventListener('click',function(event) {
    count2++;
    count = 0;
    count3 = 0;

    console.log('Clicked element:', event.target);
});

const button3 = document.getElementById('paper');
let count3 = 0;

button3.addEventListener('click',function(event) {
    count3++;
    count = 0;
    count2 = 0;
    console.log('Clicked element:', event.target);
});

var result = document.getElementById("result").value;

function startgame(){
    if(count > 0){
        document.getElementById("result").innerText = "Paper";
    }
    else if (count2 > 0) {
        document.getElementById("result").innerText = "Rock";
    }
    else{
        document.getElementById("result").innerText = "Scissors";
    }
}
function sayHello(){
    console.log("hello world");
    HowAreYou();
}

function sayGoodbye() {
    console.log("Goodbye World");
}

function HowAreYou() {
    console.log("How are you, World");
    sayGoodbye();
}

window.onload = sayHello; //execute the function when the page loads
//this means that i wait until the html and teh css are loaded before i 
//execute the js
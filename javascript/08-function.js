//------------------------------------Function Declaration---------------------------------------
// function greet(){
//     console.log("Welcome");
// }
// greet();


// function greet(name){
//     console.log("Welcome "+name);
// }
// greet("Pranav");


// function showMessage(from, text) {
//     console.log( from + ": " + text );
// }
// showMessage("Ann", "Hello there !!");
// showMessage("Ann")


// function showMessage(from, text = "no text given") {
//     console.log( from + ": " + text );
// }
// showMessage("Ann", "Hello there !!");
// showMessage("Ann");


// function showMessage(from, text = newFunction()) {
//     console.log( from + ": " + text );
// }
// function newFunction(){
//     return "no text given";
// }
// showMessage("Ann", "Hello there !!");
// showMessage("Ann");


// function canVote(age){
//     if(age>=18) return "yes";
//     else return "no";
// }
// let age = 18;
// console.log(canVote(age));


// function showCount(count){
//     console.log(count ?? "Unknown");
// }
// showCount(2);
// showCount(0);
// showCount(null);
// showCount();
// showCount(undefined);


// function doNothing(){}
// console.log(doNothing());
// console.log(doNothing() === undefined);


// function emptyReturn(){
//     return;
// }
// console.log(emptyReturn());
// console.log(emptyReturn() === undefined);



// function printPrimes(n){
//     nextPrime : 
//     for(let i=2; i<=n; i++){
//         for(let j=2; j<i; j++){
//             if(i%j==0) continue nextPrime;
//         }
//         console.log(i);
//     }
// }
// printPrimes(10);


// function showPrimes(n){
//     for(let i=2; i<=n; i++){
//         if(!isPrime(i)) continue;
//         console.log(i);
//     }
// }
// function isPrime(n){
//     for(let i=2; i<n; i++){
//         if(n%i==0) return false;
//     }
//     return true;
// }
// showPrimes(10);



// function pow(a,x){
//     let result=a;
//     for(let i=1;i<=x;i++){
//         result *= a
//     }
//     return result;
// }
// console.log(pow(2,5));

//------------------------------------Function Expression---------------------------------------

// function greet(){
    //     console.log("hello");
    // }
    // greet();
    // console.log(greet);
    
    
    
    // let greet = function(){
        //     console.log("Welcome !!!");
        // }
        // greet();
        // console.log(greet);
        
        // let wel = greet;
        // wel();
        // console.log(wel);
        
        // let welc = greet();
        // console.log(welc);
        
        
        
        // function ask(question, yes, no){
            //     if(question) yes();
            //     else no();
            // }
            // function showOk(){
                //     console.log("True");
                // }
                // function showCancel(){
                    //     console.log("False");
                    // }
                    // ask("Are you married", showOk, showCancel);
                    
                    
                    
                    // function ask(question, yes, no){
                        //     if(question) yes();
//     else no();
// }
// ask("Are you married",
//     function(){ console.log("True"); },
//     function(){ console.log("False"); }
// );



// function ask(question, yes, no){
//     if(question) yes();
//     else no();
// }
// ask("Are you married",
//     function showOk(){ console.log("True"); },
//     function showCancel(){ console.log("False"); }
// );



//------------------------------------Arrow Function---------------------------------------



// let greet = () => console.log("Welcome");
// greet();


// let welcome = (name) => console.log("Welcome "+name);
// welcome("Pranav singh");


// let sum = (a, b) => {
//     let result;
//     result = a + b;
//     return result;
// }
// console.log( sum(3, 4) );



// let ask = (question, yes, no) => {
//     if(question) yes();
//     else no();
// }
// ask(
//     "Are you married ??",
//     () => console.log("congrats !!"),
//     () => console.log("poor boy !!")
// );


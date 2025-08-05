// Callbacks

/* function myFunc() {
    console.log("Fucntion doing task-1");
    myFunc2();
}

function myFunc2() {
    console.log("Fucntion doing some task-2");
}

myFunc(); */








/* function myFunc(callback) {
    console.log("Fucntion doing task-1");
    callback();
}

function myFunc2() {
    console.log("Fucntion doing some task-2");
}

myFunc(myFunc2); */







/* function myFunc(callback) {
    console.log("Fucntion doing task-1");
    callback();
}

function myFunc2() {
    console.log("Fucntion doing some task-2");
}

myFunc(function() {
    console.log("Fucntion doing some task-2");
}); */










/* function myFunc(callback) {
    console.log("Fucntion doing task-1");
    callback();
}

function myFunc2() {
    console.log("Fucntion doing some task-2");
}

myFunc(() => {
    console.log("Fucntion doing some task-2");
}); */







/* function getTwoNumsAndAdd(num1, num2, callback) {
    console.log(num1,num2);
    callback(num1, num2)
}

function addTwoNums(number1, number2) {
    console.log(number1 + number2);
}
getTwoNumsAndAdd(5, 2, addTwoNums); */




/* function getTwoNumsAndAdd(num1, num2, callback) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        callback(num1, num2)
    } else {
        console.log("Wrong Datatype");
    }
}

function addTwoNums(number1, number2) {
    console.log(number1 + number2);
}
getTwoNumsAndAdd("5", "2", addTwoNums);
getTwoNumsAndAdd(5, 2, addTwoNums); */







/* function getTwoNumsAndAdd(num1, num2, onSuccess, onFailure) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        onSuccess(num1, num2);
    } else {
        onFailure();
    }
}

function addTwoNums(number1, number2) {
    console.log(number1 + number2);
}

function showWarning() {
    console.warn("Wrong Datatype : pass numbers only");
}

getTwoNumsAndAdd("5", "2", addTwoNums, showWarning);
getTwoNumsAndAdd(5, 2, addTwoNums, showWarning); */








function getTwoNumsAndAdd(num1, num2, onSuccess, onFailure) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        onSuccess(num1, num2);
    } else {
        onFailure();
    }
}

getTwoNumsAndAdd(
    "5",
    2,
    (num1, num2) => console.log(num1 + num2),
    () => console.warn("Wrong Datatype : pass numbers only")
    
);

getTwoNumsAndAdd(
    5,
    2,
    (num1, num2) => console.log(num1 + num2),
    () => console.warn("Wrong Datatype : pass numbers only")
    
);

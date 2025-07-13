/*
    Output every second

    Write a function printNumbers(from, to) that outputs a number every second, 
    starting from from and ending with to.

    Make two variants of the solution.
        1. Using setInterval.
        2. Using nested setTimeout.
*/


// 1. Using setInterval

function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(() => {
    console.log(current); // print the number

    if (current === to) {
      clearInterval(timerId); // stop the interval
    }

    current++;
  }, 1000); // every 1000 ms = 1 sec
}

printNumbers(1, 5);





// 2. Using nested setTimeout

function printNumbers(from, to) {
    let current = from;

    function go() {
        console.log(current); // print the number

        if (current < to) {
            setTimeout(go, 1000); // schedule next run
        }

        current++;
    }

    go(); // start the chain
}

printNumbers(1, 5);

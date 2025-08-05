"use strict"

//-----------------------------Binary Arithmetic operator-----------------------------

// console.log(2 + 3);
// console.log(2 - 3);
// console.log(2 * 3);
// console.log(2 / 3);
// console.log(3 / 2);
// console.log(2 % 3);
// console.log(2 ** 3);



//-----------------------------Unary Arithmetic oprator-----------------------------

// let apple = "4";
// let orange = "5";
// console.log(apple + orange);
// console.log(+apple + +orange);
// console.log(+true);     // 1
// console.log(+"");       // 0
// console.log(+null);     // 0


// let num = 4;
// console.log(-num);
// console.log(-true);    // -1
// console.log(-"");      // -0
// console.log(-null);    // -0



//-----------------------------Assignment operator-----------------------------

// let x;
// console.log(x = 3);

// let a, b, c;
// a = b = c = 23;
// console.log(a, b, c);

// let y = 3;
// console.log(y);
// y += 2;
// console.log(y);
// y *= 2;
// console.log(y);
// y /= 2;
// console.log(y);
// y -= 2;
// console.log(y);
// y **= 2;
// console.log(y);



//-----------------------------Inc/Dec operator-----------------------------

// let x = 2, y=2;
// console.log(x, y);
// x++;
// ++y;
// console.log(x, y);

// let a = 2, b = 2;
// console.log(a, b);
// console.log(++a, b++);
// console.log(a--, --b);



//-----------------------------Comma operator-----------------------------

// let a = (1+2, 3+4); // return the result of last exp
// console.log(a);    
// Please note that the comma operator has very low precedence, lower than =, so parentheses are important in the example above.

// let x = 3, y = 5;
// let z = (++x, y--);
// console.log(x, y, z);



//-----------------------------Output Question-----------------------------

// console.log("" + 1 + 0);       // 10
// console.log("" - 1 + 0);       // -1
// console.log(true + false);     // 1
// console.log(6 / "3");          // 2
// console.log("2" * "3");        // 6
// console.log(4 + 5 + "px");     // 9px
// console.log("$" + 4 + 5);      // $45
// console.log("4" - 2);          // 2
// console.log("4px" - 2);        // NaN
// console.log("  -9  " + 5);     // -9   5
// console.log("  -9  " - 5);     // -14
// console.log(null + 1);         // 1
// console.log(undefined + 1);    // NaN
// console.log(" \t \n" - 2);     // -2




//-----------------------------Comparison operator-----------------------------

// console.log(2 > 1);
// console.log(2 >= 1);
// console.log(2 < 1);
// console.log(2 <= 1);
// console.log(2 == 1);
// console.log(2 != 1);

// console.log('A' > 'Z');
// console.log('A' < 'Z');
// console.log('A' < 'a');
// console.log('Glow' < 'Glee'); 
// console.log('Bee' < 'Beee'); 

// console.log(true == 1);
// console.log(2 == '2');
// console.log(true === 1);
// console.log(2 === '2');

// let a = 0;
// console.log(Boolean(a));
// let b = '0';
// console.log(Boolean(b));
// console.log(a == b);

// console.log(null == undefined);
// console.log(null === undefined);

// console.log(null > 0);
// console.log(null == 0);
// console.log(null >= 0);

// console.log(undefined > 0);
// console.log(undefined == 0);
// console.log(undefined >= 0);

// console.log(2 > "12");
// console.log("1" > false);
// console.log("2" > "12");  //compare it same as string




//-----------------------------Logical operator-----------------------------

// console.log(1 || 0);
// console.log(1 && 0);
// console.log(!1);
// console.log(0 ?? null);

// console.log(0 || "" || false || null);
// console.log(1 && "pranav" && true && null);

// true || console.log("Pranav");
// false || console.log("Pranav singh");

// console.log(true || console.log("Pranav"));
// console.log(false || console.log("Pranav singh"));

// console.log(console.log());
// console.log(console.log("pranav"));

// console.log(console.log("pranav") || false);
//console.log(console.log("pranav") || true);
//console.log(console.log(1) || 2 || console.log(3));

// console.log(console.log(1) || console.log(2));
// console.log(console.log(1) && console.log(2));


// console.log(!false);
// console.log(!null);
// console.log(!undefined);
// console.log(!0);
// console.log(!"");

// console.log(!!false);
// console.log(!!null);
// console.log(!!undefined);
// console.log(!!0);
// console.log(!!"");

// console.log(null ??  "pranav");
// console.log(undefined ??  "pranav");
// console.log(null ?? undefined ?? "pranav");
// console.log(null ?? undefined);

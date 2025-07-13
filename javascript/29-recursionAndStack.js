//iterative way
function pow1(x, n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= x;
    }
    return result;
}
console.log(pow1(2, 5));

//recursive way
function pow2(x, n) {
    if (n === 0) return 1;
    if (n === 1) return x;
    return x * pow2(x, n - 1);
}
console.log(pow2(2, 5));

//----------------->Recursive traversals

let company = {
    sales: [
        {
            name: "John",
            salary: 1000,
        },
        {
            name: "Alice",
            salary: 1600,
        },
    ],

    development: {
        sites: [
            {
                name: "Peter",
                salary: 2000,
            },
            {
                name: "Alex",
                salary: 1800,
            },
        ],

        internals: [
            {
                name: "Jack",
                salary: 1300,
            },
        ],
    },
};

function sumSalaries( department ) {
    if (Array.isArray(department)) {
        return department.reduce((acc, curr) => acc + curr.salary , 0);
    }
    else {
        let sum = 0;
        for (let subDepartment of Object.values(department)) {
            sum += sumSalaries(subDepartment);
        }
        return sum;
    }
}

console.log(sumSalaries(company));

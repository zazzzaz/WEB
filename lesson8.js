function pickPropArray(arr, prop) {
    return arr.map(obj => obj[prop])
        .filter(Boolean);
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
];

const result = pickPropArray(students, 'name')

console.log(result)
// [ 'Павел', 'Иван', 'Эдем', 'Денис', 'Виктория' ]



function createCounter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const counter1 = createCounter()
counter1() // 1
counter1() // 2

const counter2 = createCounter()
counter2() // 1
counter2() // 2


function spinWords(str) {
    const words = str.split(' ');

    const reversedWords = [];

    for (let word of words) {
        if (word.length >= 5) {
            word = word.split('');
            word = word.reverse();
            word = word.join('');
        }
        reversedWords.push(word);
    }
    return reversedWords.join(' ');
}

const result1 = spinWords("Привет от Legacy");
console.log(result1); // тевирП от ycageL

const result2 = spinWords("This is a test");
console.log(result2); // This is a test


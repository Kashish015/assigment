const express = require('express');
const readline = require('readline');

const app = express();
app.use(express.json({ limit: '10mb' }));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter a numbers(comma seperated):");

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
    }
    
    console.log(`${stringCalculator(input)}`);
});

rl.on('close', () => {
    process.exit(0);
});

const port = 3000;

app.use(express.json())

// Start the server
const server = app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
});


function stringCalculator(input) {
    if (!input) return 0;
    input = input.replace(/\n/g, ',').replace(/\\n/g, ',').replace(/;/g, ',')
    input = input.split('//').join(',');
    let numbers = input.split(",").map(Number);
    
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }
    
    return numbers.reduce((sum, num) => sum + num, 0);
}
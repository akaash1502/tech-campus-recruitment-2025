const fs = require('fs');
const readline = require('readline');
const path = require('path');

if (process.argv.length < 3) {
    console.error("Usage: node extract_logs.js <YYYY-MM-DD>");
    process.exit(1);
}

const date = process.argv[2]; 
const logFilePath = "logs_2024.log";  // Assuming the log file is named logs.log
const outputDir = path.join(__dirname, "..", "output"); 
const outputFile = path.join(outputDir, `output_${date}.txt`);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Create output write stream
const writeStream = fs.createWriteStream(outputFile, { flags: 'w' });

// Read the log file line-by-line
const readStream = fs.createReadStream(logFilePath);
const rl = readline.createInterface({ input: readStream });

rl.on('line', (line) => {
    if (line.startsWith(date)) {
        writeStream.write(line + '\n');
    }
});

rl.on('close', () => {
    console.log(`Logs for ${date} extracted successfully to ${outputFile}`);
    writeStream.end();
});

rl.on('error', (err) => {
    console.error("Error reading file:", err);
    process.exit(1);
});

writeStream.on('error', (err) => {
    console.error("Error writing file:", err);
    process.exit(1);
});

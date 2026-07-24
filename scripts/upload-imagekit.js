/* eslint-disable */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, "../.env.local");
let imagekitPrivateKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/^IMAGEKIT_PRIVATE_KEY=(.*)$/m);
  if (match) {
    imagekitPrivateKey = match[1].trim();
  }
}

if (!imagekitPrivateKey) {
  console.error("Error: IMAGEKIT_PRIVATE_KEY not found in .env.local");
  process.exit(1);
}

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/upload-imagekit.js <file_path>");
  process.exit(1);
}

const filePath = path.resolve(inputPath);
if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found at path "${filePath}"`);
  process.exit(1);
}

const fileName = path.basename(filePath);

console.log(`Uploading "${fileName}" to ImageKit root...`);

const cmd = `curl -s -u "${imagekitPrivateKey}:" \
  -F "file=@${filePath}" \
  -F "fileName=${fileName}" \
  -F "useUniqueFileName=false" \
  -F "folder=/" \
  https://upload.imagekit.io/api/v1/files/upload`;

try {
  const response = execSync(cmd).toString();
  const json = JSON.parse(response);
  if (json.error || json.message) {
    console.error("Upload failed:", json.message || json.error);
  } else {
    console.log("Upload successful!");
    console.log("File Name:", json.name);
    console.log("Public URL:", json.url);
  }
} catch (error) {
  console.error("Upload failed:", error.message || error);
}

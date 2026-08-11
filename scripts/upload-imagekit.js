/* eslint-disable */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function getEnvVar(varName) {
  const paths = [
    path.join(__dirname, "../.env.local"),
    path.join(__dirname, "../.env"),
  ];
  for (const envPath of paths) {
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const regex = new RegExp(`^${varName}=(.*)$`, "m");
      const match = envContent.match(regex);
      if (match) {
        return match[1].trim();
      }
    }
  }
  return "";
}

const isPreview = process.argv.includes("--preview");
const keyName = isPreview
  ? "IMAGEKIT_PRIVATE_KEY_PREVIEW"
  : "IMAGEKIT_PRIVATE_KEY";
const imagekitPrivateKey = getEnvVar(keyName);

if (!imagekitPrivateKey) {
  console.error(`Error: ${keyName} not found in .env.local or .env`);
  process.exit(1);
}

const args = process.argv.slice(2).filter((arg) => arg !== "--preview");
const inputPath = args[0];

if (!inputPath) {
  console.error(
    "Usage: node scripts/upload-imagekit.js <file_path> [--preview]",
  );
  process.exit(1);
}

const filePath = path.resolve(inputPath);
if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found at path "${filePath}"`);
  process.exit(1);
}

const fileName = path.basename(filePath);

console.log(
  `Uploading "${fileName}" to ImageKit root using ${isPreview ? "Preview" : "Production"} credentials...`,
);

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

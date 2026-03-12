// generate-env.js
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const generateEnvContent = (envFilePath) => {
  // Load the file if it exists, but don't fail if it doesn't
  const envConfig = dotenv.config({ path: envFilePath }).parsed || {};
  
  // Vercel injects variables directly into process.env, so we need to check both!
  const apiUrl = process.env.API_URL || envConfig.API_URL;

  if (!apiUrl) {
    console.error(`Error: API_URL not found in ${envFilePath} or process.env`);
    return `export const environment = { production: ${envFilePath.includes('.prod')}, API_URL: '' };`;
  }

  return `
export const environment = {
  production: ${envFilePath.includes('.prod')}, // Set production flag based on filename
  API_URL: '${apiUrl}'
};
`;
};

const envDevPath = path.resolve(__dirname, '.env');
const envProdPath = path.resolve(__dirname, '.env.prod');

const envDevOutputPath = path.resolve(__dirname, 'src/environments/environment.ts');
const envProdOutputPath = path.resolve(__dirname, 'src/environments/environment.prod.ts');

try {
  const devContent = generateEnvContent(envDevPath);
  fs.writeFileSync(envDevOutputPath, devContent, 'utf8');
  console.log(`Successfully generated ${envDevOutputPath}`);
} catch (error) {
  console.error(`Failed to generate ${envDevOutputPath}:`, error);
}

try {
  const prodContent = generateEnvContent(envProdPath);
  fs.writeFileSync(envProdOutputPath, prodContent, 'utf8');
  console.log(`Successfully generated ${envProdOutputPath}`);
} catch (error) {
  console.error(`Failed to generate ${envProdOutputPath}:`, error);
}

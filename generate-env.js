// generate-env.js
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const generateEnvContent = (envFilePath) => {
  const envConfig = dotenv.config({ path: envFilePath }).parsed;

  if (!envConfig || !envConfig.API_URL) {
    console.error(`Error: API_URL not found in ${envFilePath}`);
    return `export const environment = { production: ${envFilePath.includes('.prod')}, API_URL: '' };`;
  }

  return `
export const environment = {
  production: ${envFilePath.includes('.prod')}, // Set production flag based on filename
  API_URL: '${envConfig.API_URL}'
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

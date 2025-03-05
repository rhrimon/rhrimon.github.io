import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix paths in HTML files
function fixPaths(htmlFile) {
  console.log(`Processing: ${htmlFile}`);
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // Replace all occurrences of /_next/ with ./_next/
  content = content.replace(/\/_next\//g, './_next/');
  
  // Remove favicon link tag from HTML
  content = content.replace(/<link rel="icon"[^>]*>/g, '');
  
  // Remove favicon references in JavaScript - more aggressive approach
  content = content.replace(/\[\"link\",\"2\",\{[^\]]*\"favicon[^\]]*\]\]/g, '');
  content = content.replace(/\"favicon\.ico\"/g, '""');
  
  // Direct string replacement for the specific favicon reference in the last script
  // Use a simpler approach to avoid linter errors
  const faviconPattern = /\["link","2",\{"rel":"icon"[^\]]*\]\]/g;
  content = content.replace(faviconPattern, '');
  
  fs.writeFileSync(htmlFile, content);
  console.log(`Fixed paths in: ${htmlFile}`);
}

// Main function
function main() {
  const outDir = path.join(__dirname, 'out');
  const htmlFiles = findHtmlFiles(outDir);
  
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  htmlFiles.forEach(fixPaths);
  
  console.log('All paths fixed successfully!');
}

main(); 
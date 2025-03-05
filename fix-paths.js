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
  
  // Fix multiline class attributes that cause JS parsing errors
  // This regex finds class attributes with newlines and normalizes them
  content = content.replace(/class="([^"]*)(\r?\n)(\s*)([^"]*)(\r?\n)(\s*)([^"]*)"/g, 'class="$1 $4 $7"');
  
  // Use a simpler approach to avoid linter errors
  const faviconPattern = /\["link","2",\{"rel":"icon"[^\]]*\]\]/g;
  content = content.replace(faviconPattern, '');
  
  // Fix JavaScript syntax errors with escaped characters
  // Replace escaped arrow functions to ensure proper semicolons
  content = content.replace(/section =\\u003e \{/g, 'section => {');
  content = content.replace(/link =\\u003e \{/g, 'link => {');
  
  // Fix logical operators
  content = content.replace(/\\u0026\\u0026/g, '&&');
  content = content.replace(/\\u003e=/g, '>=');
  content = content.replace(/\\u003c/g, '<');
  
  // Normalize any remaining escape sequences in JavaScript
  content = content.replace(/(self.__next_f=self.__next_f\|\|\[\])\.push\(\[1,"[^"]*\\u[^"]*"\]\)/g, 
                           match => match.replace(/\\u([0-9a-fA-F]{4})/g, (m, code) => 
                                               String.fromCharCode(parseInt(code, 16))));
  
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
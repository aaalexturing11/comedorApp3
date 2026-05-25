const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');

if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  
  // 1. Replace NAVBAR
  // Navbar starts with <!-- NAVBAR -->
  // Ends with </div>\n    </div>  after <div id="mobile-menu" ...>
  // We'll use a regex that matches from <!-- NAVBAR --> to the next <!--
  const navRegex = /<!-- NAVBAR -->[\s\S]*?(?=<!-- \w)/;
  content = content.replace(navRegex, "<!-- NAVBAR -->\n    <%- include('partials/navbar') %>\n\n    ");

  // 2. Replace FOOTER
  // Footer starts with <!-- FOOTER -->
  // Ends right before </body>
  const footRegex = /<!-- FOOTER -->[\s\S]*?(?=<\/body>)/;
  content = content.replace(footRegex, "<!-- FOOTER -->\n    <%- include('partials/footer') %>\n");

  const newPath = path.join(viewsDir, file.replace('.html', '.ejs'));
  fs.writeFileSync(newPath, content);
  
  // Delete the original .html file
  fs.unlinkSync(path.join(publicDir, file));
  
  console.log(`Migrated ${file} to views/${file.replace('.html', '.ejs')}`);
}

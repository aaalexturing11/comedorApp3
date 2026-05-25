const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (imágenes, CSS, JS del frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => res.render('index', { activePage: 'index' }));
app.get('/index.html', (req, res) => res.render('index', { activePage: 'index' }));

const pages = [
  'comedorEscobedo', 'comedorGarcia', 'comedorGuadalupe', 
  'comedorJuarez', 'contactanos', 'cuentas', 
  'informe', 'laAsociacion'
];

pages.forEach(page => {
  // Rutas sin extensión y con extensión .html para mantener retrocompatibilidad
  app.get(`/${page}`, (req, res) => res.render(page, { activePage: page }));
  app.get(`/${page}.html`, (req, res) => res.render(page, { activePage: page }));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

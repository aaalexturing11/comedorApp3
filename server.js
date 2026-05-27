/**
 * @fileoverview Main entry point for the Express application.
 */

const express = require('express');
const path = require('path');

/** @type {import('express').Application} */
const app = express();

/** @type {number | string} */
const port = process.env.PORT || 8080;

// ----- View Engine Setup -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Static Middleware -----
app.use(express.static(path.join(__dirname, 'public')));

// ----- Core Routes -----
app.get('/', (req, res) => res.render('index', { activePage: 'index' }));
app.get('/index.html', (req, res) => res.render('index', { activePage: 'index' }));

/** @type {string[]} */
const pageRoutes = [
    'contactanos',
    'cuentas',
    'donar',
    'informe',
    'nosotros',
    'comedores'
];

pageRoutes.forEach((page) => {
    app.get(`/${page}`, (req, res) => res.render(page, { activePage: page }));
    app.get(`/${page}.html`, (req, res) => res.render(page, { activePage: page }));
});

// ----- Error Handler Middleware -----
app.use((req, res) => {
    res.status(404).render('index', { activePage: 'index' });
});

// ----- Server Initialization -----
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

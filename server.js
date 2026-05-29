/**
 * @fileoverview Main entry point for the Express application.
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const { donation } = require('./lib/donation');
const contactRoutes = require('./routes/contact');

/** @type {import('express').Application} */
const app = express();

/** @type {number | string} */
const port = process.env.PORT || 8080;

// ----- View Engine Setup -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Body Parsing -----
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

// ----- Static Middleware -----
app.use(express.static(path.join(__dirname, 'public')));

// ----- Form Routes -----
app.use(contactRoutes);

// ----- Core Routes -----
app.get('/', (req, res) => res.render('index', { activePage: 'index' }));
app.get('/index.html', (req, res) => res.render('index', { activePage: 'index' }));

app.get('/contactanos', (req, res) => {
    res.render('contactanos', {
        activePage: 'contactanos',
        formStatus: req.query.enviado ? 'success' : req.query.error || null
    });
});
app.get('/contactanos.html', (req, res) => res.redirect(301, '/contactanos'));

app.get('/donar', (req, res) => {
    res.render('donar', { activePage: 'donar', donation });
});
app.get('/donar.html', (req, res) => res.redirect(301, '/donar'));

app.get('/cuentas', (req, res) => res.redirect(301, '/donar'));
app.get('/cuentas.html', (req, res) => res.redirect(301, '/donar'));

/** @type {string[]} */
const pageRoutes = ['informe', 'nosotros', 'comedores'];

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

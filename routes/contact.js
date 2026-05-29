const express = require('express');
const { sendContactEmail } = require('../lib/email');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {unknown} value
 * @returns {string}
 */
function clean(value) {
    return String(value ?? '').trim();
}

router.post('/contactanos', async (req, res) => {
    if (clean(req.body.website)) {
        return res.redirect('/contactanos?enviado=1');
    }

    const name = clean(req.body.name);
    const email = clean(req.body.email);
    const subject = clean(req.body.subject);
    const message = clean(req.body.message);

    if (!name || !email || !subject || !message) {
        return res.redirect('/contactanos?error=campos');
    }

    if (!EMAIL_RE.test(email) || name.length > 120 || subject.length > 200 || message.length > 5000) {
        return res.redirect('/contactanos?error=invalido');
    }

    try {
        await sendContactEmail({ name, email, subject, message });
        return res.redirect('/contactanos?enviado=1');
    } catch (err) {
        console.error('Error al enviar contacto:', err);
        const code = err instanceof Error && err.message === 'SMTP_NOT_CONFIGURED'
            ? 'smtp'
            : 'servidor';
        return res.redirect(`/contactanos?error=${code}`);
    }
});

module.exports = router;

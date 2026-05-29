const nodemailer = require('nodemailer');

/** @type {import('nodemailer').Transporter | null} */
let transporter = null;

/**
 * @returns {import('nodemailer').Transporter | null}
 */
function getTransporter() {
    if (transporter) return transporter;

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) return null;

    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
    });

    return transporter;
}

/**
 * @param {{ name: string; email: string; subject: string; message: string }} payload
 * @returns {Promise<void>}
 */
async function sendContactEmail(payload) {
    const transport = getTransporter();
    if (!transport) {
        throw new Error('SMTP_NOT_CONFIGURED');
    }

    const to = process.env.CONTACT_TO_EMAIL || 'unete@comedordelospobres.org';
    const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

    await transport.sendMail({
        from: `"Sitio Comedor de los Pobres" <${from}>`,
        to,
        replyTo: `"${payload.name}" <${payload.email}>`,
        subject: `[Contacto web] ${payload.subject}`,
        text: [
            `Nombre: ${payload.name}`,
            `Correo: ${payload.email}`,
            `Asunto: ${payload.subject}`,
            '',
            'Mensaje:',
            payload.message
        ].join('\n'),
        html: `
            <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Correo:</strong> ${escapeHtml(payload.email)}</p>
            <p><strong>Asunto:</strong> ${escapeHtml(payload.subject)}</p>
            <hr>
            <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
        `
    });
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = { sendContactEmail, getTransporter };

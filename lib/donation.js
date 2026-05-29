/**
 * Datos oficiales de donación (única fuente de verdad para cuentas y PayPal).
 * @type {Readonly<{
 *   holder: string;
 *   rfc: string;
 *   paypalHostedButtonId: string;
 *   banks: ReadonlyArray<{
 *     id: string;
 *     name: string;
 *     accountDisplay: string;
 *     accountCopy: string;
 *     clabeDisplay: string;
 *     clabeCopy: string;
 *   }>;
 * }>}
 */
const donation = Object.freeze({
    holder: 'Juan XXIII al Servicio de los Pobres, A.C.',
    rfc: 'JXS-691024-U2A',
    paypalHostedButtonId: '4DESX3LB9LFRC',
    banks: Object.freeze([
        Object.freeze({
            id: 'banbajio',
            name: 'BanBajío',
            accountDisplay: '014 597 637 0201',
            accountCopy: '0145976370201',
            clabeDisplay: '030 580 9000 0628 1824',
            clabeCopy: '030580900006281824'
        }),
        Object.freeze({
            id: 'afirme',
            name: 'AFIRME',
            accountDisplay: '101-118-754',
            accountCopy: '101118754',
            clabeDisplay: '062 580 0010 1118 7547',
            clabeCopy: '062580001011187547'
        })
    ])
});

module.exports = { donation };

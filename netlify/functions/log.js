/**  netlify/functions/log.js  */

exports.handler = async (event) => {
  try {
    /* ---------- datos básicos ---------- */
    const { action = 'sin_accion', details = '' } = JSON.parse(event.body || '{}');
    const ip        = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'desconocida';
    const timestamp = new Date().toISOString();

    const log = { timestamp, ip, action, details, key: '12345ABC' };

    /* ---------- tu Apps Script ---------- */
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbxCFSSwT2rRm1SICkKR-YX4jJpvHBuecv7P9s1iVwl3UWwmVBvO4wkTb4T6xrEbqaXxDg/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log)
    });

    const text = await response.text();          // Apps Script devuelve texto
    console.log('Respuesta de Google:', text);   // para depurar en los deploy logs

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, respuestaGoogle: text })
    };

  } catch (err) {
    console.error('Error en función log:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};

const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { action, details } = JSON.parse(event.body);
    const ip = event.headers['x-forwarded-for'] || 'desconocida';
    const timestamp = new Date().toISOString();

    const log = {
      timestamp,
      ip,
      action,
      details,
      key: '12345ABC'
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxCFSSwT2rRm1SICkKR-YX4jJpvHBuecv7P9s1iVwl3UWwmVBvO4wkTb4T6xrEbqaXxDg/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' }
    });

    const text = await response.text(); // leer como texto
    console.log('Respuesta de Google:', text); // ← AÑADE ESTA LÍNEA

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, respuestaGoogle: text }) // JSON válido
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }) // JSON válido
    };
  }
};

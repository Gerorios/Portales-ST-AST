const mysql = require('mysql2/promise');

exports.handler = async function () {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    const [rows] = await connection.execute(
      "SELECT apellido_nombre, fecha_nacimiento FROM snuempleados WHERE borrado <> 'S'"
    );

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const cumples = rows.map(row => {
      const nacimiento = new Date(row.fecha_nacimiento);
      const mes = nacimiento.getMonth();
      const dia = nacimiento.getDate();

      let proximo = new Date(hoy.getFullYear(), mes, dia);
      if (proximo < hoy) proximo = new Date(hoy.getFullYear() + 1, mes, dia);

      const diffDias = Math.round((proximo - hoy) / (1000 * 60 * 60 * 24));

      return {
        nombre: row.nombre,
        fecha: nacimiento.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }),
        dias_faltantes: diffDias,
        es_hoy: diffDias === 0,
      };
    }).sort((a, b) => a.dias_faltantes - b.dias_faltantes);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cumples),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  } finally {
    if (connection) await connection.end();
  }
};
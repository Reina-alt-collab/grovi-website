export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
      <div className="text-sm text-gray-600 mb-8 text-center">
        Última actualización: {new Date().toLocaleDateString('es-ES')}
      </div>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🍪 Uso de Cookies y Google Analytics</h2>
          <p className="mb-4">
            Grovi.net utiliza Google Analytics para comprender cómo los visitantes 
            interactúan con nuestro sitio web. Esto nos ayuda a mejorar nuestros 
            servicios y contenido de manera continua.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">📊 Datos que Recopilamos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Páginas visitadas y duración de la sesión</li>
            <li>Ubicación geográfica aproximada (país/ciudad)</li>
            <li>Tipo de dispositivo y navegador utilizado</li>
            <li>Fuente de tráfico (Google, redes sociales, enlaces directos)</li>
            <li>Interacciones con formularios y elementos del sitio</li>
            <li>Patrones de navegación y comportamiento en el sitio</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">🎯 Finalidad del Tratamiento:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analizar el rendimiento y uso del sitio web</li>
            <li>Mejorar la experiencia del usuario</li>
            <li>Optimizar el contenido y la estructura del sitio</li>
            <li>Comprender las necesidades de nuestros visitantes</li>
            <li>Generar estadísticas anónimas de uso</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">✅ Tus Derechos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Consentimiento:</strong> Puedes aceptar o rechazar las cookies en cualquier momento</li>
            <li><strong>Transparencia:</strong> Todos los datos recopilados son completamente anónimos</li>
            <li><strong>Control:</strong> Puedes deshabilitar las cookies desde tu navegador</li>
            <li><strong>Acceso:</strong> Puedes solicitar información sobre los datos procesados</li>
            <li><strong>Eliminación:</strong> Puedes solicitar la eliminación de tus datos</li>
            <li><strong>Portabilidad:</strong> Puedes solicitar una copia de tus datos</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">🔒 Seguridad y Confidencialidad:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>No vendemos ni compartimos datos personales con terceros</li>
            <li>Los datos se procesan de forma agregada y anónima</li>
            <li>Utilizamos las medidas de seguridad de Google Analytics</li>
            <li>El acceso a los datos está limitado al personal autorizado</li>
            <li>Cumplimos con el RGPD y normativas de protección de datos</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">⏰ Retención de Datos:</h3>
          <p className="mb-4">
            Los datos de Google Analytics se conservan durante un máximo de 26 meses, 
            después de los cuales se eliminan automáticamente. Puedes solicitar la 
            eliminación anticipada de tus datos en cualquier momento.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">🌍 Transferencias Internacionales:</h3>
          <p className="mb-4">
            Google Analytics puede transferir datos a servidores ubicados fuera del 
            Espacio Económico Europeo. Google garantiza un nivel adecuado de protección 
            mediante cláusulas contractuales tipo y otras salvaguardas apropiadas.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">📞 Información de Contacto:</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-2">
              <strong>Responsable del tratamiento:</strong> Grovi
            </p>
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:soporte@grovi.net" className="text-blue-600 hover:underline">soporte@grovi.net</a>
            </p>
            <p className="mb-2">
              <strong>Teléfono:</strong> <a href="tel:+34695920917" className="text-blue-600 hover:underline">+34 695 920 917</a>
            </p>
            <p>
              <strong>Dirección:</strong> Málaga, España
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">🔄 Cambios en esta Política:</h3>
          <p className="mb-4">
            Nos reservamos el derecho a actualizar esta política de privacidad. 
            Los cambios significativos se notificarán mediante nuestro sitio web. 
            Te recomendamos revisar esta página periódicamente para estar informado 
            de cualquier actualización.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">⚖️ Autoridad de Control:</h3>
          <p className="mb-4">
            Si tienes alguna inquietud sobre cómo manejamos tus datos, puedes 
            contactar con la Agencia Española de Protección de Datos (AEPD) en 
            <a href="https://www.aepd.es" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> www.aepd.es</a>
          </p>
        </section>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
          <p className="text-blue-800">
            <strong>💡 Nota:</strong> Esta política se aplica únicamente al sitio web grovi.net. 
            Los enlaces externos pueden tener sus propias políticas de privacidad que 
            recomendamos leer antes de proporcionar información personal.
          </p>
        </div>
      </div>
    </div>
  )
}
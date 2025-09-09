<script>
  // Eliminamos el 'lang="ts"' ya que puede causar problemas en Astro
  let loading = false;
  let status = '';
  let statusClass = '';
  let responseInfo = '';
  const url = 'https://zonatmo.com/';
  const proxy = 'https://corsproxy.io/?';

const RESPONSES = {
  200: { 
    type: 'success', 
    messages: [
      '✅ Tranquilo, no se cayó... todavía.',
      '🌐 Milagro: ¡funciona sin explotar!',
      '🚀 Contra todo pronóstico, está vivo.',
      '🎉 ¡Quien lo diria TMO esta bien xd!'
    ] 
  },
  404: { 
    type: 'warning', 
    messages: [
      '🕵️‍♂️ 404: Lo buscamos con lupa y nada.',
      '📭 Esa página se fue a comprar cigarros y no volvió.',
      '❓ Error 404: Como tus ganas de estudiar, desapareció.',
      '👋 TMO se fue como tu papa y no volvió. (404) xd'
    ] 
  },
  403: { 
    type: 'error', 
    messages: [
      '🚫 403: Aquí no entras ni con padrino.',
      '🔒 Acceso denegado, no eres VIP.',
      '⛔ El sitio dijo: “tú no pasas”.'
    ] 
  },
  500: { 
    type: 'error', 
    messages: [
      '💥 500: El servidor explotó en mil pedazos.',
      '🛠️ Están parchando con cinta adhesiva.',
      '⚡ Error interno: básicamente, se rompió todo.',
      '💻👶 Algun practicante de IT la regó.'
    ] 
  },
  timeout: { 
    type: 'warning', 
    messages: [
      '⏳ Timeout: cargó más lento que Windows XP.',
      '🐢 Va tan lento que podrías hacerte un café.',
      '⌛ El servidor dijo “espera tantito” y se fue.',
      '📡 la conexión esta demorada como el final de one peace'
    ] 
  },
  offline: { 
    type: 'error', 
    messages: [
      '📴 El sitio murió. F por TMO.',
      '❌ Está más caído que tus planes del viernes.',
      '🌑 El servidor se fue de vacaciones sin avisar.',
      '🛑 TMO está como todos los personajes de jjk, muerto.'
    ] 
  },
  slow: { 
    type: 'warning', 
    messages: [
      '🐌 Responde, pero con la velocidad de una abuelita en WhatsApp.',
      '⚠️ Funciona, pero arrástralo con paciencia.',
      '⏱️ Más lento que Netflix en modem de 56k.'
    ] 
  }
};


  function getRandomMessage(statusCode, responseTime = 0) {
    let category;
    if (statusCode === null || statusCode === 0) {
      category = 'offline';
    } else if (statusCode === 404) {
      category = 404;
    } else if (statusCode === 403 || statusCode === 401) {
      category = 403;
    } else if (typeof statusCode === 'number' && statusCode >= 500) {
      category = 500;
    } else if (typeof statusCode === 'number' && statusCode >= 200 && statusCode < 300) {
      category = responseTime > 3000 ? 'slow' : 200;
    } else if (statusCode === 'timeout') {
      category = 'timeout';
    } else {
      category = 'offline';
    }
    const response = RESPONSES[category] || RESPONSES.offline;
    const randomMessage = response.messages[Math.floor(Math.random() * response.messages.length)];
    return { message: randomMessage, type: response.type };
  }

  async function checkWebsite() {
    loading = true;
    status = 'Verificando...';
    statusClass = 'text-blue-600 bg-blue-50 border-blue-200';
    responseInfo = '';
    const startTime = performance.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(proxy + url, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache',
        mode: 'cors'
      });
      
      clearTimeout(timeoutId);
      const responseTime = Math.round(performance.now() - startTime);
      const result = getRandomMessage(response.status, responseTime);
      
      status = result.message;
      statusClass = result.type === 'success'
        ? 'text-green-700 bg-green-100 border-green-300'
        : result.type === 'warning'
        ? 'text-yellow-800 bg-yellow-100 border-yellow-300'
        : 'text-red-700 bg-red-100 border-red-300';
      
      responseInfo = `Estado: ${response.status} | Tiempo: ${responseTime}ms | ${new Date().toLocaleTimeString()}`;
    } catch (error) {
      const responseTime = Math.round(performance.now() - startTime);
      const result = getRandomMessage(null);
      
      status = result.message;
      statusClass = 'text-red-700 bg-red-100 border-red-300';
      responseInfo = `Error | Tiempo: ${responseTime}ms | ${new Date().toLocaleTimeString()}`;
    }
    
    loading = false;
  }
</script>

<div class="flex flex-col items-center justify-center mt-10">
  <button
    class="inline-block px-8 py-3 rounded-full bg-[#2957ba] hover:bg-indigo-500 transition font-medium text-white shadow-lg mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
    type="button"
    on:click={checkWebsite}
    disabled={loading}
  >
    {#if loading}
      ⏳ Verificando...
    {:else}
      🚀 Verificar ahora
    {/if}
  </button>

  {#if status}
    <div class="text-lg font-semibold px-6 py-4 rounded-lg border mt-2 transition-all duration-500 {statusClass}" style="min-width:260px;">
      {status}
      {#if responseInfo}
        <div class="text-sm opacity-75 mt-2">{responseInfo}</div>
      {/if}
    </div>
  {/if}
</div>
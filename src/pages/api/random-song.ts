// src/pages/api/random-song.ts
import type { APIRoute } from 'astro';
import { YouTubeService } from '@services/YoutubeService';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const apiKey = body.apiKey;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key requerida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obtener canción aleatoria
    const video = await YouTubeService.getRandomAnimeOpening(apiKey);

    return new Response(JSON.stringify(video), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error en /api/random-song:', err);

    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        fallback: YouTubeService['FALLBACK_VIDEO'],
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Opcional: endpoint GET para pruebas rápidas desde el navegador
export const GET: APIRoute = async ({ url }) => {
  const apiKey = url.searchParams.get('apiKey');

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key requerida' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const video = await YouTubeService.getRandomAnimeOpening(apiKey);

  return new Response(JSON.stringify(video), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

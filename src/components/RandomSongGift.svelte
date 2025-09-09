<script lang="ts">
  import { onMount } from 'svelte';
  
  export let initialSongUrl: string = '';
  export let initialSongTitle: string = '';
  export let apiKey: string = '';

  let songUrl = initialSongUrl;
  let songTitle = initialSongTitle;
  let loading = false;
  let error = false;

  onMount(() => {
    if (!songUrl) {
      getNewSong();
    }
  });
  async function getNewSong() {
    if (!apiKey) return;
    
    loading = true;
    error = false;
    
    try {
      const response = await fetch('/api/random-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch new song');
      }
      
      const data = await response.json();
      songUrl = data.url;
      songTitle = data.title;
    } catch (err) {
      error = true;
      console.error('Error getting new song:', err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="mt-8 p-6 bg-gradient-to-r from-pink-100 to-indigo-100 rounded-2xl shadow-lg border">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-2xl font-bold text-[#2957ba]">🎁 Tu canción de anime del día</h2>
     
 
  </div>
  
  <p class="text-gray-700 mb-4">
    Disfrútala mientras se levanta TMO.
  </p>
  
 
  
  <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
    <a 
      href={songUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-block px-6 py-3 bg-[#2957ba] hover:bg-indigo-500 text-white font-semibold rounded-full shadow transition"
    >
      ▶️ {songTitle}
    </a>
    
    <a 
      href={songUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-sm text-[#2957ba] hover:underline"
    >
      Ver en YouTube 🔗
    </a>
  </div>
</div>
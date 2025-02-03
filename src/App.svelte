<script>
  import { onMount } from "svelte";

  const token = "BQASRfYAGOJQyE8_HCWMXNPDsFeFuG6xByHxHutYs29eFnvJlpX87q7lJSlBh99bNo_YZYeQ2qZeFEzDHfep4T8NpSStOJa45v_NkkiDKUJCxd1PeJh143ZtXLtOegH-m19xGakSTiP-qglz0RvyY8HbajSIWCnq7nm39zz5aqekb7szbPO3FeeMlOVoeoFoztJY-8EJqwQvDNq7E-eWFAUej38r-lYRkHdgRebDn_w7fWSiZ5GL8FPdzSsfMMF8MYJMY5fZRaDNOHBwAXSOGGkyKl6Luh1pjbx8OObI1YWRzIakfCraAXPvdQo0"; // ⚠️ Spotify API Access Token으로 변경

  let searchQuery = ""; // 검색어
  let searchResults = []; // 검색 결과
  let selectedTracks = []; // 선택한 트랙 목록
  let playlistId = null; // 생성된 플레이리스트 ID
  let isLoading = false;

  async function fetchWebApi(endpoint, method = "GET", body = null) {
    try {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method,
        body: body ? JSON.stringify(body) : null,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Spotify API Error:", errorData);
        return null;
      }

      return res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  async function searchTracks() {
    if (!searchQuery) return;

    const data = await fetchWebApi(`v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`);
    if (data && data.tracks) {
      searchResults = data.tracks.items;
    }
  }

  function addTrackToPlaylist(track) {
    if (!selectedTracks.some((t) => t.uri === track.uri)) {
      selectedTracks = [...selectedTracks, track]; // 트랙 객체 저장
    }
  }

  function removeTrackFromPlaylist(track) {
    selectedTracks = selectedTracks.filter((t) => t.uri !== track.uri);
  }

  async function createPlaylist() {
    if (selectedTracks.length === 0) return alert("곡을 먼저 선택하세요!");

    isLoading = true;
    const userData = await fetchWebApi("v1/me");
    if (!userData) {
      isLoading = false;
      return;
    }

    const user_id = userData.id;
    const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, "POST", {
      name: "My Svelte Playlist",
      description: "Playlist created in Svelte",
      public: false,
    });

    if (!playlist) {
      isLoading = false;
      return;
    }

    await fetchWebApi(`v1/playlists/${playlist.id}/tracks`, "POST", {
      uris: selectedTracks.map((track) => track.uri),
    });

    playlistId = playlist.id;
    isLoading = false;
  }
</script>

<style>
  .search-container {
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    padding: 10px;
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .track-list {
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
  }

  .track {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background 0.2s;
  }

  .track:hover {
    background: #f4f4f4;
  }

  .track img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .button-container {
    text-align: center;
    margin-top: 20px;
  }

  button {
    background: #1DB954;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #17a74a;
  }

  .selected-tracks {
    max-width: 600px;
    margin: 20px auto;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 10px;
  }

  .selected-tracks h3 {
    text-align: center;
    color: #333;
  }

  .selected-track {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .remove-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }

  .remove-btn:hover {
    background: #c0392b;
  }

  .playlist-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    text-align: center;
  }

  iframe {
    width: 100%;
    height: 100px;
    border: none;
  }
</style>

<div class="search-container">
  <input type="text" bind:value={searchQuery} placeholder="🎵 검색할 곡 제목을 입력하세요..." on:keydown={(e) => e.key === 'Enter' && searchTracks()} />
  <button on:click={searchTracks}>검색</button>
</div>

{#if searchResults.length > 0}
  <div class="track-list">
    <h3>검색 결과:</h3>
    {#each searchResults as track}
      <div class="track" on:click={() => addTrackToPlaylist(track)}>
        <img src={track.album.images[0]?.url} alt="Album Cover" />
        <div>
          <strong>{track.name}</strong>
          <p>{track.artists.map(artist => artist.name).join(", ")}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if selectedTracks.length > 0}
  <div class="selected-tracks">
    <h3>🎶 선택한 트랙</h3>
    {#each selectedTracks as track}
      <div class="selected-track">
        <div>
          <strong>{track.name}</strong> - {track.artists.map(artist => artist.name).join(", ")}
        </div>
        <button class="remove-btn" on:click={() => removeTrackFromPlaylist(track)}>❌ 삭제</button>
      </div>
    {/each}
  </div>
  
  <div class="button-container">
    <button on:click={createPlaylist} disabled={isLoading}>
      {#if isLoading} 생성 중... {/if}
      {#if !isLoading} 🎵 플레이리스트 생성하기 {/if}
    </button>
  </div>
{/if}

{#if playlistId}
  <div class="playlist-container">
    <p>✅ 플레이리스트가 생성되었습니다!</p>
    <iframe
      title="Spotify Embed: Recommendation Playlist"
      src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>
{/if}

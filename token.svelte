<script>
    import { onMount } from "svelte";
  
    let accessToken = "";
  
    async function getAccessToken(authCode) {
        const clientId = "0ff07a899a8845c88e23c98afbce43ab";
        const clientSecret = "55f10044db254b02aa33dee00a4883e3";
        const redirectUri = "http://localhost:5175/";
  
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: authCode,
                redirect_uri: redirectUri
            })
        });
  
        const data = await response.json();
  
        if (data.access_token) {
            accessToken = data.access_token;
            console.log("✅ Access Token:", accessToken);
        } else {
            console.error("❌ Failed to get access token:", data);
        }
    }
  
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");
  
        if (authCode) {
            getAccessToken(authCode);
        } else {
            console.error("❌ Authorization code not found in URL.");
        }
    });
  </script>
  
  <main>
    <h1>Spotify Access Token 발급</h1>
    <p>Access Token은 콘솔에서 확인하세요!</p>
  </main>
  
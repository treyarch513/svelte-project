<script>
    let accessToken = "";
    
    async function getAccessToken(authCode) {
      const clientId = "0ff07a899a8845c88e23c98afbce43ab";
      const clientSecret = "55f10044db254b02aa33dee00a4883e3";
      const redirectUri = "http://localhost:5175/";
  
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret
        })
      });
  
      const data = await response.json();
      accessToken = data.access_token;
      console.log("Access Token:", accessToken);
    }
  
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
  
      if (authCode) {
        getAccessToken(authCode);
      }
    });
  </script>
  
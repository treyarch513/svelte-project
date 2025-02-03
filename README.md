curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code" \
     -d "code=AQCro9OE2HvytRz3Yyp0D5LpS5dAgFwSJdXYuDzRm2OSmJ9IXBA1D3B0Z_UcKxLAUp27i_rnGCAo-T2JvLlEgHblCTUDp9_KLikaY7vR3waMNUDZmXf2hxBQJ5vm2zRuqhni8vT3TjlLlOQJ6corzvxXfVnIf9vpOniu15bRUzbOL2e9Xf9sCtATadYTFPMoYO27FHXGVDBbbBJ7uE-Bk5M3RQtE7AaeFzJPP4VT4Fy4nqLDR8bddDZ4-Di7oG5AmxvT4m_Uy3MvXjWT77HM" \
     -d "redirect_uri=http://localhost:5173/" \
     -d "client_id=0ff07a899a8845c88e23c98afbce43ab" \
     -d "client_secret=55f10044db254b02aa33dee00a4883e3"


http://localhost:5173/?code=AQB-VP3mzocpFPqhOuMC_Rf_sH4SjtByW10OJL91sNWYD80VFLStcxnSh4zLFwQJn1FJqWtPFoN8PP8Sy7elEPvrQfxMxeE0v7YzIczYhbzgHK5v1t0xz_vO0nX35lIfO_u5E1asxNhhTZCrg-iDrdzhNzO6KhHmUD49VfjP8kdbi7ewDj3aGV4fMGO-

https://accounts.spotify.com/authorize?client_id=0ff07a899a8845c88e23c98afbce43ab&response_type=code&redirect_uri=http://localhost:5173/&scope=user-read-private


0ff07a899a8845c88e23c98afbce43ab #클라이언트 ID
55f10044db254b02aa33dee00a4883e3 #클라이언트 시크릿
https://accounts.spotify.com/authorize?client_id=0ff07a899a8845c88e23c98afbce43ab&response_type=code&redirect_uri=http://localhost:5173/&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private #auth코드
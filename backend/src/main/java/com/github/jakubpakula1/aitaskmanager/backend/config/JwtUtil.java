package com.github.jakubpakula1.aitaskmanager.backend.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "84a57c83123e71b97456835a134b706f8b1716ca97532efee02abad001ff1feb53bff58fef745b4ab307bae148a9147c196c5ab1ae21d35f13f07709dc470c7827bf19eb1644a1c183f96db1d326a041ccb58fe1e984b91a0dfc1852114038850b6b0be8d2fbf29239bd47907bec746c7c94d3e8be22056283129ff68b5e8204e7b653d429b8f28d7a320f849f6bf79dd698d1bdb8addf73dfa22d25b645cbdd50089c6d09869462305958eea7e750d94093986ae341124b834ba212d155ba2843f6c3c8507ac67f2c4b8010d853dd9b3ada0cf5038dd7fd4fbde46609e784ad8a6e68f3c1b6a4ee41caa0e88ada1f7564425e6efd8ac9ff62150d143794c0de";
    private final long EXPIRATION_TIME = 86400000;

    private Key getSigningKey() {
        return new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS512.getJcaName());
    }

    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        }catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }
}

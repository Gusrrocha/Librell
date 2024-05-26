package com.rogu.librell.config;
import io.jsonwebtoken.Claims; 
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.security.Keys; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.GrantedAuthority; 
  
import javax.crypto.SecretKey; 
import java.util.Collection; 
import java.util.Date; 
import java.util.HashSet; 
import java.util.Set; 
public class JwtProvider {
	static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()); 
	  
    public static String generateToken(Authentication auth) { 
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities(); 
        String roles = populateAuthorities(authorities); 
        String jwt = Jwts.builder() 
                .issuedAt(new Date()) 
                .expiration(new Date(new Date().getTime()+86400000)) 
                .claim("username", auth.getName()) 
                .claim( "authorities",roles) 
                .signWith(key) 
                .compact(); 
        System.out.println("Token for parsing in JwtProvider: " + jwt); 
        return jwt; 
  
    } 
  
    private static String populateAuthorities(Collection<? extends GrantedAuthority> authorities) { 
        Set<String> auths = new HashSet<>(); 
        for(GrantedAuthority authority: authorities) { 
            auths.add(authority.getAuthority()); 
        } 
        return String.join(",",auths); 
    } 
  
    public static String getUsernameFromJwtToken(String jwt) { 
        jwt = jwt.substring(7); // Assuming "Bearer " is removed from the token 
        try { 
            //Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody(); 
            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload(); 
            String username = String.valueOf(claims.get("username")); 
            System.out.println("Username extracted from JWT: " + claims); 
            return username; 
        } catch (Exception e) { 
            System.err.println("Error extracting username from JWT: " + e.getMessage()); 
            e.printStackTrace(); 
            return null; 
        } 
    } 
}

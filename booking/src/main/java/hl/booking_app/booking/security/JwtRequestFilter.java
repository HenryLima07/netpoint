package hl.booking_app.booking.security;

import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.service.PersonaService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Iterator;

@Component
public class JwtRequestFilter extends OncePerRequestFilter{

    @Autowired
    private PersonaService personaService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    //TODO: check this do filterintergal configuration

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        Iterator<String> itr = request.getHeaderNames().asIterator();

        String username = null;
        String jwtToken = null;

        if(requestTokenHeader != null){
            if(requestTokenHeader.startsWith("Bearer ")){
                jwtToken = requestTokenHeader.substring(7);
                try{
                    username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                }
                catch(IllegalArgumentException e){
                    System.out.println("Unable to get JWT Token");
                }
                catch (ExpiredJwtException e){
                    System.out.println("JWT token has expired");
                }
                catch (SignatureException e){
                    System.out.println("The token signature is invalid");
                }
            }
            else {
                logger.warn("JWT token does not begin with Bearer");
            }
        }
        else {
            logger.warn("JWT token header not found");
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            try {
                UserDetails userDetails = personaService.loadUserByUsername(username);

                //if token is valid configure spring security to manually set authentication
                if(jwtTokenUtil.validateToken(jwtToken, userDetails)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    //after setting the authentication context, we specify that the current user is authenticated.
                    //so it passes the spring security successfully
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }catch (UsernameNotFoundException ex){
                System.out.println("No se encontró un usuario correspondiente: " + username);
            }
        }
        filterChain.doFilter(request, response);
    }
}

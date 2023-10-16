package hl.booking_app.booking;

import hl.booking_app.booking.security.JwtAuthenticationEntryPoint;
import hl.booking_app.booking.security.JwtRequestFilter;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.UserRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private PersonaService personaService;

    @Autowired
    private UserRol rol;

    @Bean
    public JwtRequestFilter authenticationJwtTokenFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(personaService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // csr -> csr.disabled()
                .cors().configurationSource(corsConfigurationSource()).and()
                .exceptionHandling(e -> e.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(a -> a
                        .antMatchers("/api/user/login").permitAll()
                        .antMatchers("/api/user/singin").permitAll()
                        .antMatchers("/api/persona/own/**").hasAuthority(rol.getUser())
                        .antMatchers("api/persona/**").hasAuthority(rol.getAdmin())
                        .antMatchers("api/canchas/adm/**").hasAuthority(rol.getAdmin())
                        .antMatchers("api/canchas/**").permitAll()
                        .antMatchers("api/paquete/adm/**").hasAuthority(rol.getAdmin())
                        .antMatchers("api/paquete/**").permitAll()
                        .antMatchers("api//reserva/own").hasAuthority(rol.getUser())
                        .antMatchers("api//reserva/**").permitAll()
                        .antMatchers("api/paqueteComprado/own").hasAuthority(rol.getUser())
                        .antMatchers("api/alumno/adm").hasAuthority(rol.getAdmin())
                        .antMatchers("api/horario/cancha/adm/**").hasAuthority(rol.getAdmin())
                        .antMatchers("api/clase/grupal/adm").hasAuthority(rol.getAdmin())
                        .antMatchers("api/clase/alumno/adm").hasAuthority(rol.getAdmin())
                        .antMatchers("api/clase/alumno/own").hasAuthority(rol.getUser())
                        .antMatchers("api/horario/clase/adm").hasAuthority(rol.getAdmin())
                        .antMatchers("api/horario/clase").permitAll()
                        .antMatchers("api/clase/grupal").permitAll()
                // .antMatchers("api/**").authenticated()
                // .anyRequest().authenticated()
                );
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("HEAD", "OPTIONS", "GET", "PUT", "POST", "DELETE", "PATCH"));

        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);

        return src;
    }
}

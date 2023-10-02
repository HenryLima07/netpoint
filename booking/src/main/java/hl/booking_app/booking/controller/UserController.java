package hl.booking_app.booking.controller;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.LoginDto;
import hl.booking_app.booking.dto.PersonaDto;
import hl.booking_app.booking.dto.request.PersonaRequest;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.helpers.ResponseHelpers;
import hl.booking_app.booking.security.JwtResponse;
import hl.booking_app.booking.security.JwtTokenUtil;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
@RestController
@RequestMapping("/user")
public class UserController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    PersonaService personaService;

    @Autowired
    DozerMapper dozerMapper;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @PostMapping("/singin")
    public ResponseEntity<GeneralResponseDto> singin(@RequestBody PersonaRequest req){
      
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        req.setPerClave(encoder.encode(req.getPerClave()));
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();

        try{
            NpoPersona newRequestPersona = dozerMapper.map(req, NpoPersona.class);
            newRequestPersona.setPreFechaRegistro(Instant.now());
            PersonaDto result = personaService.savePersona(newRequestPersona);

            //setting response
            generalResponseDto.setMessage(responses.getSuccessfulMessage());
            generalResponseDto.setData(result);
            return response.Response(generalResponseDto, HttpStatus.OK);
        }
        catch (Exception e){
            generalResponseDto.setData(e);
            generalResponseDto.setMessage(responses.getErrorMessage());
            return response.Response(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponseDto> login(@RequestBody LoginDto req) throws Exception{
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        System.out.println(auth.getPrincipal().toString());
        String token = null;
        if (auth.isAuthenticated()) {
            final UserDetails userDetails = personaService.loadUserByUsername(req.getEmail());
            token = jwtTokenUtil.generateToken(userDetails);
        } else {
            throw new UsernameNotFoundException("Usuario/contraseña incorrectos");
        }
        generalResponseDto.setMessage(responses.getLoginSuccessful());
        generalResponseDto.setData(new JwtResponse(token));
        return ResponseEntity.ok(generalResponseDto);
    }
}

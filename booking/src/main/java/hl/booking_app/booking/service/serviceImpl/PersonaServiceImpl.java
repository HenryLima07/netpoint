package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.PersonaDto;
import hl.booking_app.booking.dto.request.PersonaRequest;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.repository.PersonaRepository;
import hl.booking_app.booking.security.JwtGrantedAuthority;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.UserRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    PersonaRepository personaRepository;

    @Autowired
    DozerMapper mapper;

    @Autowired
    UserRol rol;

    @Override
    public PersonaDto savePersona(NpoPersona req) {
        NpoPersona result =  personaRepository.save(req);
        return mapper.map(result, PersonaDto.class);
    }


    //Adm services
    @Override
    public List<PersonaDto> getAllPersonas() {
        List<NpoPersona> personasList = personaRepository.findAll();
        return mapper.maplist(personasList, PersonaDto.class);
    }

    @Override
    public PersonaDto getPersonaById(Integer id) {
        Optional<NpoPersona> persona = personaRepository.findById(id);
        return mapper.map(persona.orElse(null), PersonaDto.class);
    }

    @Override
    public PersonaDto updatePersonaById(NpoPersona req) {
        Optional<NpoPersona> persona = personaRepository.findById(req.getId());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        req.setPerClave(encoder.encode(req.getPerClave()));
        if(persona.isPresent()){
            NpoPersona p = persona.get();
            p = req;
            personaRepository.save(p);
            return mapper.map(p, PersonaDto.class);
        }
        else return null;
    }

    @Override
    public PersonaDto deletePersonaById(Integer id) {
        Optional<NpoPersona> persona = personaRepository.findById(id);
        if(persona.isPresent()){
            personaRepository.deleteById(id);
            return mapper.map(persona.get(), PersonaDto.class);
        }
        else return null;
    }

    //User Services

    @Override
    public PersonaDto getOwnPersona(String email) {
        NpoPersona persona = personaRepository.findByPerEmail(email);
        if(persona != null) return mapper.map(persona, PersonaDto.class);
        else return null;
    }

    @Override
    public PersonaDto deleteOwnPersonaByEmail(String email) {
        NpoPersona persona = personaRepository.findByPerEmail(email);
        if(persona != null){
            personaRepository.deleteById(persona.getId());
            return mapper.map(persona, PersonaDto.class);
        }
        return null;
    }

    @Override
    public PersonaDto updateOwnPersona(String email, PersonaRequest req) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        req.setPerClave(encoder.encode(req.getPerClave()));
        NpoPersona persona = personaRepository.findByPerEmail(email);
        if(persona != null){
            NpoPersona _persona = mapper.map(req, NpoPersona.class);
            _persona.setId(persona.getId());
            persona = _persona;
            personaRepository.save(persona);
            return mapper.map(persona, PersonaDto.class);
        }
        else return null;
    }

    //General services
    @Override
    public NpoPersona getPersonaByEmail(String email) {
        return personaRepository.findByPerEmail(email);
    }

    @Override
    //autenticacion jwt
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        NpoPersona persona = personaRepository.findByPerEmail(email);
        if(persona != null){
            JwtGrantedAuthority authority = new JwtGrantedAuthority(rol.getUser());
//            JwtGrantedAuthority authority = new JwtGrantedAuthority(rol.getAdmin());
            authorities.add(authority);

            User user = new User(email, persona.getPerClave(), authorities);
            return user;
        }
        else throw new UsernameNotFoundException("No se encontró el usuario: " + email);
    }
}

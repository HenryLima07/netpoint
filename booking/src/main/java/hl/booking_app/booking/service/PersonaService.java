package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.PersonaDto;
import hl.booking_app.booking.dto.request.PersonaRequest;
import hl.booking_app.booking.entities.NpoPersona;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface PersonaService extends UserDetailsService {
    //Adm services
    public PersonaDto savePersona(NpoPersona req);
    public List<PersonaDto> getAllPersonas();
    public PersonaDto getPersonaById(Integer id);

    public PersonaDto updatePersonaById(NpoPersona req);
    public PersonaDto deletePersonaById(Integer id);

    //User Services
    public PersonaDto getOwnPersona(String email);
    public PersonaDto deleteOwnPersonaByEmail(String email);
    public PersonaDto updateOwnPersona(String email, PersonaRequest req);

    //general services
    public NpoPersona getPersonaByEmail(String email);
}

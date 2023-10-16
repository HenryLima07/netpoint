package hl.booking_app.booking.controller.User;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.request.ReservaCanchaRequest;
import hl.booking_app.booking.dto.reservaCancha.ReservaCanchaDto;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.entities.NpoReservasCancha;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.service.ReservaCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@Controller
@RequestMapping("/reserva/own")
public class UserReservaCanchaController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    CanchasService canchasService;

    @Autowired
    PersonaService personaService;

    @Autowired
    ReservaCanchaService reservaCanchaService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> createReserva(@RequestBody ReservaCanchaRequest req){
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            NpoCancha cancha = canchasService.getById(req.getCanchaId());

            if(cancha == null || persona == null){
                generalResponseDto.setMessage("Cancha o usuario no encontrado");
                generalResponseDto.setData(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }


            //creating reserva cancha
            System.out.println(req.getRscFechaReserva());
            NpoReservasCancha _rc = mapper.map(req, NpoReservasCancha.class);
            _rc.setRscFecha(Instant.now());
            _rc.setCancha(cancha);
            _rc.setPersona(persona);
            ReservaCanchaDto response = reservaCanchaService.createReserva(_rc);
            generalResponseDto.setMessage(responses.getAddedSuccessfully());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllUserReservasCanchasByEstado(@Param("estado") String estado){
        try{
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            if(persona == null) {
                generalResponseDto.setMessage("Usuario no encontrado");
                generalResponseDto.setData(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);

            }
            List<ReservaCanchaDto> response = estado == null ? reservaCanchaService.getAllReservasByPersona(persona.getId())
            : reservaCanchaService.getAllReservasByPersonaAndEstado(persona.getId(), estado);

            generalResponseDto.setMessage(responses.getSuccessfulMessage());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
}

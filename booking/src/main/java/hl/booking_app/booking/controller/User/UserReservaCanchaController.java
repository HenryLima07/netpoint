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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
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
            System.out.println(req.getRscComentarios() + " executed at " + (new Date()));
            System.out.println(req.getRscFechaReserva());
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<ReservaCanchaDto> DailyReservas = reservaCanchaService.getAllReservasByFechaReserva(req.getCanchaId(), req.getRscFechaReserva());
            boolean overlaps = false;

            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
            Date startTimeReq = timeFormat.parse(req.getRscHoraDesde());
            Date endTimeReq = timeFormat.parse(req.getRscHoraHasta());
            for(ReservaCanchaDto reserva : DailyReservas){
               Date _start = timeFormat.parse(reserva.getRscHoraDesde());
               Date _end = timeFormat.parse(reserva.getRscHoraHasta());
                System.out.println("static hour start: " + startTimeReq);
                System.out.println("static hour end " + endTimeReq);
                System.out.println("start " + _start);
                System.out.println("end "  +_end);

               if((startTimeReq.equals(_start)) || (endTimeReq.equals(_end)) || (startTimeReq.before(_start) && endTimeReq.after(_end)) || (startTimeReq.after(_start) && endTimeReq.before(_end) || (endTimeReq.after(_start) && endTimeReq.before(_end)) || (startTimeReq.after(_start) && startTimeReq.before(_end)))){
                   overlaps = true;
                   break;
               }
            }
            System.out.println("last petition has overlaps: " + overlaps);

            if(overlaps){
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            NpoCancha cancha = canchasService.getById(req.getCanchaId());
            if(cancha == null || persona == null){
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }

            //creating reserva cancha
            NpoReservasCancha _rc = mapper.map(req, NpoReservasCancha.class);
            _rc.setRscFecha(Instant.now());
            _rc.setCancha(cancha);
            _rc.setPersona(persona);
            ReservaCanchaDto response = reservaCanchaService.createReserva(_rc);
            generalResponseDto.setMessage(responses.getAddedSuccessfully());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (HttpClientErrorException.NotFound e){
            generalResponseDto.setMessage("Cancha o usuario no encontrado");
            generalResponseDto.setData(responses.getNotFoundError());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
        }
        catch (HttpClientErrorException.UnprocessableEntity e){
            generalResponseDto.setMessage("Sus horarios ya han sido reservados");
            generalResponseDto.setData(req);
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
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

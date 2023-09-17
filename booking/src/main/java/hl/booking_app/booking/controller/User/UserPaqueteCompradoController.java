package hl.booking_app.booking.controller.User;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.PaqueteCompradoDto;
import hl.booking_app.booking.dto.request.PaqueteCompradoRequest;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.entities.NpoPaquetesComprado;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.service.PaqueteCompradoService;
import hl.booking_app.booking.service.PaqueteService;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("paqueteComprado/own")
public class UserPaqueteCompradoController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    PaqueteCompradoService paqueteCompradoService;

    @Autowired
    PersonaService personaService;
    @Autowired
    PaqueteService paqueteService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> addPaqueteComprado(@RequestBody PaqueteCompradoRequest req){
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            NpoPaquete paquete = paqueteService.getById(req.getPaqId());

            if(persona == null || paquete == null){
                generalResponseDto.setMessage("Usuario o paquete no encontrado");
                generalResponseDto.setData(responses.getNotFoundError());
                return new ResponseEntity<>(generalResponseDto, HttpStatus.NOT_FOUND);
            }


            //creating paquete comprado
            NpoPaquetesComprado _pqc = mapper.map(req, NpoPaquetesComprado.class);
//            _pqc.setId(2);
            _pqc.setPersona(persona);
            _pqc.setPaq(paquete);
            PaqueteCompradoDto response = paqueteCompradoService.addPaqueteComprado(_pqc);
            generalResponseDto.setMessage(responses.getAddedSuccessfully());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/historial")
    public ResponseEntity<GeneralResponseDto> getAllUserReservasCanchasByEstado(@Param("estado") String estado){
        try{
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            if(persona == null) {
                generalResponseDto.setMessage("Usuario no encontrado");
                generalResponseDto.setData(responses.getNotFoundError());
                return new ResponseEntity<>(generalResponseDto, HttpStatus.NOT_FOUND);

            }
            List<PaqueteCompradoDto> response = estado == null ? paqueteCompradoService.getAllUserPaquetesCompradosByPersona(persona.getId())
                    : paqueteCompradoService.getAllUserPaquetesCompradosByEstado(persona.getId(), estado);

            generalResponseDto.setMessage(responses.getSuccessfulMessage());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/unused")
    public ResponseEntity<GeneralResponseDto> getAllUserReservasCanchasUnUsed(){
        try{
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            NpoPersona persona = personaService.getPersonaByEmail(user.getUsername());
            if(persona == null) {
                generalResponseDto.setMessage("Usuario no encontrado");
                generalResponseDto.setData(responses.getNotFoundError());
                return new ResponseEntity<>(generalResponseDto, HttpStatus.NOT_FOUND);

            }
            List<PaqueteCompradoDto> response = paqueteCompradoService.getAllUserPaquetesCompradosByCantidad(persona.getId());
            generalResponseDto.setMessage(responses.getSuccessfulMessage());
            generalResponseDto.setData(response);
            return ResponseEntity.ok(generalResponseDto);
        }
        catch (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
}

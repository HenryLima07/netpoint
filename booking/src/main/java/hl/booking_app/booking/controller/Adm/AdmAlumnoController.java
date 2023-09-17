package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.AlumnoDto;
import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.request.AlumnoRequest;
import hl.booking_app.booking.entities.NpoAlumno;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.service.AlumnoService;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alumno/adm")
public class AdmAlumnoController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    AlumnoService alumnoService;

    @Autowired
    PersonaService personaService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> addAlumno(@RequestBody AlumnoRequest req){
        try{
            NpoAlumno _a = mapper.map(req, NpoAlumno.class);
            NpoPersona persona = personaService.getPersonaByEmail(req.getUserEmail());
            if(persona == null) {
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            _a.setPersona(persona);
            AlumnoDto response = alumnoService.addAlumno(_a);
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

    @PatchMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> updateAlumnoById(@PathVariable("id") Integer id, @RequestBody AlumnoRequest req){
        try{
            NpoAlumno _req = mapper.map(req, NpoAlumno.class);
            NpoPersona persona = personaService.getPersonaByEmail(req.getUserEmail());
            if(persona == null) {
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            _req.setPersona(persona);
            _req.setId(id);
            AlumnoDto alumno = alumnoService.updateAlumnoById(_req);
            generalResponseDto.setData(alumno);
            if(alumno != null) {
                generalResponseDto.setMessage(responses.getUpdateSuccessful());
                return ResponseEntity.ok(generalResponseDto);
            }
            else{
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            generalResponseDto.setData(e.getMessage());
            generalResponseDto.setMessage(responses.getErrorMessage());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> deleteAlumno(@PathVariable("id") Integer id){
        try{
            AlumnoDto cancha = alumnoService.deleteAlumnoById(id);
            generalResponseDto.setData(cancha);
            if(cancha != null) {
                generalResponseDto.setMessage(responses.getDeleteSuccessful());
                return ResponseEntity.ok(generalResponseDto);
            }
            else{
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            generalResponseDto.setData(e.getMessage());
            generalResponseDto.setMessage(responses.getErrorMessage());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllAlumno(@Param("estadoPago") String estadoPago, @Param("estado") String estado){
        try{
            List<AlumnoDto> response = alumnoService.getAllAlumno(estado, estadoPago);
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

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> getAlumnoById(@PathVariable("id") Integer id){
        try{
            AlumnoDto cancha = alumnoService.getAlumnoById(id);
            if(cancha != null) {
                generalResponseDto.setMessage(responses.getSuccessfulMessage());
                generalResponseDto.setData(cancha);
                return ResponseEntity.ok(generalResponseDto);
            }
            else {
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
        }
        catch  (Exception e){
            generalResponseDto.setMessage(responses.getErrorMessage());
            generalResponseDto.setData(e.getMessage());
            return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
}

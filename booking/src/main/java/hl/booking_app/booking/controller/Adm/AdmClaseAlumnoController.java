package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.ClaseAlumnoDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.request.ClaseAlumnoRequest;
import hl.booking_app.booking.entities.NpoAlumno;
import hl.booking_app.booking.entities.NpoClasesAlumno;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.service.AlumnoService;
import hl.booking_app.booking.service.ClasesAlumnoService;
import hl.booking_app.booking.service.ClasesGrupalService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("clase/alumno/adm")
@RestController
public class AdmClaseAlumnoController {


    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    ClasesAlumnoService claseAlumnoService;

    @Autowired
    AlumnoService alumnoService;

    @Autowired
    ClasesGrupalService clasesGrupalService;
    //TODO: check lists
    @PostMapping
    public ResponseEntity<GeneralResponseDto> addClaseAlumno(@RequestBody ClaseAlumnoRequest req){
        try{
            NpoAlumno al = alumnoService.getById(req.getAlumnoId());
            NpoClasesGrupal cg = clasesGrupalService.getById(req.getClasesGrupalesId());
            if(al == null || cg == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoClasesAlumno _c = mapper.map(req, NpoClasesAlumno.class);
            _c.setAlumno(al);
            _c.setClasesGrupales(cg);
            ClaseAlumnoDto response = claseAlumnoService.addClaseAlumno(_c);
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

    @PatchMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> updateClaseAlumno(@PathVariable("id") Integer id, @RequestBody ClaseAlumnoRequest req){
        try{
            NpoAlumno al = alumnoService.getById(req.getAlumnoId());
            NpoClasesGrupal cg = clasesGrupalService.getById(req.getClasesGrupalesId());
            if(al == null || cg == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoClasesAlumno _req = mapper.map(req, NpoClasesAlumno.class);
            _req.setId(id);
            _req.setClasesGrupales(cg);
            _req.setAlumno(al);
            ClaseAlumnoDto response = claseAlumnoService.updateClaseAlumnoById(_req);
            generalResponseDto.setData(response);
            if(response != null) {
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
    public ResponseEntity<GeneralResponseDto> deleteClaseAlumno(@PathVariable("id") Integer id){
        try{
            ClaseAlumnoDto response = claseAlumnoService.deleteClaseAlumnoById(id);
            generalResponseDto.setData(response);
            if(response != null) {
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
}


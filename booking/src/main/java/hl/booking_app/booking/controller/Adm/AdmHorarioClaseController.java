package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.ClaseGrupalDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.HorarioClaseDto;
import hl.booking_app.booking.dto.request.HorarioClaseRequest;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.entities.NpoHorariosCancha;
import hl.booking_app.booking.entities.NpoHorariosClase;
import hl.booking_app.booking.service.ClasesGrupalService;
import hl.booking_app.booking.service.HorarioCanchaService;
import hl.booking_app.booking.service.HorarioClaseService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("horario/clase/adm")
@RestController
public class AdmHorarioClaseController {

    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    HorarioClaseService horarioClasesService;

    @Autowired
    HorarioCanchaService horarioCanchasService;

    @Autowired
    ClasesGrupalService clasesGrupalService;
//TODO: crud clases grupales
    @PostMapping
    public ResponseEntity<GeneralResponseDto> addHorarioCancha(@RequestBody HorarioClaseRequest req){
        try{
            NpoHorariosCancha hc = horarioCanchasService.getById(req.getHorarioCancha());
            NpoClasesGrupal cg = clasesGrupalService.getById(req.getClasesGrupales());
            if(hc == null || cg == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoHorariosClase _c = mapper.map(req, NpoHorariosClase.class);
            _c.setHorarioCancha(hc);
            _c.setClasesGrupales(cg);
            HorarioClaseDto response = horarioClasesService.addHorarioClase(_c);
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
    public ResponseEntity<GeneralResponseDto> updateHorarioCancha(@PathVariable("id") Integer id, @RequestBody HorarioClaseRequest req){
        try{
            NpoHorariosCancha _h = horarioCanchasService.getById(req.getHorarioCancha());
            NpoClasesGrupal _cg = clasesGrupalService.getById(req.getClasesGrupales());
            if(_cg == null || _h == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoHorariosClase _req = mapper.map(req, NpoHorariosClase.class);
            _req.setId(id);
            _req.setHorarioCancha(_h);
            _req.setClasesGrupales(_cg);
            HorarioClaseDto horarioCancha = horarioClasesService.updateHorarioClaseById(_req);
            generalResponseDto.setData(horarioCancha);
            if(horarioCancha != null) {
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
    public ResponseEntity<GeneralResponseDto> deleteHorarioCancha(@PathVariable("id") Integer id){
        try{
            HorarioClaseDto cancha = horarioClasesService.deleteHorarioClaseById(id);
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
}

package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.ClaseGrupalDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.request.ClaseGrupalRequest;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.entities.NpoHorariosCancha;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.service.ClasesGrupalService;
import hl.booking_app.booking.service.HorarioCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("clase/grupal/adm")
@RestController
public class AdmClasesGrupalesController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    ClasesGrupalService claseGrupalService;

    @Autowired
    HorarioCanchaService horarioCanchasService;

    @Autowired
    CanchasService canchasService;
    //TODO: check lists
    @PostMapping
    public ResponseEntity<GeneralResponseDto> addClaseGrupal(@RequestBody ClaseGrupalRequest req){
        try{
            NpoHorariosCancha hc = horarioCanchasService.getById(req.getHorariosCanchaId());
            NpoCancha c = canchasService.getById(req.getClaseGrupalCanchaId());
            if(hc == null || c == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoClasesGrupal _c = mapper.map(req, NpoClasesGrupal.class);
            _c.setClgHorariosCancha(hc);
            _c.setClgCancha(c);
            ClaseGrupalDto response = claseGrupalService.addClaseGrupal(_c);
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
    public ResponseEntity<GeneralResponseDto> updateClaseGrupal(@PathVariable("id") Integer id, @RequestBody ClaseGrupalRequest req){
        try{
            NpoHorariosCancha _h = horarioCanchasService.getById(req.getHorariosCanchaId());
            NpoCancha c = canchasService.getById(req.getClaseGrupalCanchaId());
            if(_h == null || c == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoClasesGrupal _req = mapper.map(req, NpoClasesGrupal.class);
            _req.setId(id);
            _req.setClgHorariosCancha(_h);
            _req.setClgCancha(c);
            ClaseGrupalDto response = claseGrupalService.updateClaseGrupalById(_req);
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
    public ResponseEntity<GeneralResponseDto> deleteClaseGrupal(@PathVariable("id") Integer id){
        try{
            ClaseGrupalDto response = claseGrupalService.deleteClaseGrupalById(id);
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

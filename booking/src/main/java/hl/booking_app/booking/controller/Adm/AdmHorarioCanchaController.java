package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.HorarioCanchaDto;
import hl.booking_app.booking.dto.request.HorarioCanchaRequest;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoHorariosCancha;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.service.HorarioCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/horario/cancha/adm")
@RestController
public class AdmHorarioCanchaController {

    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    HorarioCanchaService horarioCanchasService;

    @Autowired
    CanchasService canchasService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> addHorarioCancha(@RequestBody HorarioCanchaRequest req){
        try{
            NpoCancha cancha = canchasService.getById(req.getIdCan());
            if(cancha == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoHorariosCancha _c = mapper.map(req, NpoHorariosCancha.class);
            _c.setCan(cancha);
            HorarioCanchaDto response = horarioCanchasService.addHorarioCancha(_c);
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
    public ResponseEntity<GeneralResponseDto> updateHorarioCancha(@PathVariable("id") Integer id, @RequestBody HorarioCanchaRequest req){
        try{
            NpoCancha _c = canchasService.getById(req.getIdCan());
            if(_c == null){
                generalResponseDto.setMessage(responses.getNotFoundError());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.NOT_FOUND);
            }
            NpoHorariosCancha _req = mapper.map(req, NpoHorariosCancha.class);
            _req.setId(id);
            _req.setCan(_c);
            HorarioCanchaDto horarioCancha = horarioCanchasService.updateHorarioCanchaById(_req);
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
            HorarioCanchaDto cancha = horarioCanchasService.deleteHorarioCanchaById(id);
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

package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.request.CanchaRequest;
import hl.booking_app.booking.dto.request.UpdateCanchaRequest;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/cancha/adm")
public class AdmCanchaController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    CanchasService canchasService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> addCancha(@RequestBody CanchaRequest req){
        try{
            NpoCancha _c = mapper.map(req, NpoCancha.class);
            String response = canchasService.addCancha(_c);
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
    public ResponseEntity<GeneralResponseDto> updateCancha(@PathVariable("id") Integer id, @RequestBody UpdateCanchaRequest req){
        try{
            NpoCancha _req = mapper.map(req, NpoCancha.class);
            _req.setId(id);
            CanchaDto cancha = canchasService.updateCanchaById(_req);
            generalResponseDto.setData(cancha);
            if(cancha != null) {
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
    public ResponseEntity<GeneralResponseDto> deleteCancha(@PathVariable("id") Integer id){
        try{
            CanchaDto cancha = canchasService.deleteCanchaById(id);
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

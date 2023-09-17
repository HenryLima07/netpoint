package hl.booking_app.booking.controller;

import hl.booking_app.booking.dto.ClaseGrupalDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.service.ClasesGrupalService;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RequestMapping("clase/grupal")
@RestController
public class ClasesGrupalesController {
    @Autowired
    ClasesGrupalService claseGrupalService;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllClaseGrupal(){
        try{
            List<ClaseGrupalDto> response = claseGrupalService.getAllClaseGrupal();
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
    public ResponseEntity<GeneralResponseDto> getClaseGrupalById(@PathVariable("id") Integer id){
        try{
            ClaseGrupalDto response = claseGrupalService.getClaseGrupalById(id);
            if(response != null) {
                generalResponseDto.setMessage(responses.getSuccessfulMessage());
                generalResponseDto.setData(response);
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

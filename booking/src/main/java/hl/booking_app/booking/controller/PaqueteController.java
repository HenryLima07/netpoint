package hl.booking_app.booking.controller;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.PaqueteDto;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.service.PaqueteService;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/paquete")
public class PaqueteController {
    @Autowired
    PaqueteService paqueteService;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllPaqueteAct(){
        try{
            List<PaqueteDto> response = paqueteService.getAllPaqueteAct();
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
    public ResponseEntity<GeneralResponseDto> getPaqueteById(@PathVariable("id") Integer id){
        try{
            PaqueteDto paquete = paqueteService.getPaqueteById(id);
            if(paquete != null) {
                generalResponseDto.setMessage(responses.getSuccessfulMessage());
                generalResponseDto.setData(paquete);
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

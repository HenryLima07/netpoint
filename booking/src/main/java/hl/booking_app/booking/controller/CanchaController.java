package hl.booking_app.booking.controller;

import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cancha")
public class CanchaController {
    @Autowired
    CanchasService canchasService;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllCanchas(@Param("estado") String estado){
        try{
            System.out.println(estado);
            List<CanchaDto> response = canchasService.getAllCanchaByEstado(estado);
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
    public ResponseEntity<GeneralResponseDto> getCanchaById(@PathVariable("id") Integer id){
        try{
            CanchaDto cancha = canchasService.getCanchaById(id);
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

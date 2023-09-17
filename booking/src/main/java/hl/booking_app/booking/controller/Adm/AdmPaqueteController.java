package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.PaqueteDto;
import hl.booking_app.booking.dto.request.PaqueteRequest;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.service.PaqueteService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/paquete/adm")
public class AdmPaqueteController {
    @Autowired
    DozerMapper mapper;

    @Autowired
    GeneralResponseDto generalResponseDto;

    @Autowired
    Responses responses;

    @Autowired
    PaqueteService paqueteService;

    @PostMapping
    public ResponseEntity<GeneralResponseDto> addPaquete(@RequestBody PaqueteRequest req){
        try{
            NpoPaquete _p = mapper.map(req, NpoPaquete.class);
//            _p.setId(2);
            String response = paqueteService.addPaquete(_p);
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
    public ResponseEntity<GeneralResponseDto> updatePaquete(@PathVariable("id") Integer id, @RequestBody PaqueteRequest req){
        try{
            NpoPaquete _req = mapper.map(req, NpoPaquete.class);
            _req.setId(id);
            NpoPaquete paquete = paqueteService.updatePaqueteById(_req);
            generalResponseDto.setData(paquete);
            if(paquete != null) {
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
    public ResponseEntity<GeneralResponseDto> deletePaquete(@PathVariable("id") Integer id){
        try{
            NpoPaquete paquete = paqueteService.deletePaqueteById(id);
            generalResponseDto.setData(paquete);
            if(paquete != null) {
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
    public ResponseEntity<GeneralResponseDto> getAllPaquete(){
        try{
            List<PaqueteDto> response = paqueteService.getAllPaquete();
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
}

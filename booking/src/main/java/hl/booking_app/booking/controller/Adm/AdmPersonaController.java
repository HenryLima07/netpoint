package hl.booking_app.booking.controller.Adm;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.PersonaDto;
import hl.booking_app.booking.dto.request.PersonaRequest;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.helpers.ResponseHelpers;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adm/usuario")
public class AdmPersonaController {

    @Autowired
    PersonaService personaService;

    @Autowired
    DozerMapper mapper;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto responseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getAllPersonas (){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();

        try{
            List<PersonaDto> personaDtoList = personaService.getAllPersonas();
            responseDto.setData(personaDtoList);
            responseDto.setMessage(responses.getSuccessfulMessage());
            return response.Response(responseDto, HttpStatus.OK);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> getPersonaById (@PathVariable("id") Integer id){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();

        try{
            PersonaDto persona = personaService.getPersonaById(id);
            if(persona != null) {
                responseDto.setMessage(responses.getSuccessfulMessage());
                responseDto.setData(persona);
                return response.Response(responseDto, HttpStatus.OK);
            }
            responseDto.setMessage(responses.getNotFoundError());
            return response.Response(responseDto, HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> updatePersonaById (@PathVariable("id") Integer id, @RequestBody PersonaRequest req){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();

        try{
            NpoPersona _req = mapper.map(req, NpoPersona.class);
            _req.setId(id);
            PersonaDto persona = personaService.updatePersonaById(_req);
            if(persona != null) {
                responseDto.setMessage(responses.getUpdateSuccessful());
                responseDto.setData(persona);
                return response.Response(responseDto, HttpStatus.OK);
            }
            responseDto.setMessage(responses.getNotFoundError());
            return response.Response(responseDto, HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponseDto> deletePersonaById (@PathVariable("id") Integer id){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();

        try{
            PersonaDto persona = personaService.deletePersonaById(id);
            if(persona != null) {
                responseDto.setMessage(responses.getDeleteSuccessful());
                responseDto.setData(persona);
                return response.Response(responseDto, HttpStatus.OK);
            }
            responseDto.setMessage(responses.getNotFoundError());
            return response.Response(responseDto, HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }
}

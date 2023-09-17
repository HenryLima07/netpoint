package hl.booking_app.booking.controller.User;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.PersonaDto;
import hl.booking_app.booking.dto.request.PersonaRequest;
import hl.booking_app.booking.helpers.ResponseHelpers;
import hl.booking_app.booking.service.PersonaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/own/usuario")
public class UserPersonaController {
    @Autowired
    PersonaService personaService;

    @Autowired
    DozerMapper mapper;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto responseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getOwnPersona (){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try{
            PersonaDto persona = personaService.getOwnPersona(user.getUsername());
            responseDto.setData(persona);
            responseDto.setMessage(responses.getSuccessfulMessage());
            return response.Response(responseDto, HttpStatus.OK);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping
    public ResponseEntity<GeneralResponseDto> updateOwnPersona (@RequestBody PersonaRequest req){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try{
            PersonaDto persona = personaService.updateOwnPersona(user.getUsername(), req);
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
    @DeleteMapping
    public ResponseEntity<GeneralResponseDto> deleteOwnPersona (){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try{
            PersonaDto persona = personaService.deleteOwnPersonaByEmail(user.getUsername());
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

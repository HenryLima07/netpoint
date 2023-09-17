package hl.booking_app.booking.controller.User;

import hl.booking_app.booking.dto.ClaseAlumnoDto;
import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.helpers.ResponseHelpers;
import hl.booking_app.booking.service.ClasesAlumnoService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("clase/alumno/own")
public class UserClaseAlumnoController {
    @Autowired
    ClasesAlumnoService claseAlumnoService;

    @Autowired
    DozerMapper mapper;

    @Autowired
    Responses responses;

    @Autowired
    GeneralResponseDto responseDto;

    @GetMapping
    public ResponseEntity<GeneralResponseDto> getOwnClaseAlumno (){
        ResponseHelpers<GeneralResponseDto> response = new ResponseHelpers<>();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try{
            ClaseAlumnoDto cla = claseAlumnoService.getOwnClaseAlumno(user.getUsername());
            responseDto.setData(cla);
            responseDto.setMessage(responses.getSuccessfulMessage());
            return response.Response(responseDto, HttpStatus.OK);
        }
        catch (Exception e){
            responseDto.setMessage(responses.getErrorMessage());
            responseDto.setData(e);
            return response.Response(responseDto, HttpStatus.BAD_REQUEST);
        }
    }
}

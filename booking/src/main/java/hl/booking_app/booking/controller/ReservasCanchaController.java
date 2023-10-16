package hl.booking_app.booking.controller;

import hl.booking_app.booking.dto.GeneralResponseDto;
import hl.booking_app.booking.dto.reservaCancha.ReservaCanchaDto;
import hl.booking_app.booking.service.CanchasService;
import hl.booking_app.booking.service.ReservaCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import hl.booking_app.booking.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/reserva")
public class ReservasCanchaController {

        @Autowired
        DozerMapper mapper;

        @Autowired
        GeneralResponseDto generalResponseDto;

        @Autowired
        Responses responses;

        @Autowired
        CanchasService canchasService;

        @Autowired
        ReservaCanchaService reservaCanchaService;


        @GetMapping("/")
        public ResponseEntity<GeneralResponseDto> getAllReservas(){
            try{
                List<ReservaCanchaDto> response = reservaCanchaService.getAll();
                generalResponseDto.setMessage(responses.getSuccessfulMessage());
                generalResponseDto.setData(response);
                return ResponseEntity.ok(generalResponseDto);
            }
            catch (Exception e) {
                generalResponseDto.setMessage(responses.getErrorMessage());
                generalResponseDto.setData(e.getMessage());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
            }
        }

        @GetMapping("/fecha/{date}")
        public ResponseEntity<GeneralResponseDto> getAllUserReservasCanchasByEstado(@PathVariable("date") String req) {
            try {
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(req);
                List<ReservaCanchaDto> response = reservaCanchaService.getAllReservasByFechaReserva(date);
                generalResponseDto.setMessage(responses.getSuccessfulMessage());
                generalResponseDto.setData(response);
                return ResponseEntity.ok(generalResponseDto);
            } catch (Exception e) {
                generalResponseDto.setMessage(responses.getErrorMessage());
                generalResponseDto.setData(e.getMessage());
                return new ResponseEntity<GeneralResponseDto>(generalResponseDto, HttpStatus.BAD_REQUEST);
            }
        }

}

package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.HorarioClaseDto;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoHorariosClase;

import java.util.List;

public interface HorarioClaseService {
    //Adm services
    public HorarioClaseDto addHorarioClase(NpoHorariosClase req);
    public HorarioClaseDto updateHorarioClaseById(NpoHorariosClase req);
    public HorarioClaseDto deleteHorarioClaseById(Integer id);
    //General services
    public List<HorarioClaseDto> getAllHorarioClase();
    public HorarioClaseDto getHorarioClaseById(Integer id);
}

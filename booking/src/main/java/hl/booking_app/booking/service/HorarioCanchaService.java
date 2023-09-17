package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.HorarioCanchaDto;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoHorariosCancha;

import java.util.List;

public interface HorarioCanchaService {
    //Adm services
    public HorarioCanchaDto addHorarioCancha(NpoHorariosCancha req);
    public HorarioCanchaDto updateHorarioCanchaById(NpoHorariosCancha req);
    public HorarioCanchaDto deleteHorarioCanchaById(Integer id);

    //General services
    public List<HorarioCanchaDto> getAllHorarioCancha();
    public HorarioCanchaDto getHorarioCanchaById(Integer id);
    public NpoHorariosCancha getById(Integer id);

}

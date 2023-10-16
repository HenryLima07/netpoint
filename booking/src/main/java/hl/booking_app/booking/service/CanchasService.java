package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.entities.NpoCancha;

import java.util.List;

public interface CanchasService {
    //Adm services
    public String addCancha(NpoCancha req);
    public CanchaDto updateCanchaById(NpoCancha req);
    public CanchaDto deleteCanchaById(Integer id);
    //General services
    public List<CanchaDto> getAllCanchas();
    public NpoCancha getById(Integer id);
    public CanchaDto getCanchaById(Integer id);

    public List<CanchaDto> getAllCanchaByEstado(String estado);


}

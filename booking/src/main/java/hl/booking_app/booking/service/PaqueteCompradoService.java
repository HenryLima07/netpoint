package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.PaqueteCompradoDto;
import hl.booking_app.booking.entities.NpoPaquetesComprado;

import java.util.List;

public interface PaqueteCompradoService {
    //User services
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByEstado(Integer id, String estado);
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByCantidad(Integer id);
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByPersona(Integer id);

    public PaqueteCompradoDto addPaqueteComprado(NpoPaquetesComprado req);
}

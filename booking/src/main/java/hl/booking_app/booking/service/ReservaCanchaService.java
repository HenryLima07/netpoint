package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.request.ReservaCanchaRequest;
import hl.booking_app.booking.dto.reservaCancha.ReservaCanchaDto;
import hl.booking_app.booking.entities.NpoReservasCancha;

import javax.persistence.Column;
import java.time.Instant;
import java.util.Date;
import java.util.List;

public interface ReservaCanchaService {
    public ReservaCanchaDto createReserva(NpoReservasCancha req);

    public List<ReservaCanchaDto> getAllReservasByPersona(Integer id);
    public List<ReservaCanchaDto> getAllReservasByPersonaAndEstado(Integer id, String estado);

    public List<ReservaCanchaDto> getAllReservasByFechaReserva(Date fecha);
    public List<ReservaCanchaDto> getAll();
}

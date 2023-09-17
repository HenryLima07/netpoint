package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.request.ReservaCanchaRequest;
import hl.booking_app.booking.dto.reservaCancha.ReservaCanchaDto;
import hl.booking_app.booking.entities.NpoReservasCancha;
import hl.booking_app.booking.repository.ReservasCanchaRepository;
import hl.booking_app.booking.service.ReservaCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaCanchaServiceImpl implements ReservaCanchaService {
    @Autowired
    ReservasCanchaRepository reservasCanchaRepository;

    @Autowired
    DozerMapper mapper;
    @Override
    public ReservaCanchaDto createReserva(NpoReservasCancha req) {
        NpoReservasCancha result = reservasCanchaRepository.save(req);
        return mapper.map(result, ReservaCanchaDto.class);
    }

    @Override
    public List<ReservaCanchaDto> getAllReservasByPersona(Integer id) {
        return mapper.maplist(reservasCanchaRepository.findAllByPersonaId(id), ReservaCanchaDto.class);
    }

    @Override
    public List<ReservaCanchaDto> getAllReservasByPersonaAndEstado(Integer id, String estado) {
        return mapper.maplist(reservasCanchaRepository.findAllByRscEstadoAndPersonaId(estado, id), ReservaCanchaDto.class);
    }
}

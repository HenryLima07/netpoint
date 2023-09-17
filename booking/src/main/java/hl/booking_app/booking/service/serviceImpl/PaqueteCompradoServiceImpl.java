package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.PaqueteCompradoDto;
import hl.booking_app.booking.entities.NpoPaquetesComprado;
import hl.booking_app.booking.repository.PaqueteCompradoRepository;
import hl.booking_app.booking.repository.ReservasCanchaRepository;
import hl.booking_app.booking.service.PaqueteCompradoService;
import hl.booking_app.booking.service.PaqueteService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaqueteCompradoServiceImpl implements PaqueteCompradoService {
    @Autowired
    PaqueteCompradoRepository paqueteCompradoRepository;

    @Autowired
    DozerMapper mapper;

    //User Services
    @Override
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByEstado(Integer id, String estado) {
        return mapper.maplist(paqueteCompradoRepository.findAllByPersonaIdAndPqcEstado(id, estado), PaqueteCompradoDto.class);
    }
    @Override
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByCantidad(Integer id) {
        return mapper.maplist(paqueteCompradoRepository.findAllByPersonaIdAndPqc(id), PaqueteCompradoDto.class);
    }

    @Override
    public List<PaqueteCompradoDto> getAllUserPaquetesCompradosByPersona(Integer id) {
        return mapper.maplist(paqueteCompradoRepository.findAllByPersonaId(id), PaqueteCompradoDto.class);
    }

    @Override
    public PaqueteCompradoDto addPaqueteComprado(NpoPaquetesComprado req) {
        NpoPaquetesComprado result = paqueteCompradoRepository.save(req);
        return mapper.map(result, PaqueteCompradoDto.class);
    }
}

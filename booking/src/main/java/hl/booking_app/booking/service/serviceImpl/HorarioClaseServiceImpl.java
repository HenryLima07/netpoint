package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.HorarioClaseDto;
import hl.booking_app.booking.entities.NpoHorariosClase;
import hl.booking_app.booking.repository.HorarioClaseRepository;
import hl.booking_app.booking.service.HorarioClaseService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioClaseServiceImpl implements HorarioClaseService {

    @Autowired
    DozerMapper mapper;
    @Autowired
    HorarioClaseRepository horarioClaseRepository;

    //    Adm services implementation
    @Override
    public HorarioClaseDto addHorarioClase(NpoHorariosClase req) {
        NpoHorariosClase hc = horarioClaseRepository.save(req);
        return mapper.map(hc, HorarioClaseDto.class);
    }

    @Override
    public HorarioClaseDto updateHorarioClaseById(NpoHorariosClase req) {
        Optional<NpoHorariosClase> horarioClaseOptional = horarioClaseRepository.findById(req.getId());
        if(horarioClaseOptional.isPresent()){
            NpoHorariosClase _c = horarioClaseOptional.get();
            _c = req;
            horarioClaseRepository.save(_c);
            return mapper.map(horarioClaseOptional.get(), HorarioClaseDto.class);
        }
        else return null;
    }

    @Override
    public HorarioClaseDto deleteHorarioClaseById(Integer id) {
        Optional<NpoHorariosClase> horarioClaseOptional = horarioClaseRepository.findById(id);
        if(horarioClaseOptional.isPresent()){
            horarioClaseRepository.deleteById(id);
            return mapper.map(horarioClaseOptional.get(), HorarioClaseDto.class);
        }
        else return null;
    }

    //    General services implementation
    @Override
    public List<HorarioClaseDto> getAllHorarioClase() {
        return mapper.maplist(horarioClaseRepository.findAll(), HorarioClaseDto.class);
    }

    @Override
    public HorarioClaseDto getHorarioClaseById(Integer id) {
        Optional<NpoHorariosClase> horarioClaseOptional = horarioClaseRepository.findById(id);
        return horarioClaseOptional.map(hc -> mapper.map(hc, HorarioClaseDto.class)).orElse(null);
    }
}

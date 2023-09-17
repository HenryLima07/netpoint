package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.HorarioCanchaDto;
import hl.booking_app.booking.entities.NpoHorariosCancha;
import hl.booking_app.booking.repository.HorariosCanchaRepository;
import hl.booking_app.booking.service.HorarioCanchaService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class HorarioCanchaServiceImpl implements HorarioCanchaService {

    @Autowired
    DozerMapper mapper;
    @Autowired
    HorariosCanchaRepository horarioCanchaRepository;

    //    Adm services implementation
    @Override
    public HorarioCanchaDto addHorarioCancha(NpoHorariosCancha req) {
        NpoHorariosCancha horario =  horarioCanchaRepository.save(req);
        return mapper.map(horario, HorarioCanchaDto.class);
    }

    @Override
    public HorarioCanchaDto updateHorarioCanchaById(NpoHorariosCancha req) {
        Optional<NpoHorariosCancha> horarioCanchaOptional = horarioCanchaRepository.findById(req.getId());
        if(horarioCanchaOptional.isPresent()){
            NpoHorariosCancha _c = horarioCanchaOptional.get();
            _c = req;
            horarioCanchaRepository.save(_c);
            return mapper.map(horarioCanchaOptional.get(), HorarioCanchaDto.class);
        }
        else return null;
    }

    @Override
    public HorarioCanchaDto deleteHorarioCanchaById(Integer id) {
        Optional<NpoHorariosCancha> horarioCanchaOptional = horarioCanchaRepository.findById(id);
        if(horarioCanchaOptional.isPresent()){
            horarioCanchaRepository.deleteById(id);
            return mapper.map(horarioCanchaOptional.get(), HorarioCanchaDto.class);
        }
        else return null;
    }

    //    General services implementation
    @Override
    public List<HorarioCanchaDto> getAllHorarioCancha() {
        return mapper.maplist(horarioCanchaRepository.findAll(), HorarioCanchaDto.class);
    }

    @Override
    public HorarioCanchaDto getHorarioCanchaById(Integer id) {
        Optional<NpoHorariosCancha> horarioCanchaOptional = horarioCanchaRepository.findById(id);
        return horarioCanchaOptional.map(hc -> mapper.map(hc, HorarioCanchaDto.class)).orElse(null);
    }

    @Override
    public NpoHorariosCancha getById(Integer id) {
        Optional<NpoHorariosCancha> horarioCanchaOptional = horarioCanchaRepository.findById(id);
        return horarioCanchaOptional.orElse(null);
    }
}

package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.dto.PaqueteDto;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.repository.PaqueteRepository;
import hl.booking_app.booking.service.PaqueteService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaqueteServiceImpl implements PaqueteService {

    @Autowired
    PaqueteRepository paqueteRepository;
    @Autowired
    DozerMapper mapper;

    //    General services implementation
    @Override
    public List<PaqueteDto> getAllPaqueteAct() {
        return mapper.maplist(paqueteRepository.findAllByPaqEstado(), PaqueteDto.class);
    }

    @Override
    public PaqueteDto getPaqueteById(Integer id) {
        Optional<NpoPaquete> paqueteOptional = paqueteRepository.findById(id);
        return paqueteOptional.map(p -> mapper.map(p, PaqueteDto.class)).orElse(null);
    }
  @Override
    public NpoPaquete getById(Integer id) {
        Optional<NpoPaquete> paqueteOptional = paqueteRepository.findById(id);
        return paqueteOptional.orElse(null);
    }

    //    Adm services implementation
    @Override
    public String addPaquete(NpoPaquete req) {
        paqueteRepository.save(req);
        return "Successfully added";
    }

    @Override
    public NpoPaquete updatePaqueteById(NpoPaquete req) {
        Optional<NpoPaquete> paqueteOptional = paqueteRepository.findById(req.getId());
        if(paqueteOptional.isPresent()){
            NpoPaquete _c = paqueteOptional.get();
            _c = req;
            paqueteRepository.save(_c);
            return paqueteOptional.get();
        }
        else return null;
    }

    @Override
    public NpoPaquete deletePaqueteById(Integer id) {
        Optional<NpoPaquete> paqueteOptional = paqueteRepository.findById(id);
        if(paqueteOptional.isPresent()){
            paqueteRepository.deleteById(id);
            return paqueteOptional.get();
        }
        else return null;
    }

    @Override
    public List<PaqueteDto> getAllPaquete() {
        return mapper.maplist(paqueteRepository.findAll(), PaqueteDto.class);
    }

}

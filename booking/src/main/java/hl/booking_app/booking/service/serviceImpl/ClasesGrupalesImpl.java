package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.ClaseGrupalDto;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.repository.ClasesGrupalRepository;
import hl.booking_app.booking.service.ClasesGrupalService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClasesGrupalesImpl implements ClasesGrupalService {

    @Autowired
    DozerMapper mapper;
    @Autowired
    ClasesGrupalRepository claseGrupalRepository;

    //    Adm services implementation
    @Override
    public ClaseGrupalDto addClaseGrupal(NpoClasesGrupal req) {
        NpoClasesGrupal claseGrupal =  claseGrupalRepository.save(req);
        return mapper.map(claseGrupal, ClaseGrupalDto.class);
    }

    @Override
    public ClaseGrupalDto updateClaseGrupalById(NpoClasesGrupal req) {
        Optional<NpoClasesGrupal> claseGrupalOptional = claseGrupalRepository.findById(req.getId());
        if(claseGrupalOptional.isPresent()){
            NpoClasesGrupal _c = claseGrupalOptional.get();
            _c = req;
            claseGrupalRepository.save(_c);
            return mapper.map(claseGrupalOptional.get(), ClaseGrupalDto.class);
        }
        else return null;
    }

    @Override
    public ClaseGrupalDto deleteClaseGrupalById(Integer id) {
        Optional<NpoClasesGrupal> claseGrupalOptional = claseGrupalRepository.findById(id);
        if(claseGrupalOptional.isPresent()){
            claseGrupalRepository.deleteById(id);
            return mapper.map(claseGrupalOptional.get(), ClaseGrupalDto.class);
        }
        else return null;
    }

    //    General services implementation
    @Override
    public List<ClaseGrupalDto> getAllClaseGrupal() {
        return mapper.maplist(claseGrupalRepository.findAll(), ClaseGrupalDto.class);
    }

    @Override
    public ClaseGrupalDto getClaseGrupalById(Integer id) {
        Optional<NpoClasesGrupal> claseGrupalOptional = claseGrupalRepository.findById(id);
        return claseGrupalOptional.map(hc -> mapper.map(hc, ClaseGrupalDto.class)).orElse(null);
    }

    @Override
    public NpoClasesGrupal getById(Integer id) {
        Optional<NpoClasesGrupal> claseGrupalOptional = claseGrupalRepository.findById(id);
        return claseGrupalOptional.orElse(null);
    }
}

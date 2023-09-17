package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.ClaseAlumnoDto;
import hl.booking_app.booking.entities.NpoClasesAlumno;
import hl.booking_app.booking.repository.ClasesAlumnoRepository;
import hl.booking_app.booking.service.ClasesAlumnoService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ClasesAlumnoServiceImpl implements ClasesAlumnoService {

    @Autowired
    DozerMapper mapper;
    @Autowired
    ClasesAlumnoRepository claseAlumnoRepository;

    //    Adm services implementation
    @Override
    public ClaseAlumnoDto addClaseAlumno(NpoClasesAlumno req) {
        NpoClasesAlumno claseAlumno =  claseAlumnoRepository.save(req);
        return mapper.map(claseAlumno, ClaseAlumnoDto.class);
    }

    @Override
    public ClaseAlumnoDto updateClaseAlumnoById(NpoClasesAlumno req) {
        Optional<NpoClasesAlumno> claseAlumnoOptional = claseAlumnoRepository.findById(req.getId());
        if(claseAlumnoOptional.isPresent()){
            NpoClasesAlumno _c = claseAlumnoOptional.get();
            _c = req;
            claseAlumnoRepository.save(_c);
            return mapper.map(claseAlumnoOptional.get(), ClaseAlumnoDto.class);
        }
        else return null;
    }

    @Override
    public ClaseAlumnoDto deleteClaseAlumnoById(Integer id) {
        Optional<NpoClasesAlumno> claseAlumnoOptional = claseAlumnoRepository.findById(id);
        if(claseAlumnoOptional.isPresent()){
            claseAlumnoRepository.deleteById(id);
            return mapper.map(claseAlumnoOptional.get(), ClaseAlumnoDto.class);
        }
        else return null;
    }

    //User service implementation
    @Override
    public ClaseAlumnoDto getOwnClaseAlumno(String email) {
        NpoClasesAlumno response = claseAlumnoRepository.findByAlumnoPersonaPerEmail(email);
        System.out.println(response);
        return mapper.map(response, ClaseAlumnoDto.class);
    }

    //    General services implementation
    @Override
    public List<ClaseAlumnoDto> getAllClaseAlumno() {
        return mapper.maplist(claseAlumnoRepository.findAll(), ClaseAlumnoDto.class);
    }

    @Override
    public ClaseAlumnoDto getClaseAlumnoById(Integer id) {
        Optional<NpoClasesAlumno> claseAlumnoOptional = claseAlumnoRepository.findById(id);
        return claseAlumnoOptional.map(hc -> mapper.map(hc, ClaseAlumnoDto.class)).orElse(null);
    }

    @Override
    public NpoClasesAlumno getById(Integer id) {
        Optional<NpoClasesAlumno> claseAlumnoOptional = claseAlumnoRepository.findById(id);
        return claseAlumnoOptional.orElse(null);
    }
}

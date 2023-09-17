package hl.booking_app.booking.service.serviceImpl;

import hl.booking_app.booking.dto.AlumnoDto;
import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.entities.NpoAlumno;
import hl.booking_app.booking.repository.AlumnoRepository;
import hl.booking_app.booking.service.AlumnoService;
import hl.booking_app.booking.utils.DozerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoServiceImpl implements AlumnoService {

    @Autowired
    DozerMapper mapper;
    @Autowired
    AlumnoRepository alumnoRepository;
    //    Adm services implementation
    @Override
    public AlumnoDto addAlumno(NpoAlumno req) {
        NpoAlumno result =  alumnoRepository.save(req);
        return mapper.map(result, AlumnoDto.class);
    }

    @Override
    public AlumnoDto updateAlumnoById(NpoAlumno req) {
        Optional<NpoAlumno> almunoOptional = alumnoRepository.findById(req.getId());
        if(almunoOptional.isPresent()){
            NpoAlumno _a = almunoOptional.get();
            _a = req;
            alumnoRepository.save(_a);
            return mapper.map(almunoOptional.get(), AlumnoDto.class);
        }
        else return null;
    }

    @Override
    public AlumnoDto deleteAlumnoById(Integer id) {
        Optional<NpoAlumno> alumnoOptional = alumnoRepository.findById(id);
        if(alumnoOptional.isPresent()){
            alumnoRepository.deleteById(id);
            return mapper.map(alumnoOptional.get(), AlumnoDto.class);
        }
        else return null;
    }
    @Override
    public List<AlumnoDto> getAllAlumno(String estado, String estadoPago) {
        List<NpoAlumno> response;
        if(estadoPago == null && estado != null) response = alumnoRepository.findAllByAlmEstado(estado);
        else if(estadoPago != null && estado == null) response = alumnoRepository.findAllByAlmEstadoPago(estadoPago);
        else if(estadoPago != null && estado != null) response = alumnoRepository.findAllByAlmEstadoAndAlmEstadoPago(estado, estadoPago);
        else response = alumnoRepository.findAll();
        return mapper.maplist(response, AlumnoDto.class);
    }

    @Override
    public AlumnoDto getAlumnoById(Integer id) {
        Optional<NpoAlumno> alumnoOptional = alumnoRepository.findById(id);
        return alumnoOptional.map(npoAlumno -> mapper.map(npoAlumno, AlumnoDto.class)).orElse(null);
    }

    @Override
    public NpoAlumno getById(Integer id) {
        Optional<NpoAlumno> alumnoOptional = alumnoRepository.findById(id);
        return alumnoOptional.orElse(null);

    }
}

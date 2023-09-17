package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.ClaseAlumnoDto;
import hl.booking_app.booking.entities.NpoClasesAlumno;

import java.util.List;

public interface ClasesAlumnoService {
    //Adm services
    public ClaseAlumnoDto addClaseAlumno(NpoClasesAlumno req);
    public ClaseAlumnoDto updateClaseAlumnoById(NpoClasesAlumno req);
    public ClaseAlumnoDto deleteClaseAlumnoById(Integer id);

    //user service
    public ClaseAlumnoDto getOwnClaseAlumno(String email);

    //General services
    public List<ClaseAlumnoDto> getAllClaseAlumno();
    public ClaseAlumnoDto getClaseAlumnoById(Integer id);
    public NpoClasesAlumno getById(Integer id);
}

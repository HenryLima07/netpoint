package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.AlumnoDto;
import hl.booking_app.booking.dto.CanchaDto;
import hl.booking_app.booking.entities.NpoAlumno;
import hl.booking_app.booking.entities.NpoCancha;

import java.util.List;

public interface AlumnoService {
    //Adm services
    public AlumnoDto addAlumno(NpoAlumno req);
    public AlumnoDto updateAlumnoById(NpoAlumno req);
    public AlumnoDto deleteAlumnoById(Integer id);

    public List<AlumnoDto> getAllAlumno(String estadoPago, String estado);
    public AlumnoDto getAlumnoById(Integer id);
    public NpoAlumno getById(Integer id);
}

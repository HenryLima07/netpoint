package hl.booking_app.booking.dto;

import hl.booking_app.booking.entities.NpoAlumno;
import hl.booking_app.booking.entities.NpoClasesGrupal;
import lombok.Data;
@Data
public class ClaseAlumnoDto {
    private Integer id;
    private AlumnoDto alumno;
    private ClaseGrupalDto clasesGrupales;
    private String claEstado;

}

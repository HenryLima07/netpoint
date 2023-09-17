package hl.booking_app.booking.dto.request;

import lombok.Data;

@Data
public class ClaseAlumnoRequest {
    private Integer alumnoId;
    private Integer clasesGrupalesId;
    private String claEstado;

}

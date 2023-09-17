package hl.booking_app.booking.dto.request;

import lombok.Data;

@Data
public class CanchaRequest {
    private String canNombre;
    private String canEstado;
    private String canDireccion;
    private Integer canFoto;
}

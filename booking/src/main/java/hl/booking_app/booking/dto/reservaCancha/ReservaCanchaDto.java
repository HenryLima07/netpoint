package hl.booking_app.booking.dto.reservaCancha;

import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class ReservaCanchaDto {
    private String rscTipoReserva;
    private String rscFecha; //converting instant object to string java
    private Date rscFechaReserva;
    private String rscHoraDesde;
    private String rscHoraHasta;
    private String rscEstado;
    private String rscComentarios;
    private String rscTipoPago;
    private String rscReferenciaPago;

    private PersonaReservaDto persona;
    private CanchaReservaDto cancha;
}

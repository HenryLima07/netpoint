package hl.booking_app.booking.dto.request;

import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoPersona;
import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class ReservaCanchaRequest {
    private String rscTipoReserva;
    private Date rscFechaReserva;
    private String rscHoraDesde;
    private String rscHoraHasta;
    private String rscEstado;
    private String rscComentarios;
    private String rscTipoPago;
    private String rscReferenciaPago;
    private Integer canchaId;
}

package hl.booking_app.booking.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoPersona;
import hl.booking_app.booking.utils.DateDeserealizer;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;
import java.util.Date;

@Data
public class ReservaCanchaRequest {
    private String rscTipoReserva;

    @JsonDeserialize(using = DateDeserealizer.class)
    private Date rscFechaReserva;
    private String rscHoraDesde;
    private String rscHoraHasta;
    private String rscEstado;
    private String rscComentarios;
    private String rscTipoPago;
    private String rscReferenciaPago;
    private Integer canchaId;
}

package hl.booking_app.booking.dto.request;

import lombok.Data;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

@Data
public class PaqueteRequest {
    private String paqNombre;

    private String paqTipo;

    private BigDecimal paqPrecio;

    private String paqEstado;

    private BigInteger paqCantidad;

    private Date paqFechaDesde;

    private Date paqFechaHasta;

    private String paqLinkPago;

}

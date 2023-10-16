package hl.booking_app.booking.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import javax.persistence.Column;

import hl.booking_app.booking.utils.DateDeserealizer;

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

    @JsonDeserialize(using = DateDeserealizer.class)
    private Date paqFechaDesde;

    @JsonDeserialize(using = DateDeserealizer.class)
    private Date paqFechaHasta;

    private String paqLinkPago;

}

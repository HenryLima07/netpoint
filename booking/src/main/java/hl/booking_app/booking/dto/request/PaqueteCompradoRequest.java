package hl.booking_app.booking.dto.request;

import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.entities.NpoPersona;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;

@Data
public class PaqueteCompradoRequest {
    private Integer id;
    private Integer paqId;
    private String pqcRestricciones;
    private String pqcEstado = "ACT";
    private BigInteger pqcCantidad;
    private BigInteger pqcRedimidos = BigInteger.valueOf(0);
    private String pqcReferencia;
    private BigDecimal pqcPrecio;
    private BigDecimal pqcDescuento;
}

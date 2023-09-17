package hl.booking_app.booking.dto;

import hl.booking_app.booking.dto.reservaCancha.PersonaReservaDto;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.entities.NpoPersona;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
@Data
public class PaqueteCompradoDto {
    private Integer id;
    private PaqueteDto paq;
    private String pqcRestricciones;
    private String pqcEstado;
    private BigInteger pqcCantidad;
    private BigInteger pqcRedimidos;
    private String pqcReferencia;
    private BigDecimal pqcPrecio;

    private BigDecimal pqcDescuento;
    private PersonaReservaDto persona;

}

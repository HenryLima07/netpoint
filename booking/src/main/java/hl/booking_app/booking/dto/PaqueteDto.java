package hl.booking_app.booking.dto;

import hl.booking_app.booking.dto.reservaCancha.PersonaReservaDto;
import hl.booking_app.booking.entities.NpoPaquete;
import hl.booking_app.booking.entities.NpoPaquetesComprado;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PaqueteDto {

    private Integer id;
    private String paqNombre;
    private String paqTipo;
    private BigDecimal paqPrecio;
    private String paqEstado;
    private BigInteger paqCantidad;
    private Date paqFechaDesde;
    private Date paqFechaHasta;
    private String paqLinkPago;
}

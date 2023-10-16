package hl.booking_app.booking.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

import hl.booking_app.booking.utils.DateDeserealizer;

@Data
public class AlumnoRequest {

    private Integer id;
    
    @JsonDeserialize(using = DateDeserealizer.class)
    private Date almFechaInicio;
    private Integer almNivel;
    private Integer almDiaPago;
    private String almEstado;
    private String almTipoPago;
    private String almEstadoPago;
    private Integer almCuotasPendientes;

    //clases
    private Integer clasesGrupale;
    //usuario
    private String userEmail;
}

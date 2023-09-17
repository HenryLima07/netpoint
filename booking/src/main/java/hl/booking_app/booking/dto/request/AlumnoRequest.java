package hl.booking_app.booking.dto.request;

import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

@Data
public class AlumnoRequest {

    private Integer id;
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

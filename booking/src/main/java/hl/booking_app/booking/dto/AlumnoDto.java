package hl.booking_app.booking.dto;

import hl.booking_app.booking.dto.reservaCancha.PersonaReservaDto;
import hl.booking_app.booking.entities.NpoClasesAlumno;
import hl.booking_app.booking.entities.NpoDetallePago;
import lombok.Data;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class AlumnoDto {
    private Integer id;
    private Date almFechaInicio;
    private BigInteger almNivel;
    private BigInteger almDiaPago;
    private String almEstado;
    private String almTipoPago;
    private String almEstadoPago;
    private BigInteger almCuotasPendientes;

//TODO: Clases grupales
//    private NpoClasesGrupal clasesGrupales;

    private PersonaReservaDto persona;

//    private List<NpoClasesAlumno> clasesAlumnos = new ArrayList<>();
//    private List<NpoDetallePago> detallePagos = new ArrayList<>();

}

package hl.booking_app.booking.dto.request;

import hl.booking_app.booking.entities.*;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
@Data
public class ClaseGrupalRequest {
    private Integer clgNivel;
    private String clgDia;
    private String clgHoraDesde;
    private String clgHoraHasta;
    private Float clgPrecio;
    private String clgLinkPago;
    private String clgEstado;
    private Integer claseGrupalCanchaId;
    private Integer horariosCanchaId;
//    private List<NpoAlumno> clgAlumnos = new ArrayList<>();
//    private List<NpoClasesAlumno> clgClasesAlumnos = new ArrayList<>();
//    private List<NpoDetallePago> clgDetallePagos = new ArrayList<>();
//    private List<NpoHorariosClase> clgHorariosClases = new ArrayList<>();
}

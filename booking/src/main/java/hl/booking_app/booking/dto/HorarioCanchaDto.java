package hl.booking_app.booking.dto;

import hl.booking_app.booking.dto.reservaCancha.CanchaReservaDto;
import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoHorariosClase;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
public class HorarioCanchaDto {
    private Integer id;
    private String hocTipoHorario;
    private BigDecimal hocPrecio;
    private String hocLinkPago;
    private String hocDia;
    private String hocHoraDesde;
    private String hocHoraHasta;
    private String hocEstado;
    private CanchaReservaDto can;
//    private List<NpoHorariosClase> npoHorariosClases = new ArrayList<>();
}

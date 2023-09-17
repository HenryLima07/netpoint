package hl.booking_app.booking.dto.request;

import hl.booking_app.booking.entities.NpoCancha;
import hl.booking_app.booking.entities.NpoHorariosClase;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class HorarioCanchaRequest {
    private String hocTipoHorario;
    private Integer hocPrecio;
    private String hocLinkPago;
    private String hocDia;
    private String hocHoraDesde;
    private String hocHoraHasta;
    private String hocEstado;
    private Integer idCan;
//    private List<NpoHorariosClase> npoHorariosClases = new ArrayList<>();
}

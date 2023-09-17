package hl.booking_app.booking.dto.request;

import hl.booking_app.booking.entities.NpoClasesGrupal;
import hl.booking_app.booking.entities.NpoHorariosCancha;
import hl.booking_app.booking.entities.NpoReservasCancha;
import lombok.Data;

import javax.persistence.OneToMany;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
public class UpdateCanchaRequest {
    private String canNombre;
    private String canEstado;
    private String canDireccion;
    private Integer canFoto;
    private Set<NpoClasesGrupal> clasesGrupales = new LinkedHashSet<>();
    private Set<NpoHorariosCancha> horariosCanchas = new LinkedHashSet<>();
    private Set<NpoReservasCancha> reservasCanchas = new LinkedHashSet<>();
}

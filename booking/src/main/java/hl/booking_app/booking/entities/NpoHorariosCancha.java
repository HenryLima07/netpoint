package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@XmlRootElement
@Table(name = "npo_horarios_cancha")
public class NpoHorariosCancha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hoc_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "hoc_tipo_horario", length = 3)
    private String hocTipoHorario;

    @Column(name = "hoc_precio")
    private BigDecimal hocPrecio;

    @Column(name = "hoc_link_pago", length = 500)
    private String hocLinkPago;

    @Column(name = "hoc_dia", length = 3)
    private String hocDia;

    @Column(name = "hoc_hora_desde", length = 6)
    private String hocHoraDesde;

    @Column(name = "hoc_hora_hasta", length = 6)
    private String hocHoraHasta;

    @Column(name = "hoc_estado", length = 3)
    private String hocEstado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "can_id")
    private NpoCancha can;

    @OneToMany(mappedBy = "horarioCancha")
    private List<NpoHorariosClase> npoHorariosClases = new ArrayList<>();

}
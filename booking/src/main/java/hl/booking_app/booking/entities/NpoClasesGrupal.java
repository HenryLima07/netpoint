package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoClasesGrupal.findAll", query = "SELECT cg FROM NpoClasesGrupal cg")
)
@Table(name = "npo_clases_grupales")
public class NpoClasesGrupal implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clg_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "clg_nivel")
    private BigInteger clgNivel;

    @Column(name = "clg_dia", length = 3)
    private String clgDia;

    @Column(name = "clg_hora_desde", length = 6)
    private String clgHoraDesde;

    @Column(name = "clg_hora_hasta", length = 6)
    private String clgHoraHasta;

    @Column(name = "clg_precio")
    private BigDecimal clgPrecio;

    @Column(name = "clg_link_pago", length = 500)
    private String clgLinkPago;

    @Column(name = "clg_estado", length = 3)
    private String clgEstado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "can_id", referencedColumnName = "can_id")
    private NpoCancha clgCancha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hoc_id", referencedColumnName = "hoc_id")
    private NpoHorariosCancha clgHorariosCancha;

    @OneToMany(mappedBy = "clasesGrupales")
    private List<NpoAlumno> clgAlumnos = new ArrayList<>();

    @OneToMany(mappedBy = "clasesGrupales")
    private List<NpoClasesAlumno> clgClasesAlumnos = new ArrayList<>();

    @OneToMany(mappedBy = "clasesGrupales")
    private List<NpoDetallePago> clgDetallePagos = new ArrayList<>();

    @OneToMany(mappedBy = "clasesGrupales")
    private List<NpoHorariosClase> clgHorariosClases = new ArrayList<>();

}
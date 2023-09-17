package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigInteger;
import java.time.Instant;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "npo_alumnos")
@NamedQueries(
        @NamedQuery(name = "NpoAlumno.findAll", query = "select alm from NpoAlumno alm")
)
@XmlRootElement
public class NpoAlumno implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alm_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "alm_fecha_inicio", columnDefinition = "DATE")
    private Date almFechaInicio;

    @Column(name = "alm_nivel")
    private BigInteger almNivel;

    @Column(name = "alm_dia_pago")
    private BigInteger almDiaPago;

    @Column(name = "alm_estado", length = 3)
    private String almEstado;

    @Column(name = "alm_tipo_pago", length = 3)
    private String almTipoPago;

    @Column(name = "alm_estado_pago", length = 3)
    private String almEstadoPago;

    @Column(name = "alm_cuotas_pendientes")
    private BigInteger almCuotasPendientes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clg_id", referencedColumnName = "clg_id")
    private NpoClasesGrupal clasesGrupales;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "per_id", referencedColumnName = "per_id")
    private NpoPersona persona;

    @OneToMany(mappedBy = "alumno")
    private List<NpoClasesAlumno> clasesAlumnos = new ArrayList<>();

    @OneToMany(mappedBy = "alumno")
    private List<NpoDetallePago> detallePagos = new ArrayList<>();

}
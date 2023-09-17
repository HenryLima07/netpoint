package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoReservasCancha.findAll", query = "select rsc from NpoReservasCancha rsc")
)
@Table(name = "npo_reservas_cancha")
public class NpoReservasCancha implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "rsc_id")
    private Integer id;

    @Column(name = "rsc_tipo_reserva", length = 3)
    private String rscTipoReserva;

    @Column(name = "rsc_fecha")
    private Instant rscFecha;

    @Column(name = "rsc_fecha_reserva", columnDefinition = "DATE")
    private Date rscFechaReserva;

    @Column(name = "rsc_hora_desde", length = 6)
    private String rscHoraDesde;

    @Column(name = "rsc_hora_hasta", length = 6)
    private String rscHoraHasta;

    @Column(name = "rsc_estado", length = 3)
    private String rscEstado;

    @Column(name = "rsc_comentarios", length = 500)
    private String rscComentarios;

    @Column(name = "rsc_tipo_pago", length = 3)
    private String rscTipoPago;

    @Column(name = "rsc_referencia_pago", length = 20)
    private String rscReferenciaPago;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "can_id", referencedColumnName = "can_id")
    private NpoCancha cancha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "per_id", referencedColumnName = "per_id")
    private NpoPersona persona;

}
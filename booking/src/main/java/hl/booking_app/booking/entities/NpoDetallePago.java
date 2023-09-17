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
        @NamedQuery(name = "NpoDetallePago.findAll", query = "select dtp from NpoDetallePago dtp")
)
@Table(name = "npo_detalle_pagos")
public class NpoDetallePago implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dtp_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "dtp_fecha_desde", columnDefinition = "DATE")
    private Date dtpFechaDesde;

    @Column(name = "dtp_fecha_hasta", columnDefinition = "DATE")
    private Date dtpFechaHasta;

    @Column(name = "dtp_fecha_pago")
    private Instant dtpFechaPago;

    @Column(name = "dtp_estado", length = 3)
    private String dtpEstado;

    @Column(name = "dtp_tipo_pago", length = 3)
    private String dtpTipoPago;

    @Column(name = "dtp_comentarios", length = 200)
    private String dtpComentarios;

    @Column(name = "dtp_referencia_pago", length = 20)
    private String dtpReferenciaPago;

    @Column(name = "img_id")
    private Integer imgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alm_id", referencedColumnName = "alm_id")
    private NpoAlumno alumno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clg_id", referencedColumnName = "clg_id")
    private NpoClasesGrupal clasesGrupales;

}
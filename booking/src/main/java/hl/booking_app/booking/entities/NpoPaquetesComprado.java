package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoPaquetesComprado.findAll", query = "select pqc from NpoPaquetesComprado pqc")
)
@Table(name = "npo_paquetes_comprados")
public class NpoPaquetesComprado implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pqc_id")
    @Basic(optional = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paq_id")
    private NpoPaquete paq;

    @Column(name = "pqc_restricciones", length = 200)
    private String pqcRestricciones;

    @Column(name = "pqc_estado", length = 3)
    private String pqcEstado;

    @Column(name = "pqc_cantidad")
    private BigInteger pqcCantidad;

    @Column(name = "pqc_redimidos")
    private BigInteger pqcRedimidos;

    @Column(name = "pqc_referencia", length = 30)
    private String pqcReferencia;

    @Column(name = "pqc_precio")
    private BigDecimal pqcPrecio;

    @Column(name = "pqc_descuento")
    private BigDecimal pqcDescuento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "per_id", referencedColumnName = "per_id")
    private NpoPersona persona;

}
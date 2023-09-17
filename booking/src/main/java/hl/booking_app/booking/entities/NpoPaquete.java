package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoPaquete.findAll", query = "select paq from NpoPaquete paq")
)
@Table(name = "npo_paquetes")
public class NpoPaquete implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "paq_id")
    private Integer id;

    @Column(name = "paq_nombre", length = 50)
    private String paqNombre;

    @Column(name = "paq_tipo", length = 3)
    private String paqTipo;

    @Column(name = "paq_precio")
    private BigDecimal paqPrecio;

    @Column(name = "paq_estado", length = 3)
    private String paqEstado;

    @Column(name = "paq_cantidad")
    private BigInteger paqCantidad;

    @Column(name = "paq_fecha_desde", columnDefinition = "DATE")
    private Date paqFechaDesde;

    @Column(name = "paq_fecha_hasta", columnDefinition = "DATE")
    private Date paqFechaHasta;

    @Column(name = "paq_link_pago", length = 500)
    private String paqLinkPago;

    @OneToMany(mappedBy = "paq")
    private List<NpoPaquetesComprado> paquetesComprados = new ArrayList<>();

}
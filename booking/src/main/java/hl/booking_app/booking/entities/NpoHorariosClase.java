package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoHorariosClase.findAll", query = "select hcl from NpoHorariosClase hcl")
)
@Table(name = "npo_horarios_clases")
public class NpoHorariosClase implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hcl_id")
    @Basic(optional = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hoc_id", referencedColumnName = "hoc_id")
    private NpoHorariosCancha horarioCancha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clg_id", referencedColumnName = "clg_id")
    private NpoClasesGrupal clasesGrupales;

}
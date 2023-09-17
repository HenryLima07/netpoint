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
        @NamedQuery(name = "NpoClasesAlumno.findAll", query = "select cla from NpoClasesAlumno cla")
)
@Table(name = "npo_clases_alumnos")
public class NpoClasesAlumno implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cla_id")
    @Basic(optional = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alm_id", referencedColumnName = "alm_id")
    private NpoAlumno alumno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clg_id", referencedColumnName = "clg_id")
    private NpoClasesGrupal clasesGrupales;

    @Column(name = "cla_estado", length = 3)
    private String claEstado;

}
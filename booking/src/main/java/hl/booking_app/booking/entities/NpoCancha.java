package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@XmlRootElement
@NamedQueries(
        @NamedQuery(name = "NpoCancha.findAll", query = "select can from NpoCancha can")
)
@Table(name = "npo_canchas")
public class NpoCancha implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "can_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Integer id;

    @Column(name = "can_nombre", length = 100)
    private String canNombre;

    @Column(name = "can_estado", length = 3)
    private String canEstado;

    @Column(name = "can_direccion", length = 200)
    private String canDireccion;

    @Column(name = "fot_id")
    private Integer canFoto;

    @OneToMany(mappedBy = "clgCancha")
    private List<NpoClasesGrupal> clasesGrupales = new ArrayList<>();

    @OneToMany(mappedBy = "can")
    private List<NpoHorariosCancha> horariosCanchas = new ArrayList<>();

    @OneToMany(mappedBy = "cancha")
    private List<NpoReservasCancha> reservasCanchas = new ArrayList<>();

}
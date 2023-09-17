package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.Instant;
import java.util.*;

@Getter
@Setter
@Entity
@XmlRootElement
@Table(name = "npo_personas")
@NamedQueries(
        @NamedQuery(name = "NpoPersona.findAll", query = "select per from NpoPersona per")
)
public class NpoPersona implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "per_id")
    private Integer id;

    @Column(name = "per_nombres", length = 30)
    private String perNombres;

    @Column(name = "per_apellidos", length = 30)
    private String perApellidos;

    @Column(name = "per_fecha_nac", columnDefinition = "DATE")
    private Date perFechaNac;

    @Column(name = "per_estado", length = 3)
    private String perEstado;

    @Column(name = "per_email", length = 100)
    private String perEmail;

    @Column(name = "per_telefono", length = 20)
    private String perTelefono;

    @Column(name = "per_clave") //, length = 20
    private String perClave;

    @Column(name = "pre_fecha_registro")
    private Instant preFechaRegistro;

    @OneToMany(mappedBy = "persona")
    private Set<NpoAlumno> alumnos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "persona")
    private List<NpoPaquetesComprado> npoPaquetesComprados = new ArrayList<>();

    @OneToMany(mappedBy = "persona")
    private List<NpoReservasCancha> reservasCanchas = new ArrayList<>();

}
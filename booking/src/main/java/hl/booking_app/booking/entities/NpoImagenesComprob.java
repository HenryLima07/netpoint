package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

@Getter
@Setter
@Entity
@XmlRootElement
@Table(name = "npo_imagenes_comprob")
public class NpoImagenesComprob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "img_tipo", length = 3)
    private String imgTipo;

    @Column(name = "img_imagen")
    private Byte[] imgImagen;

}
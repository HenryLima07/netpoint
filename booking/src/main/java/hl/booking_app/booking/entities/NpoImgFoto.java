package hl.booking_app.booking.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

@Getter
@Setter
@Entity
@XmlRootElement
@Table(name = "npo_img_fotos")
public class NpoImgFoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fot_id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "fot_imagen")
    private Byte[] fotImagen;

}
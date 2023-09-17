package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoImgFoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImgFotoRepository extends JpaRepository<NpoImgFoto, Integer> {
}

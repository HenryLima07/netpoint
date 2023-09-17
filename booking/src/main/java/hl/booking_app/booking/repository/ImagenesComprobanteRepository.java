package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoImagenesComprob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenesComprobanteRepository extends JpaRepository<NpoImagenesComprob, Integer> {
}

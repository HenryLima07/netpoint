package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoCancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanchaRepository extends JpaRepository<NpoCancha, Integer> {
    @Query(value = "select cancha from NpoCancha cancha where cancha.canEstado =:estado")
    public List<NpoCancha> findAllByCanEstado(String estado);
}

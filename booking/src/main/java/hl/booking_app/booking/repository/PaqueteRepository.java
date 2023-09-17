package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoPaquete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaqueteRepository extends JpaRepository<NpoPaquete, Integer> {
    @Query(value = "SELECT paq from NpoPaquete paq where paq.paqEstado = 'ACT'")
    public List<NpoPaquete> findAllByPaqEstado();
}

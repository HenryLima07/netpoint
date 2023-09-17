package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoPaquetesComprado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaqueteCompradoRepository extends JpaRepository<NpoPaquetesComprado, Integer> {
    public List<NpoPaquetesComprado> findAllByPersonaId(Integer id);
    public List<NpoPaquetesComprado> findAllByPersonaIdAndPqcEstado(Integer id, String pqcEstado);
    @Query(value = "select pqc from NpoPaquetesComprado pqc where pqc.persona.id =:id and pqc.pqcCantidad > 0")
    public List<NpoPaquetesComprado> findAllByPersonaIdAndPqc(Integer id);
}

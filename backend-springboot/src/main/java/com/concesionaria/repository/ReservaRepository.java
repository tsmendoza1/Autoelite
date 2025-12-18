package com.concesionaria.repository;

import com.concesionaria.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad Reserva
 */
@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByClienteId(Long clienteId);
    
    List<Reserva> findByAutoId(Long autoId);
    
    List<Reserva> findByEstado(String estado);
}

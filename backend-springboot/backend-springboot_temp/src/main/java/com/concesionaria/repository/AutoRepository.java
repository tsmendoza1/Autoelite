package com.concesionaria.repository;

import com.concesionaria.model.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Repositorio JPA para la entidad Auto
 */
@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {
    
    List<Auto> findByEstado(String estado);
    
    List<Auto> findByMarcaAndModelo(String marca, String modelo);
    
    @Query("SELECT a FROM Auto a WHERE " +
           "(:marca IS NULL OR a.marca = :marca) AND " +
           "(:modelo IS NULL OR LOWER(a.modelo) LIKE LOWER(CONCAT('%', :modelo, '%'))) AND " +
           "(:anioMin IS NULL OR a.anio >= :anioMin) AND " +
           "(:anioMax IS NULL OR a.anio <= :anioMax) AND " +
           "(:precioMin IS NULL OR a.precio >= :precioMin) AND " +
           "(:precioMax IS NULL OR a.precio <= :precioMax) AND " +
           "(:estado IS NULL OR a.estado = :estado)")
    List<Auto> buscarConFiltros(
        @Param("marca") String marca,
        @Param("modelo") String modelo,
        @Param("anioMin") Integer anioMin,
        @Param("anioMax") Integer anioMax,
        @Param("precioMin") BigDecimal precioMin,
        @Param("precioMax") BigDecimal precioMax,
        @Param("estado") String estado
    );
}

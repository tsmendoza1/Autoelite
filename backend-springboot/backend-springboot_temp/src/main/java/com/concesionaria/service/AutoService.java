package com.concesionaria.service;

import com.concesionaria.model.Auto;
import com.concesionaria.repository.AutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para la lógica de negocio de Auto
 */
@Service
@RequiredArgsConstructor
public class AutoService {

    private final AutoRepository autoRepository;

    @Transactional(readOnly = true)
    public List<Auto> obtenerTodos() {
        return autoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Auto> obtenerPorId(Long id) {
        return autoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Auto> obtenerDisponibles() {
        return autoRepository.findByEstado("Disponible");
    }

    @Transactional(readOnly = true)
    public List<Auto> buscarConFiltros(String marca, String modelo, 
                                        Integer anioMin, Integer anioMax,
                                        BigDecimal precioMin, BigDecimal precioMax,
                                        String estado) {
        return autoRepository.buscarConFiltros(marca, modelo, anioMin, anioMax, 
                                               precioMin, precioMax, estado);
    }

    @Transactional
    public Auto crear(Auto auto) {
        return autoRepository.save(auto);
    }

    @Transactional
    public Auto actualizar(Long id, Auto autoActualizado) {
        return autoRepository.findById(id)
            .map(auto -> {
                auto.setMarca(autoActualizado.getMarca());
                auto.setModelo(autoActualizado.getModelo());
                auto.setAnio(autoActualizado.getAnio());
                auto.setPrecio(autoActualizado.getPrecio());
                auto.setKilometraje(autoActualizado.getKilometraje());
                auto.setColor(autoActualizado.getColor());
                auto.setTransmision(autoActualizado.getTransmision());
                auto.setCombustible(autoActualizado.getCombustible());
                auto.setDescripcion(autoActualizado.getDescripcion());
                auto.setImagenUrl(autoActualizado.getImagenUrl());
                auto.setEstado(autoActualizado.getEstado());
                return autoRepository.save(auto);
            })
            .orElseThrow(() -> new RuntimeException("Auto no encontrado"));
    }

    @Transactional
    public void eliminar(Long id) {
        autoRepository.deleteById(id);
    }
}

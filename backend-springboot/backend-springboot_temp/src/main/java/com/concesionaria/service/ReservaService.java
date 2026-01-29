package com.concesionaria.service;

import com.concesionaria.model.Reserva;
import com.concesionaria.repository.ReservaRepository;
import com.concesionaria.repository.AutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para la lógica de negocio de Reserva
 */
@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final AutoRepository autoRepository;
    private final com.concesionaria.repository.PersonaRepository personaRepository;

    @Transactional(readOnly = true)
    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Reserva> obtenerPorId(Long id) {
        return reservaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerPorPersona(Long personaId) {
        return reservaRepository.findByPersonaId(personaId);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerPorAuto(Long autoId) {
        return reservaRepository.findByAutoId(autoId);
    }

    @Transactional
    public Reserva crear(Reserva reserva) {
        // Cargar entidades gestionadas para evitar errores de "Transient instance"
        if (reserva.getPersona() != null && reserva.getPersona().getId() != null) {
            com.concesionaria.model.Persona persona = personaRepository.findById(reserva.getPersona().getId())
                    .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
            reserva.setPersona(persona);
        }

        if (reserva.getAuto() != null && reserva.getAuto().getId() != null) {
            com.concesionaria.model.Auto auto = autoRepository.findById(reserva.getAuto().getId())
                    .orElseThrow(() -> new RuntimeException("Auto no encontrado"));

            // Actualizar estado del auto a Reservado
            auto.setEstado("Reservado");
            autoRepository.save(auto);

            reserva.setAuto(auto);
        }

        return reservaRepository.save(reserva);
    }

    @Transactional
    public Reserva actualizar(Long id, Reserva reservaActualizada) {
        return reservaRepository.findById(id)
                .map(reserva -> {
                    reserva.setFechaInicio(reservaActualizada.getFechaInicio());
                    reserva.setFechaFin(reservaActualizada.getFechaFin());
                    reserva.setEstado(reservaActualizada.getEstado());
                    reserva.setNotas(reservaActualizada.getNotas());

                    // Si se cancela la reserva, volver el auto a Disponible
                    if ("Cancelada".equals(reservaActualizada.getEstado())) {
                        autoRepository.findById(reserva.getAuto().getId())
                                .ifPresent(auto -> {
                                    auto.setEstado("Disponible");
                                    autoRepository.save(auto);
                                });
                    }

                    return reservaRepository.save(reserva);
                })
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
    }

    @Transactional
    public void eliminar(Long id) {
        reservaRepository.findById(id).ifPresent(reserva -> {
            // Volver el auto a Disponible
            autoRepository.findById(reserva.getAuto().getId())
                    .ifPresent(auto -> {
                        auto.setEstado("Disponible");
                        autoRepository.save(auto);
                    });
            reservaRepository.deleteById(id);
        });
    }
}

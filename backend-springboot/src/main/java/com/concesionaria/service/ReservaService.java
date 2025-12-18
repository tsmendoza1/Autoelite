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

    @Transactional(readOnly = true)
    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Reserva> obtenerPorId(Long id) {
        return reservaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerPorCliente(Long clienteId) {
        return reservaRepository.findByClienteId(clienteId);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerPorAuto(Long autoId) {
        return reservaRepository.findByAutoId(autoId);
    }

    @Transactional
    public Reserva crear(Reserva reserva) {
        // Actualizar estado del auto a Reservado
        if (reserva.getAuto() != null) {
            autoRepository.findById(reserva.getAuto().getId())
                .ifPresent(auto -> {
                    auto.setEstado("Reservado");
                    autoRepository.save(auto);
                });
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

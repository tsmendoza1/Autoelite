package com.concesionaria.service;

import com.concesionaria.model.Persona;
import com.concesionaria.repository.PersonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para la lógica de negocio de Cliente
 */
@Service
@RequiredArgsConstructor
public class PersonaService {

    private final PersonaRepository personaRepository;

    @Transactional(readOnly = true)
    public List<Persona> obtenerTodos() {
        return personaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Persona> obtenerPorId(Long id) {
        return personaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Persona> buscarPorNombre(String termino) {
        return personaRepository.findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(
                termino, termino);
    }

    @Transactional
    public Persona crear(Persona persona) {
        // Validar email único
        Optional<Persona> existente = personaRepository.findByEmail(persona.getEmail());
        if (existente.isPresent()) {
            throw new RuntimeException("Ya existe una persona con ese email");
        }
        return personaRepository.save(persona);
    }

    @Transactional
    public Persona actualizar(Long id, Persona personaActualizada) {
        return personaRepository.findById(id)
                .map(persona -> {
                    if (personaActualizada.getNombre() != null)
                        persona.setNombre(personaActualizada.getNombre());
                    if (personaActualizada.getApellido() != null)
                        persona.setApellido(personaActualizada.getApellido());
                    if (personaActualizada.getEmail() != null)
                        persona.setEmail(personaActualizada.getEmail());
                    if (personaActualizada.getTelefono() != null)
                        persona.setTelefono(personaActualizada.getTelefono());
                    if (personaActualizada.getDireccion() != null)
                        persona.setDireccion(personaActualizada.getDireccion());
                    if (personaActualizada.getDni() != null)
                        persona.setDni(personaActualizada.getDni());

                    if (personaActualizada.getActivo() != null) {
                        persona.setActivo(personaActualizada.getActivo());
                    }

                    if (personaActualizada.getRol() != null) {
                        persona.setRol(personaActualizada.getRol());
                    }
                    if (personaActualizada.getPassword() != null) {
                        persona.setPassword(personaActualizada.getPassword());
                    }
                    return personaRepository.save(persona);
                })
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
    }

    @Transactional
    public void eliminar(Long id) {
        personaRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Persona login(String email, String password) {
        Optional<Persona> personaOpt = personaRepository.findByEmail(email);
        if (personaOpt.isPresent()) {
            Persona persona = personaOpt.get();
            if (persona.getPassword() != null && persona.getPassword().equals(password)) {
                return persona;
            }
        }
        return null;
    }
}

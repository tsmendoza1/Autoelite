package com.concesionaria.controller;

import com.concesionaria.model.Persona;
import com.concesionaria.service.PersonaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestión de Personas
 */
@RestController
@RequestMapping("/personas")
@RequiredArgsConstructor
public class PersonaController {

    private final PersonaService personaService;

    @GetMapping
    public ResponseEntity<List<Persona>> obtenerTodos() {
        return ResponseEntity.ok(personaService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> obtenerPorId(@PathVariable Long id) {
        return personaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Persona>> buscar(@RequestParam String termino) {
        return ResponseEntity.ok(personaService.buscarPorNombre(termino));
    }

    @PostMapping
    public ResponseEntity<Persona> crear(@Valid @RequestBody Persona persona) {
        try {
            Persona nuevaPersona = personaService.crear(persona);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaPersona);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Persona> actualizar(
            @PathVariable Long id,
            @RequestBody Persona persona) {
        try {
            Persona personaActualizada = personaService.actualizar(id, persona);
            return ResponseEntity.ok(personaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        personaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

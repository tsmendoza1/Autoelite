package com.concesionaria.controller;

import com.concesionaria.model.Auto;
import com.concesionaria.service.AutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Controlador REST para gestión de Autos
 */
@RestController
@RequestMapping("/autos")
@RequiredArgsConstructor
public class AutoController {

    private final AutoService autoService;

    @GetMapping
    public ResponseEntity<List<Auto>> obtenerTodos() {
        return ResponseEntity.ok(autoService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> obtenerPorId(@PathVariable Long id) {
        return autoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Auto>> obtenerDisponibles() {
        return ResponseEntity.ok(autoService.obtenerDisponibles());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Auto>> buscar(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anioMin,
            @RequestParam(required = false) Integer anioMax,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false) String estado) {
        List<Auto> autos = autoService.buscarConFiltros(
                marca, modelo, anioMin, anioMax, precioMin, precioMax, estado);
        return ResponseEntity.ok(autos);
    }

    @PostMapping
    public ResponseEntity<Auto> crear(@Valid @RequestBody Auto auto) {
        Auto nuevoAuto = autoService.crear(auto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAuto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auto> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Auto auto) {
        try {
            Auto autoActualizado = autoService.actualizar(id, auto);
            return ResponseEntity.ok(autoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        autoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

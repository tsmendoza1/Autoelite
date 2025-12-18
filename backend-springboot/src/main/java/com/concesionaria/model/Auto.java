package com.concesionaria.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Entidad JPA para Auto
 * Representa un vehículo en el inventario de la concesionaria
 */
@Entity
@Table(name = "autos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marca es obligatoria")
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String marca;

    @NotBlank(message = "El modelo es obligatorio")
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String modelo;

    @NotNull(message = "El año es obligatorio")
    @Min(value = 1900, message = "El año debe ser mayor a 1900")
    @Column(nullable = false)
    private Integer anio;

    @NotNull(message = "El precio es obligatorio")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer kilometraje = 0;

    @Size(max = 30)
    @Column(length = 30)
    private String color;

    @Size(max = 20)
    @Column(length = 20)
    private String transmision;

    @Size(max = 20)
    @Column(length = 20)
    private String combustible;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Size(max = 500)
    @Column(name = "imagen_url", length = 500)
    private String imagenUrl;

    @Size(max = 20)
    @Column(length = 20, nullable = false)
    private String estado = "Disponible";

    @Column(name = "fecha_ingreso", nullable = false, updatable = false)
    private LocalDateTime fechaIngreso;

    @OneToMany(mappedBy = "auto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserva> reservas;

    @PrePersist
    protected void onCreate() {
        fechaIngreso = LocalDateTime.now();
    }
}

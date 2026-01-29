package com.concesionaria.service;

import com.concesionaria.model.Auto;
import com.concesionaria.repository.AutoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AutoServiceTest {

    @Mock
    private AutoRepository autoRepository;

    @InjectMocks
    private AutoService autoService;

    @Test
    void obtenerTodos_DeberiaRetornarListaDeAutos() {
        // Arrange
        Auto auto1 = new Auto();
        auto1.setId(1L);
        auto1.setMarca("Toyota");

        Auto auto2 = new Auto();
        auto2.setId(2L);
        auto2.setMarca("Honda");

        when(autoRepository.findAll()).thenReturn(Arrays.asList(auto1, auto2));

        // Act
        List<Auto> resultado = autoService.obtenerTodos();

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        verify(autoRepository, times(1)).findAll();
    }

    @Test
    void obtenerPorId_CuandoExiste_DeberiaRetornarAuto() {
        // Arrange
        Long id = 1L;
        Auto auto = new Auto();
        auto.setId(id);

        when(autoRepository.findById(id)).thenReturn(Optional.of(auto));

        // Act
        Optional<Auto> resultado = autoService.obtenerPorId(id);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals(id, resultado.get().getId());
    }

    @Test
    void obtenerPorId_CuandoNoExiste_DeberiaRetornarVacio() {
        // Arrange
        Long id = 1L;
        when(autoRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Optional<Auto> resultado = autoService.obtenerPorId(id);

        // Assert
        assertFalse(resultado.isPresent());
    }

    @Test
    void crear_DeberiaGuardarYRetornarAuto() {
        // Arrange
        Auto autoParaGuardar = new Auto();
        autoParaGuardar.setMarca("Ford");

        Auto autoGuardado = new Auto();
        autoGuardado.setId(1L);
        autoGuardado.setMarca("Ford");

        when(autoRepository.save(any(Auto.class))).thenReturn(autoGuardado);

        // Act
        Auto resultado = autoService.crear(autoParaGuardar);

        // Assert
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Ford", resultado.getMarca());
        verify(autoRepository).save(autoParaGuardar);
    }

    @Test
    void actualizar_CuandoExiste_DeberiaActualizarYRetornarAuto() {
        // Arrange
        Long id = 1L;
        Auto autoExistente = new Auto();
        autoExistente.setId(id);
        autoExistente.setMarca("Toyota");

        Auto autoActualizadoDatos = new Auto();
        autoActualizadoDatos.setMarca("Toyota Updated");
        autoActualizadoDatos.setModelo("Corolla");
        autoActualizadoDatos.setPrecio(new BigDecimal("25000"));

        when(autoRepository.findById(id)).thenReturn(Optional.of(autoExistente));
        when(autoRepository.save(any(Auto.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Auto resultado = autoService.actualizar(id, autoActualizadoDatos);

        // Assert
        assertNotNull(resultado);
        assertEquals("Toyota Updated", resultado.getMarca());
        assertEquals("Corolla", resultado.getModelo());
        verify(autoRepository).findById(id);
        verify(autoRepository).save(any(Auto.class));
    }

    @Test
    void actualizar_CuandoNoExiste_DeberiaLanzarExcepcion() {
        // Arrange
        Long id = 99L;
        Auto autoDatos = new Auto();

        when(autoRepository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> autoService.actualizar(id, autoDatos));
        verify(autoRepository, never()).save(any());
    }

    @Test
    void eliminar_DeberiaLlamarRepositoryDelete() {
        // Arrange
        Long id = 1L;

        // Act
        autoService.eliminar(id);

        // Assert
        verify(autoRepository, times(1)).deleteById(id);
    }
}

package com.concesionaria.controller;

import com.concesionaria.config.DataInitializer;
import com.concesionaria.model.Auto;
import com.concesionaria.service.AutoService;
import com.concesionaria.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AutoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutoService autoService;

    // Prevent DataInitializer from running
    @MockBean
    private DataInitializer dataInitializer;

    // Initializer needs this, so mock it just in case
    @MockBean
    private UsuarioService usuarioService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void obtenerTodos_DeberiaRetornarListaYStatus200() throws Exception {
        // Arrange
        Auto auto1 = new Auto();
        auto1.setId(1L);
        auto1.setMarca("Toyota");

        when(autoService.obtenerTodos()).thenReturn(Arrays.asList(auto1));

        // Act & Assert
        mockMvc.perform(get("/autos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].marca").value("Toyota"));
    }

    @Test
    void obtenerPorId_CuandoExiste_DeberiaRetornarAutoYStatus200() throws Exception {
        // Arrange
        Long id = 1L;
        Auto auto = new Auto();
        auto.setId(id);

        when(autoService.obtenerPorId(id)).thenReturn(Optional.of(auto));

        // Act & Assert
        mockMvc.perform(get("/autos/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id));
    }

    @Test
    void obtenerPorId_CuandoNoExiste_DeberiaRetornar404() throws Exception {
        // Arrange
        Long id = 99L;
        when(autoService.obtenerPorId(id)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/autos/{id}", id))
                .andExpect(status().isNotFound());
    }

    @Test
    void crear_DeberiaRetornarAutoCreadoYStatus201() throws Exception {
        // Arrange
        Auto autoInput = new Auto();
        autoInput.setMarca("Ford");
        autoInput.setModelo("Mustang");
        autoInput.setAnio(2023);
        autoInput.setPrecio(new BigDecimal("50000"));
        autoInput.setEstado("Disponible");
        autoInput.setKilometraje(0);

        Auto autoCreado = new Auto();
        autoCreado.setId(1L);
        autoCreado.setMarca("Ford");
        autoCreado.setModelo("Mustang");
        autoCreado.setAnio(2023);
        autoCreado.setPrecio(new BigDecimal("50000"));
        autoCreado.setEstado("Disponible");

        when(autoService.crear(any(Auto.class))).thenReturn(autoCreado);

        // Act & Assert
        mockMvc.perform(post("/autos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(autoInput)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.marca").value("Ford"));
    }

    @Test
    void actualizar_CuandoExiste_DeberiaRetornarAutoActualizadoYStatus200() throws Exception {
        // Arrange
        Long id = 1L;
        Auto autoInput = new Auto();
        autoInput.setMarca("Toyota Updated");
        autoInput.setModelo("Camry");
        autoInput.setAnio(2022);
        autoInput.setPrecio(new BigDecimal("30000"));
        autoInput.setEstado("Disponible");

        Auto autoActualizado = new Auto();
        autoActualizado.setId(id);
        autoActualizado.setMarca("Toyota Updated");

        when(autoService.actualizar(eq(id), any(Auto.class))).thenReturn(autoActualizado);

        // Act & Assert
        mockMvc.perform(put("/autos/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(autoInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.marca").value("Toyota Updated"));
    }

    @Test
    void eliminar_DeberiaRetornarStatus204() throws Exception {
        // Arrange
        Long id = 1L;
        doNothing().when(autoService).eliminar(id);

        // Act & Assert
        mockMvc.perform(delete("/autos/{id}", id))
                .andExpect(status().isNoContent());
    }
}

package com.concesionaria.controller;

import com.concesionaria.model.Usuario;
import com.concesionaria.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        Usuario user = usuarioService.login(username, password);
        if (user != null) {
            // Return user details without password
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @Autowired
    private com.concesionaria.service.PersonaService personaService;

    @PostMapping("/persona/login")
    public ResponseEntity<?> loginPersona(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email y contraseña son requeridos");
        }

        com.concesionaria.model.Persona persona = personaService.login(email, password);
        if (persona != null) {
            // No borrar password del objeto entidad gestionado aquí si afecta hibernate
            // cache,
            // pero para respuesta ok.
            // Para seguridad simple:
            persona.setPassword(null);
            return ResponseEntity.ok(persona);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/persona/register")
    public ResponseEntity<?> registerPersona(
            @RequestBody @jakarta.validation.Valid com.concesionaria.model.Persona persona) {
        try {
            return ResponseEntity.ok(personaService.crear(persona));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar: " + e.getMessage());
        }
    }
}

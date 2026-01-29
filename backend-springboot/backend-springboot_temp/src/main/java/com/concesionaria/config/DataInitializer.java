package com.concesionaria.config;

import com.concesionaria.model.Usuario;
import com.concesionaria.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioService.count() == 0) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            usuarioService.createUsuario(admin);
            System.out.println("Usuario admin creado por defecto: admin / admin123");
        }
    }
}

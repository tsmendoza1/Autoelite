package com.concesionaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot
 * Sistema de gestión de concesionaria de automóviles
 */
@SpringBootApplication
public class ConcesionariaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConcesionariaApplication.class, args);
        System.out.println("==============================================");
        System.out.println("   API Concesionaria iniciada correctamente   ");
        System.out.println("   Accede a: http://localhost:8999/api        ");
        System.out.println("==============================================");
    }
}

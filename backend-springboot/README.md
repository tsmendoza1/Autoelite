# Backend Spring Boot - Sistema de Concesionaria

API REST completa para el sistema de gestión de concesionaria de automóviles.

## 🚀 Tecnologías

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Lombok**

## 📋 Requisitos Previos

- JDK 17 o superior
- Maven 3.6+
- PostgreSQL 12 o superior
- Git

## ⚙️ Configuración

### 1. Base de Datos PostgreSQL

Crea la base de datos:

```sql
CREATE DATABASE concesionaria_db;
```

Ejecuta los scripts SQL ubicados en `/scripts`:
- `01-create-tables.sql` - Crea las tablas
- `02-seed-data.sql` - Inserta datos de ejemplo

### 2. Configurar Credenciales

Edita `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/concesionaria_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD

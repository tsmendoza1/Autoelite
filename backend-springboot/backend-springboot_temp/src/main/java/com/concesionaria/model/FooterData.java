package com.concesionaria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "footer_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FooterData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String keyName; // e.g. "address", "phone", "email", "copyright"

    @Column(nullable = false, length = 500)
    private String value;
}

package com.concesionaria.repository;

import com.concesionaria.model.FooterData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FooterDataRepository extends JpaRepository<FooterData, Long> {
    Optional<FooterData> findByKeyName(String keyName);
}

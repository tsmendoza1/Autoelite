package com.concesionaria.service;

import com.concesionaria.model.FooterData;
import com.concesionaria.repository.FooterDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FooterDataService {

    private final FooterDataRepository repository;

    @Transactional(readOnly = true)
    public List<FooterData> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<FooterData> getByKey(String key) {
        return repository.findByKeyName(key);
    }

    @Transactional
    public FooterData saveOrUpdate(String key, String value) {
        Optional<FooterData> existing = repository.findByKeyName(key);
        FooterData data;
        if (existing.isPresent()) {
            data = existing.get();
            data.setValue(value);
        } else {
            data = new FooterData();
            data.setKeyName(key);
            data.setValue(value);
        }
        return repository.save(data);
    }
}

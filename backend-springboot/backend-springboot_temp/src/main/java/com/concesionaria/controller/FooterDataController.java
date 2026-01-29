package com.concesionaria.controller;

import com.concesionaria.model.FooterData;
import com.concesionaria.service.FooterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/footer")
@RequiredArgsConstructor
public class FooterDataController {

    private final FooterDataService service;

    @GetMapping
    public ResponseEntity<List<FooterData>> getFooterData() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<FooterData> updateFooterData(@RequestBody Map<String, String> payload) {
        String key = payload.get("keyName");
        String value = payload.get("value");
        if (key == null || value == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.saveOrUpdate(key, value));
    }
}

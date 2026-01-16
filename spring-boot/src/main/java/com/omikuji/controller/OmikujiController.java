package com.omikuji.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omikuji.dto.DrawRequest;
import com.omikuji.dto.DrawResponse;
import com.omikuji.dto.OmikujiResultDto;
import com.omikuji.model.OmikujiResult;
import com.omikuji.service.OmikujiService;

@RestController
@RequestMapping("/api/omikuji")
@CrossOrigin(origins = "*")
public class OmikujiController {
    private final OmikujiService service;

    public OmikujiController(OmikujiService service) {
        this.service = service;
    }

    @PostMapping("/draw")
    public ResponseEntity<DrawResponse> drawOmikuji(@RequestBody DrawRequest request) {
        String result = service.drawOmikuji();
        return ResponseEntity.ok(new DrawResponse(result));
    }

    @GetMapping("/results")
    public ResponseEntity<List<OmikujiResultDto>> getAllResults() {
        List<OmikujiResult> results = service.getAllResults();
        List<OmikujiResultDto> dtos = results.stream()
                .map(r -> new OmikujiResultDto(r.getId(), r.getName(), r.getDisplayOrder()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/results")
    public ResponseEntity<OmikujiResultDto> addResult(@RequestBody OmikujiResultDto dto) {
        OmikujiResult result = new OmikujiResult(dto.getName(), dto.getDisplayOrder());
        OmikujiResult saved = service.addResult(result);
        OmikujiResultDto response = new OmikujiResultDto(saved.getId(), saved.getName(), saved.getDisplayOrder());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/results/{id}")
    public ResponseEntity<OmikujiResultDto> updateResult(@PathVariable Long id, @RequestBody OmikujiResultDto dto) {
        OmikujiResult result = new OmikujiResult(dto.getName(), dto.getDisplayOrder());
        OmikujiResult updated = service.updateResult(id, result);
        OmikujiResultDto response = new OmikujiResultDto(updated.getId(), updated.getName(), updated.getDisplayOrder());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/results/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        service.deleteResult(id);
        return ResponseEntity.noContent().build();
    }
}

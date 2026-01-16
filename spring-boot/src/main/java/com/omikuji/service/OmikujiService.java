package com.omikuji.service;

import com.omikuji.model.OmikujiResult;
import com.omikuji.repository.OmikujiResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class OmikujiService {
    private final OmikujiResultRepository repository;
    private final Random random = new Random();

    public OmikujiService(OmikujiResultRepository repository) {
        this.repository = repository;
    }

    public String drawOmikuji() {
        List<OmikujiResult> results = repository.findAllByOrderByDisplayOrderAsc();
        if (results.isEmpty()) {
            return "結果なし";
        }
        int index = random.nextInt(results.size());
        return results.get(index).getName();
    }

    public List<OmikujiResult> getAllResults() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public OmikujiResult addResult(OmikujiResult result) {
        if (result.getDisplayOrder() == null) {
            long maxOrder = repository.count();
            result.setDisplayOrder((int) maxOrder + 1);
        }
        return repository.save(result);
    }

    public void deleteResult(Long id) {
        repository.deleteById(id);
    }

    public OmikujiResult updateResult(Long id, OmikujiResult result) {
        OmikujiResult existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("結果が見つかりません: " + id));
        existing.setName(result.getName());
        if (result.getDisplayOrder() != null) {
            existing.setDisplayOrder(result.getDisplayOrder());
        }
        return repository.save(existing);
    }
}

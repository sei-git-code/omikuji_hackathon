package com.omikuji.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.omikuji.model.OmikujiResult;
import com.omikuji.repository.OmikujiResultRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    private final OmikujiResultRepository repository;

    public DataInitializer(OmikujiResultRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(new OmikujiResult("大凶", 1));
            repository.save(new OmikujiResult("凶", 2));
            repository.save(new OmikujiResult("末吉", 3));
            repository.save(new OmikujiResult("小吉", 4));
            repository.save(new OmikujiResult("中吉", 5));
            repository.save(new OmikujiResult("吉", 6));
            repository.save(new OmikujiResult("大吉", 7));
        }
    }
}

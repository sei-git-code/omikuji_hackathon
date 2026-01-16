package com.omikuji.repository;

import com.omikuji.model.OmikujiResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OmikujiResultRepository extends JpaRepository<OmikujiResult, Long> {
    List<OmikujiResult> findAllByOrderByDisplayOrderAsc();
}

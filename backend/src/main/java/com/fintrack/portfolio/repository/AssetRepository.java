package com.fintrack.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fintrack.portfolio.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByUserId(String userId);
}

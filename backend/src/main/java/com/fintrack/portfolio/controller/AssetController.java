package com.fintrack.portfolio.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.fintrack.portfolio.model.Asset;
import com.fintrack.portfolio.repository.AssetRepository;

import lombok.RequiredArgsConstructor;

import jakarta.annotation.PostConstruct; 

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetRepository assetRepository;

    @PostMapping
    public Asset addAsset(@RequestBody Asset asset) {
        asset.setCreatedAt(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    @GetMapping("/all")
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    @GetMapping
    public List<Asset> getAssetsByUser(@RequestParam String userId) {
        return assetRepository.findByUserId(userId);
    }

    @PostConstruct
    public void init() {
        Asset a = new Asset();
        a.setUserId("test");
        a.setType("Stock");
        a.setName("AAPL");
        a.setAmount(10);
        a.setCurrentPrice(190);
        a.setCreatedAt(LocalDateTime.now());
        assetRepository.save(a);
    }
}

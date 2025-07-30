//AssetController.java
package com.fintrack.portfolio.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fintrack.portfolio.model.Asset;
import com.fintrack.portfolio.repository.AssetRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

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

    @GetMapping
    public List<Asset> getAssetsByEmail(@RequestParam String email) {
        return assetRepository.findByUserId(email);
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

package com.fintrack.portfolio.service;

import com.fintrack.portfolio.model.Asset;
import com.fintrack.portfolio.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;

    public Asset addAsset(Asset asset) {
        asset.setCreatedAt(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    public List<Asset> getUserAssets(String userId) {
        return assetRepository.findByUserId(userId);
    }

    public Asset updateAsset(Long id, Asset updatedAsset) {
        Asset existing = assetRepository.findById(id).orElseThrow();
        existing.setAmount(updatedAsset.getAmount());
        existing.setCurrentPrice(updatedAsset.getCurrentPrice());
        existing.setName(updatedAsset.getName());
        existing.setType(updatedAsset.getType());
        return assetRepository.save(existing);
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}

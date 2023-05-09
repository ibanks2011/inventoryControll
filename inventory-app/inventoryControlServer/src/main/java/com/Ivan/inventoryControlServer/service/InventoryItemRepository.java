package com.Ivan.inventoryControlServer.service;


import com.Ivan.inventoryControlServer.model.inventoryItem.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByCatalogId(Long catalogId);
}

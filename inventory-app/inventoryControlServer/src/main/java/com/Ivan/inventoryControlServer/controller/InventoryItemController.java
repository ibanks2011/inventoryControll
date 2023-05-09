package com.Ivan.inventoryControlServer.controller;



import com.Ivan.inventoryControlServer.model.inventoryItem.InventoryItem;
import com.Ivan.inventoryControlServer.model.inventoryItem.dto.InventoryItemDTO;
import com.Ivan.inventoryControlServer.model.inventoryItem.view.InventoryResponse;
import com.Ivan.inventoryControlServer.service.InventoryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inventory-items")
public class InventoryItemController {

    @Autowired
    private InventoryItemService inventoryItemService;

    @PostMapping
    public InventoryItemDTO createInventoryItem(@RequestBody InventoryItemDTO inventoryItemDTO) {
        InventoryItem inventoryItem = inventoryItemService.toEntity(inventoryItemDTO);
        return inventoryItemService.toModel(inventoryItemService.save(inventoryItem));
    }

    @GetMapping
    public List<InventoryItemDTO> getAllInventoryItems() {
        return inventoryItemService.findAll().stream()
                .map(inventoryItemService::toModel)
                .toList();
    }

    @GetMapping("/{inventoryItemId}")
    public InventoryItemDTO getInventoryItemById(@PathVariable Long inventoryItemId) {
        return inventoryItemService.toModel(inventoryItemService.findById(inventoryItemId));
    }

    @GetMapping("/InventoryResponse")
    public List<InventoryResponse> getAllCompleteCatalogs() {
        List<InventoryResponse>  inventory = inventoryItemService.findAll().stream()
                                            .map(inventoryItemService::toInventoryResponse)
                                            .toList();
        return  inventory;
    }

    @PutMapping("/{id}")
    public InventoryItemDTO updateInventoryItem(@PathVariable Long id, @RequestBody InventoryItemDTO inventoryItemDTO) {
        InventoryItem updatedInventoryItem = inventoryItemService.update(id, inventoryItemDTO);
        return inventoryItemService.toModel(updatedInventoryItem);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        inventoryItemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
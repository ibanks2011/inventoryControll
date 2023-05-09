package com.Ivan.inventoryControlServer.controller;


import com.Ivan.inventoryControlServer.model.catalog.Catalog;
import com.Ivan.inventoryControlServer.model.catalog.view.CatalogResponse;
import com.Ivan.inventoryControlServer.model.catalog.dto.CatalogDTO;
import com.Ivan.inventoryControlServer.service.CatalogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/catalogs")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @PostMapping
    public CatalogDTO createCatalog(@RequestBody @Valid CatalogDTO catalogDTO) {
        Catalog catalog = catalogService.toEntity(catalogDTO);
        return catalogService.toModel(catalogService.save(catalog));
    }

//    @GetMapping
//    public List<CatalogDTO> getAllCatalogs() {
//        return catalogService.findAllSorted().stream()
//                .map(catalogService::toModel)
//                .collect(Collectors.toList());
//    }

    @GetMapping("/completeCatalog")
    public List<CatalogResponse> getAllCompleteCatalogs() {
        List<CatalogResponse>  catalogs = catalogService.findAllSorted().stream()
                                        .map(catalogService::toCompleteCatalog)
                                        .toList();
        return  catalogs;
    }
    @GetMapping("/{catalogId}")
    public CatalogDTO getCatalogById(@PathVariable Long catalogId) {
        return catalogService.toModel(catalogService.findById(catalogId));
    }

    @PutMapping("/{id}")
    public CatalogDTO updateCatalog(@PathVariable Long id, @RequestBody CatalogResponse catalogResponse) {
        Catalog updatedCatalog = catalogService.update(id, catalogResponse);
        return catalogService.toModel(updatedCatalog);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        List<Long> associatedInventoryItemIds = catalogService.deleteById(id);

        if (associatedInventoryItemIds.isEmpty()){
            return ResponseEntity.ok("catalog successfully deleted");
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("cant delete catalog because it is associated with the following inventoryItem ids: " + associatedInventoryItemIds );
        }
    }
}
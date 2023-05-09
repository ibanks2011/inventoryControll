package com.Ivan.inventoryControlServer.service;


import com.Ivan.inventoryControlServer.model.Exceptions;
import com.Ivan.inventoryControlServer.model.catalog.Catalog;
import com.Ivan.inventoryControlServer.model.catalog.view.CatalogResponse;
import com.Ivan.inventoryControlServer.model.catalog.dto.CatalogDTO;
import com.Ivan.inventoryControlServer.model.inventoryItem.InventoryItem;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class CatalogService {
    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired InventoryItemRepository inventoryItemRepository;


    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private CountryRepository countryRepository;

    public Catalog save(Catalog catalog) {
        return catalogRepository.save(catalog);
    }

    public List<Long> deleteById(Long id) {
        List<InventoryItem> inventoryItems = inventoryItemRepository.findByCatalogId(id);
        if (inventoryItems.isEmpty()){
            catalogRepository.deleteById(id);
            return List.of(); //empty list means catalogs.json were deleted
        }else{
            return inventoryItems.stream().map(InventoryItem::getInventoryItemId).collect(Collectors.toList());
        }
    }

    public  Catalog update(Long id, CatalogResponse update){

        return catalogRepository.findById(id).map(existingCatalog -> {
            if (update.getManufacturer() != null ) {
                existingCatalog.setManufacturerId(update.getManufacturer().getManufacturerId());
            }
            if (update.getDescription() != null && !update.getDescription().equalsIgnoreCase("")) {
                existingCatalog.setDescription(update.getDescription());
            }
            if (update.getVehicleType() != null && !update.getVehicleType().equalsIgnoreCase("")){
                existingCatalog.setVehicleType(update.getVehicleType());
            }
            if (update.getCountry() != null ){
                existingCatalog.setCountryCode(update.getCountry().getCountryCode());
            }
            return catalogRepository.save(existingCatalog);
        }).orElseThrow(() -> new Exceptions.CatalogNotFoundException(id,"couldn't find catalog with that id"));
    }


    public List<Catalog> findAllSorted() {
        List<Catalog> catalogs = catalogRepository.findAll();
        Collections.sort(catalogs);
        return catalogs;
    }



    public CatalogResponse toCompleteCatalog(@NotNull Catalog entity) {
        CatalogResponse catalog = new CatalogResponse();

        catalog.setCatalogId(entity.getCatalogId());
        catalog.setDescription(entity.getDescription());
        catalog.setVehicleType(entity.getVehicleType());


        catalog.setManufacturer(manufacturerRepository.getReferenceById(entity.getManufacturerId()).createDto());
        catalog.setCountry(countryRepository.getReferenceById(entity.getCountryCode()).createDto());

        return catalog;
    }

    public Catalog findById(Long catalogId) {
        return catalogRepository.findById(catalogId).orElse(null);
    }

    public CatalogDTO toModel(Catalog entity) {
        CatalogDTO model = new CatalogDTO();
        model.setCatalogId(entity.getCatalogId());
        model.setManufacturerId(entity.getManufacturerId());
        model.setDescription(entity.getDescription());
        model.setVehicleType(entity.getVehicleType());
        model.setCountryCode(entity.getCountryCode());
        return model;
    }

    public Catalog toEntity(CatalogDTO model) {
        Catalog entity = new Catalog();
        entity.setCatalogId(model.getCatalogId());
        entity.setDescription(model.getDescription());
        entity.setVehicleType(model.getVehicleType());

        if (model.getManufacturerId() == null && model.getCountryCode() == null ){
            entity.setManufacturerId(model.getManufacturer().getManufacturerId());
            entity.setCountryCode(model.getCountry().getCountryCode());
            return entity;
        }


        entity.setManufacturerId(model.getManufacturerId());
        entity.setCountryCode(model.getCountryCode());
        return entity;
    }


}

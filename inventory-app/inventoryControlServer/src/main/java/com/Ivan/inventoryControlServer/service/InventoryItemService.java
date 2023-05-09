package com.Ivan.inventoryControlServer.service;


import com.Ivan.inventoryControlServer.model.Exceptions;
import com.Ivan.inventoryControlServer.model.country.Country;
import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import com.Ivan.inventoryControlServer.model.inventoryItem.InventoryItem;
import com.Ivan.inventoryControlServer.model.inventoryItem.dto.InventoryItemDTO;
import com.Ivan.inventoryControlServer.model.inventoryItem.view.InventoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryItemService {
    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    public InventoryItem save(InventoryItem inventoryItem) {
        return inventoryItemRepository.save(inventoryItem);
    }

    public void deleteById(Long id) {
        inventoryItemRepository.deleteById(id);
    }

    public InventoryItem update(Long id, InventoryItemDTO inventoryItemDTO) {

        return inventoryItemRepository.findById(id).map(existingItem -> {
            if (inventoryItemDTO.getCatalogId() != null && inventoryItemDTO.getCatalogId() != 1L) {
                existingItem.setCatalogId(inventoryItemDTO.getCatalogId());
            }
            if (inventoryItemDTO.getColor() != null && !inventoryItemDTO.getColor().isEmpty()) {
                existingItem.setColor(inventoryItemDTO.getColor());
            }
            if (inventoryItemDTO.getNumberOfWheels() != 0) {
                existingItem.setNumberOfWheels(inventoryItemDTO.getNumberOfWheels());
            }
            if (inventoryItemDTO.getSerialNumber() != null && !inventoryItemDTO.getSerialNumber().isEmpty()) {
                existingItem.setSerialNumber(inventoryItemDTO.getSerialNumber());
            }
            return inventoryItemRepository.save(existingItem);
        }).orElseThrow(() -> new Exceptions.InventoryItemNotFoundException(id,"couldnt find item with that id"));
    }



    public List<InventoryItem> findAll() {
        List<InventoryItem> inventoryItems = inventoryItemRepository.findAll();
        return inventoryItems;
    }

    public InventoryItem findById(Long inventoryItemId) {
        return inventoryItemRepository.findById(inventoryItemId).orElse(null);
    }

    public InventoryItemDTO toModel(InventoryItem entity) {
        InventoryItemDTO model = new InventoryItemDTO();
        model.setInventoryItemId(entity.getInventoryItemId());
        model.setCatalogId(entity.getCatalogId());
        model.setColor(entity.getColor());
        model.setNumberOfWheels(entity.getNumberOfWheels());
        model.setSerialNumber(entity.getSerialNumber());
        return model;
    }

    public InventoryItem toEntity(InventoryItemDTO model) {
        InventoryItem entity = new InventoryItem();
        entity.setInventoryItemId(model.getInventoryItemId());
        entity.setCatalogId(model.getCatalogId());
        entity.setColor(model.getColor());
        entity.setNumberOfWheels(model.getNumberOfWheels());
        entity.setSerialNumber(model.getSerialNumber());
        return entity;
    }

    public InventoryResponse toInventoryResponse(InventoryItem entity) {
        InventoryResponse response = new InventoryResponse();

        //set properties the entity already has
        response.setInventoryItemId(entity.getInventoryItemId());
        response.setColor(entity.getColor());
        response.setNumberOfWheels(entity.getNumberOfWheels());
        response.setSerialNumber(entity.getSerialNumber());


        //call repository to set CatalogDTO with the entities catalogId
        response.setCatalog(catalogRepository.getReferenceById(entity.getCatalogId()).createDto());

            //set CatalogDTO's Country and Manufacturer with Catalog's respective id's
        response.getCatalog().setCountry(countryRepository.getReferenceById(response.getCatalog().getCountryCode()).createDto());
        response.getCatalog().setManufacturer(manufacturerRepository.getReferenceById(response.getCatalog().getManufacturerId()).createDto());


        //call repository to set country with catalogs.json countryCode
        response.setCountry(countryRepository.getReferenceById(response.getCatalog().getCountryCode()).createDto());


        return response;
    }
}

package com.Ivan.inventoryControlServer.service;


import com.Ivan.inventoryControlServer.model.Exceptions;
import com.Ivan.inventoryControlServer.model.catalog.Catalog;
import com.Ivan.inventoryControlServer.model.manufacturer.Manufacturer;
import com.Ivan.inventoryControlServer.model.manufacturer.dto.ManufacturerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManufacturerService {
    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    public Manufacturer save(Manufacturer manufacturer) {
        return manufacturerRepository.save(manufacturer);
    }

    public List<Manufacturer> findAllSorted() {
        List<Manufacturer> manufacturers = manufacturerRepository.findAll();
        Collections.sort(manufacturers);
        return manufacturers;
    }

    public Manufacturer findById(Long manufacturerId) {
        return manufacturerRepository.findById(manufacturerId).orElse(null);
    }

    public List<Long> deleteById(Long id) {
        List<Catalog> catalogs = catalogRepository.findByManufacturerId(id);
        if (catalogs.isEmpty()){
            manufacturerRepository.deleteById(id);
            return List.of(); //empty list means manufacturers were deleted
        }else{
            return catalogs.stream().map(Catalog::getCatalogId).collect(Collectors.toList());
        }
    }

    public Manufacturer update(Long id, ManufacturerDTO manufacturerDTO) {

        return manufacturerRepository.findById(id).map(existingManufacturer -> {
            if (manufacturerDTO.getCompanyName() != null && !manufacturerDTO.getCompanyName().isEmpty()) {
                existingManufacturer.setCompanyName(manufacturerDTO.getCompanyName());
            }
            return manufacturerRepository.save(existingManufacturer);
        }).orElseThrow(() -> new Exceptions.ManufacturerNotFoundException(id,"couldnt find manufacturer with that id"));
    }

    public ManufacturerDTO toModel(Manufacturer entity) {
        ManufacturerDTO model = new ManufacturerDTO();
        model.setManufacturerId(entity.getManufacturerId());
        model.setCompanyName(entity.getCompanyName());
        return model;
    }

    public Manufacturer toEntity(ManufacturerDTO model) {
        Manufacturer entity = new Manufacturer();
        entity.setManufacturerId(model.getManufacturerId());
        entity.setCompanyName(model.getCompanyName());
        return entity;
    }
}

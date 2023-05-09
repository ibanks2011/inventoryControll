package com.Ivan.inventoryControlServer.controller;


import com.Ivan.inventoryControlServer.model.manufacturer.Manufacturer;
import com.Ivan.inventoryControlServer.model.manufacturer.dto.ManufacturerDTO;
import com.Ivan.inventoryControlServer.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @PostMapping
    public ManufacturerDTO createManufacturer(@RequestBody ManufacturerDTO manufacturerDTO) {
        Manufacturer manufacturer = manufacturerService.toEntity(manufacturerDTO);
        return manufacturerService.toModel(manufacturerService.save(manufacturer));
    }

    @GetMapping
    public List<ManufacturerDTO> getAllManufacturers() {
        return manufacturerService.findAllSorted().stream()
                .map(manufacturerService::toModel)
                .collect(Collectors.toList());
    }

    @GetMapping("/{manufacturerId}")
    public ManufacturerDTO getManufacturerById(@PathVariable Long manufacturerId) {
        return manufacturerService.toModel(manufacturerService.findById(manufacturerId));
    }

    @PutMapping("/{id}")
    public ManufacturerDTO updateManufacturer(@PathVariable Long id, @RequestBody ManufacturerDTO manufacturerDTO) {
        Manufacturer updatedManufacturer = manufacturerService.update(id, manufacturerDTO);
        return manufacturerService.toModel(updatedManufacturer);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        //check if manufacture id is being used by a catalog
        List<Long> associatedCatalogIds =  manufacturerService.deleteById(id);

        if (associatedCatalogIds.isEmpty()){
            return ResponseEntity.ok("manufacturer successfully deleted");
        }else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("cant delete manufacturer because it is associated with the following catalog ids: " + associatedCatalogIds );
        }
    }
}
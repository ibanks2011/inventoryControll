package com.Ivan.inventoryControlServer.controller;



import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import com.Ivan.inventoryControlServer.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryService countryService;



    @GetMapping
    public List<CountryDTO> getAllCatalogs() {
        return countryService.findAllSortedBySerialNumber().stream()
                .map(countryService::toModel)
                .collect(Collectors.toList());
    }



    @GetMapping("/{catalogId}")
    public CountryDTO getCatalogById(@PathVariable Long catalogId) {
        return countryService.toModel(countryService.findById(catalogId));
    }



}
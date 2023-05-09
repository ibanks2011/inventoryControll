package com.Ivan.inventoryControlServer.util;


import com.Ivan.inventoryControlServer.model.catalog.Catalog;
import com.Ivan.inventoryControlServer.model.country.Country;
import com.Ivan.inventoryControlServer.model.inventoryItem.InventoryItem;
import com.Ivan.inventoryControlServer.model.manufacturer.Manufacturer;
import com.Ivan.inventoryControlServer.service.CatalogRepository;
import com.Ivan.inventoryControlServer.service.CountryRepository;
import com.Ivan.inventoryControlServer.service.InventoryItemRepository;
import com.Ivan.inventoryControlServer.service.ManufacturerRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Component
public class DataLoader {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Autowired
    private ResourceLoader resourceLoader;
    @PostConstruct
    public void loadCountries() {
        countryRepository.deleteAll();
        try {
            File file = new File("C:\\Users\\ivan.banks\\IdeaProjects\\inventoryControlServer\\src\\main\\resources\\countries.json");
            List<Country> countries = JsonConverter.loadListFromJson(file, Country.class);
            countryRepository.saveAll(countries);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void loadManufacturer() {
        manufacturerRepository.deleteAll();
        try {
            File file = new File("C:\\Users\\ivan.banks\\IdeaProjects\\inventoryControlServer\\src\\main\\resources\\manufacturer.json");
            List<Manufacturer> manufacturers = JsonConverter.loadListFromJson(file, Manufacturer.class);
            manufacturerRepository.saveAll(manufacturers);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void loadCatalogs() {
        catalogRepository.deleteAll();
        try {
            File file = new File("C:\\Users\\ivan.banks\\IdeaProjects\\inventoryControlServer\\src\\main\\resources\\catalogs.json");
            List<Catalog> catalogs = JsonConverter.loadListFromJson(file, Catalog.class);
            catalogRepository.saveAll(catalogs);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void loaditems() {
        inventoryItemRepository.deleteAll();
        try {
            File file = new File("C:\\Users\\ivan.banks\\IdeaProjects\\inventoryControlServer\\src\\main\\resources\\inventory.json");
            List<InventoryItem> items = JsonConverter.loadListFromJson(file, InventoryItem.class);
            inventoryItemRepository.saveAll(items);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

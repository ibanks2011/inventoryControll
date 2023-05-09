package com.Ivan.inventoryControlServer.model.catalog;


import com.Ivan.inventoryControlServer.model.catalog.dto.CatalogDTO;
import com.Ivan.inventoryControlServer.model.country.Country;
import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


// Catalog.java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Catalog implements Comparable<Catalog>, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long catalogId;
    private Long manufacturerId;
    private Long countryCode;
    private String description;
    private String vehicleType;


    @Override
    public int compareTo(Catalog other) {
        return this.description.compareTo(other.description);
    }

    public CatalogDTO createDto(){
        CatalogDTO catalogDTO = new CatalogDTO();
        catalogDTO.setCatalogId(getCatalogId());
        catalogDTO.setManufacturerId(getManufacturerId());
        catalogDTO.setCountryCode(getCountryCode());
        catalogDTO.setDescription(getDescription());
        catalogDTO.setVehicleType(getVehicleType());
        return catalogDTO;
    }

}
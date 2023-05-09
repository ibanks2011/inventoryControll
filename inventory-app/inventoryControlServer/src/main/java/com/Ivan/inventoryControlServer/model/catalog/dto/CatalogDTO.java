package com.Ivan.inventoryControlServer.model.catalog.dto;

import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import com.Ivan.inventoryControlServer.model.manufacturer.dto.ManufacturerDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatalogDTO {
    private Long catalogId;


    private Long manufacturerId;


    private Long countryCode;

    @NotEmpty(message = "Field cannot be empty")
    private String description;

    @NotEmpty(message = "Field cannot be empty")
    private String vehicleType;

    private CountryDTO country;

    private ManufacturerDTO manufacturer;

    public CatalogDTO(Long catalogId, Long manufacturerId, Long countryCode, String description, String vehicleType) {
    }
}

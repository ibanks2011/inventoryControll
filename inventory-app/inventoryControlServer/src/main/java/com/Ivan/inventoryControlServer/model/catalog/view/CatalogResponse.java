package com.Ivan.inventoryControlServer.model.catalog.view;


//import com.Ivan.inventoryControlServer.model.country.Country;

import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import com.Ivan.inventoryControlServer.model.manufacturer.dto.ManufacturerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatalogResponse {

    private Long catalogId;
    private String description;
    private String vehicleType;

    private ManufacturerDTO manufacturer;
    private CountryDTO country;


}

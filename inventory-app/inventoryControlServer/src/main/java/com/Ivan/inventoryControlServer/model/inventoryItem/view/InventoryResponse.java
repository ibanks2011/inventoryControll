package com.Ivan.inventoryControlServer.model.inventoryItem.view;


import com.Ivan.inventoryControlServer.model.catalog.dto.CatalogDTO;
import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponse {

    private Long inventoryItemId;

    private CatalogDTO catalog;

    private String color;

    private int numberOfWheels;

    private String serialNumber;

    private CountryDTO country;
}

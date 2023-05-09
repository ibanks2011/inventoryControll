package com.Ivan.inventoryControlServer.model.inventoryItem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemDTO {
    private Long inventoryItemId;
    private Long catalogId;
    private String color;
    private int numberOfWheels = -1;
    private String serialNumber;

}

package com.Ivan.inventoryControlServer.model.manufacturer.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManufacturerDTO {
    private Long manufacturerId;
    private String companyName;

}

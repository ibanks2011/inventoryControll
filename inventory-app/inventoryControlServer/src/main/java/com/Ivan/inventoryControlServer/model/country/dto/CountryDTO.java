package com.Ivan.inventoryControlServer.model.country.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryDTO {
    private Long  countryCode;
    private String  alpha2;
    private String name;

    public CountryDTO(Long i, String message) {
        this.countryCode = i;
        this.name = message;
    }
}

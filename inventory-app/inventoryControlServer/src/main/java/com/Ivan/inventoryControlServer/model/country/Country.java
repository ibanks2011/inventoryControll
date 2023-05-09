package com.Ivan.inventoryControlServer.model.country;


import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country  implements Serializable {

    @Id
    @JsonProperty("country-code")
    @Column(name = "country_code", nullable = false, unique = true)
    private Long countryCode;


    @JsonProperty("alpha-2")
    @Column(name = "alpha")
    private String alpha2;

    @Column(name = "country_name", nullable = false)
    private String name;

    public CountryDTO createDto(){
        CountryDTO countryDTO = new CountryDTO();
        countryDTO.setCountryCode(getCountryCode());
        countryDTO.setName(getName());
        countryDTO.setAlpha2(getAlpha2());
        return countryDTO;
    }

}

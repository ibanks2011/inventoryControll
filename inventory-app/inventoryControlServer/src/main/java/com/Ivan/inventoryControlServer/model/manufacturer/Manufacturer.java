package com.Ivan.inventoryControlServer.model.manufacturer;

import com.Ivan.inventoryControlServer.model.manufacturer.dto.ManufacturerDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Manufacturer implements Comparable<Manufacturer>, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("manufacturerId")
    @Column(name="manufacturerId")
    private Long manufacturerId;

    @JsonProperty("companyName")
    @Column(name="companyName")
    private String companyName;

    @Override
    public int compareTo(Manufacturer other) {
        return this.companyName.compareTo(other.companyName);
    }

    public ManufacturerDTO createDto(){
        ManufacturerDTO manufacturerDTO = new ManufacturerDTO(this.manufacturerId,this.companyName);
        return manufacturerDTO;
    }
}

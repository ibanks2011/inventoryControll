package com.Ivan.inventoryControlServer.model.inventoryItem;

import com.Ivan.inventoryControlServer.model.Exceptions;
import com.Ivan.inventoryControlServer.model.inventoryItem.dto.InventoryItemDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryItemId;
    private Long catalogId;
    private String color;
    private int numberOfWheels;
    private String serialNumber;

    public void setColor(String color) {
        if (color == null || color.isEmpty()) {
            throw new Exceptions.InvalidColorException("Color cannot be null or empty.");
        }
        this.color = color;
    }

    public void setNumberOfWheels(int numberOfWheels) {
        if (numberOfWheels < 0 && numberOfWheels != -1) {
            throw new Exceptions.InvalidNumberOfWheelsException("Number of wheels must be greater than 0.");
        }
        this.numberOfWheels = numberOfWheels;
    }

    public void setCatalogId(Long catalogId) {
        if (catalogId <= 0 ) {
            throw new Exceptions.InvalidCatalogIdException("CatalogId  must be valid.");
        }
        this.catalogId = catalogId;
    }

    public InventoryItemDTO createDto(){
        InventoryItemDTO inventoryModel = new InventoryItemDTO(this.inventoryItemId,this.catalogId, this.color, this. numberOfWheels, this.serialNumber);
        return inventoryModel;
    }


}
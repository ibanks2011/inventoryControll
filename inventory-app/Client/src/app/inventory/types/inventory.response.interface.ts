import { CatalogInterface } from "src/app/catalog/types/catalog.interface";
import { CountryInterface } from "src/app/country/types/country.interface";

export interface InventoryResponseInterface {
    inventoryItemId: number;
    catalog: CatalogInterface;
    color: string;
    numberOfWheels: number;
    serialNumber: string;
    country: CountryInterface
}
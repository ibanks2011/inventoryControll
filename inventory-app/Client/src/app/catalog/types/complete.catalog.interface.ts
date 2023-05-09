import { CountryInterface } from "src/app/country/types/country.interface";
import { ManufacturerInterface } from "src/app/manufacturer/types/manufacturer.interface";

export interface CompleteCatalogInterface {
    catalogId: number;
    description: string;
    vehicleType: string;
    manufacturer: ManufacturerInterface;
    country: CountryInterface;
}
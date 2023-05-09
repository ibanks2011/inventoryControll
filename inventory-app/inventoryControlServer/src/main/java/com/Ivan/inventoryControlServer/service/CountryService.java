package com.Ivan.inventoryControlServer.service;



import com.Ivan.inventoryControlServer.model.country.Country;
import com.Ivan.inventoryControlServer.model.country.dto.CountryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;


@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;


    public Country save(Country country) {
        return countryRepository.save(country);
    }

    public void deleteById(Long id) {
        countryRepository.deleteById(id);
    }





    public List<Country> findAllSortedBySerialNumber() {
        List<Country> countries = countryRepository.findAll();
        countries.sort(Comparator.comparing(Country::getCountryCode));
        return countries;
    }

    public Country findById(Long inventoryItemId) {
        return countryRepository.findById(inventoryItemId).orElse(null);
    }

    public CountryDTO toModel(Country entity) {
        CountryDTO model = new CountryDTO();
        model.setCountryCode(entity.getCountryCode());
        model.setName(entity.getName());
        model.setAlpha2(entity.getAlpha2());
        return model;
    }

    public Country toEntity(CountryDTO model) {
        Country entity = new Country();
        entity.setAlpha2(model.getAlpha2());
        entity.setName(model.getName());
        entity.setCountryCode(model.getCountryCode());
        return entity;
    }

}

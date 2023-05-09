package com.Ivan.inventoryControlServer.service;



import com.Ivan.inventoryControlServer.model.country.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
}
package com.Ivan.inventoryControlServer.service;


import com.Ivan.inventoryControlServer.model.catalog.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    List<Catalog> findByManufacturerId(Long manufacturerId);
}



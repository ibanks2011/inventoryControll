package com.Ivan.inventoryControlServer.model;

public class Exceptions {

    public static class InvalidColorException extends RuntimeException {
        public InvalidColorException(String message) {
            super(message);
        }
    }

    public static class InvalidNumberOfWheelsException extends RuntimeException {
        public InvalidNumberOfWheelsException(String message) {
            super(message);
        }
    }

    public static class InventoryItemNotFoundException extends RuntimeException {
        public InventoryItemNotFoundException(Long id ,String message) {
            super(message);
        }
    }

    public static class CatalogNotFoundException extends RuntimeException {
        public CatalogNotFoundException(Long id ,String message) {
            super(message);
        }
    }

    public static class ManufacturerNotFoundException extends RuntimeException {
        public ManufacturerNotFoundException(Long id ,String message) {
            super(message);
        }
    }

    public static class InvalidCatalogIdException extends RuntimeException {
        public InvalidCatalogIdException(String message) {
            super(message);
        }
    }

}

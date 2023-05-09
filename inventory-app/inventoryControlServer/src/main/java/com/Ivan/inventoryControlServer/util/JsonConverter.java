package com.Ivan.inventoryControlServer.util;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class JsonConverter {

    // Serialize an object to JSON format and write it to a file
    public static <T> void saveToJson(File file, T object) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(file, object);
    }


    // Deserialize an object from a JSON file
    public static <T> T loadFromJson(File file, Class<T> clazz) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(file, clazz);
    }





    // Deserialize a list of objects from a JSON file
    public static <T> List<T> loadListFromJson(File file, Class<T> clazz) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
    }
    public static HashMap<String, Object> loadHashMapFromJson(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File(filePath), new TypeReference<HashMap<String, Object>>() {});
    }
}



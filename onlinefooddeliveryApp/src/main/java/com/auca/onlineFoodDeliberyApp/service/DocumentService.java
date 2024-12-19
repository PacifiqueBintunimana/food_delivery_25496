package com.auca.onlineFoodDeliberyApp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
@Service
public class DocumentService {
    private static final String UPLOAD_DIR = "uploads/";  // Directory to save uploaded files

    // Save the uploaded file
    public void saveUploadedFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        if (fileName != null && !fileName.isEmpty()) {
            Path uploadPath = Paths.get(UPLOAD_DIR, fileName);

            // Ensure the directory exists
            Files.createDirectories(uploadPath.getParent());

            // Save the file
            file.transferTo(uploadPath);
        } else {
            throw new IOException("File name is invalid or null");
        }
    }

    // List all uploaded files
    public List<String> listUploadedFiles() {
        List<String> fileNames = new ArrayList<>();
        try {
            Files.walk(Paths.get(UPLOAD_DIR))
                    .filter(Files::isRegularFile)
                    .forEach(path -> fileNames.add(path.getFileName().toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileNames;
    }

    // Get the file by filename
    public Path getFile(String fileName) {
        return Paths.get(UPLOAD_DIR, fileName);  // Safer file path construction
    }

    // Determine the MIME type of a file based on its extension
    public String getMimeType(String fileName) throws IOException {
        Path path = getFile(fileName);
        String mimeType = Files.probeContentType(path);  // Detect MIME type based on file extension
        return mimeType != null ? mimeType : "application/octet-stream";  // Default to binary if MIME type is not recognized
    }

    // Delete the uploaded file
    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        if (Files.exists(filePath)) {
            Files.delete(filePath);  // Delete the file from the filesystem
        } else {
            throw new IOException("File not found: " + fileName);  // File not found
        }
    }
}

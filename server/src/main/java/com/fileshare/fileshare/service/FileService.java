package com.fileshare.fileshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fileshare.fileshare.repository.FileRepository;
import com.fileshare.fileshare.model.File;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;


    public List<File> getFiles() {
        return this.fileRepository.findAll();
    }

    public File createFile(File file) {
        return this.fileRepository.save(file);
    }

    public File getFileById(int id) {
        return this.fileRepository.findById(id).orElse(null);
    }
}

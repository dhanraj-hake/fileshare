package com.fileshare.fileshare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fileshare.fileshare.model.File;
import com.fileshare.fileshare.service.FileService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class FileController {

    private FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/")
    public List<File> getAllFiles(){
        return this.fileService.getFiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<File> getFileByID(@PathVariable int id){
        try{
            File file = this.fileService.getFileById(id);
            return new ResponseEntity<>(file, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<File> createFiles(@RequestBody File file){
        try {
            File createdFile = this.fileService.createFile(file);
            return new ResponseEntity<>(createdFile, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

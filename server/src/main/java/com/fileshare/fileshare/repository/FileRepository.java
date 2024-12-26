package com.fileshare.fileshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.fileshare.fileshare.model.File;

@Repository
public interface FileRepository extends JpaRepository<File, Integer> {

}

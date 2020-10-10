package com.example.contactmanager.controller;

import com.example.contactmanager.model.Contact;
import com.example.contactmanager.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ContactApiController {

    @Autowired
    ContactRepository contactRepository;

    @GetMapping("/api/contacts/{id}")
    public Contact getPerson(@PathVariable("id") Integer id) {
        return contactRepository.getOne(id);
    }

    @GetMapping("/contacts")
    List<Contact> getPersonListsortByName() {


        List<Contact> contactList = contactRepository.findAll(Sort.by(Sort.Direction.ASC, "firstName"));
        return contactList;

    }

    @PostMapping(value = "/contacts", consumes = "application/json")
    public ResponseEntity newContact(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return new ResponseEntity(HttpStatus.CREATED);

    }

    @DeleteMapping(value = "/contacts/{id}")
    public String deleteContact(@PathVariable("id") Integer id) {
        contactRepository.delete(contactRepository.getOne(id));
        return "Contact with id" + id + " successfully deleted";

    }

    @PutMapping(value = "/contacts/{id}", consumes = "application/json")
    public ResponseEntity editContact(@PathVariable("id") Integer id, @RequestBody Contact edit) {
        Contact contact = contactRepository.getOne(id);

        contact.setGender(edit.getGender());
        contact.setFirstName(edit.getFirstName());
        contact.setLastName(edit.getLastName());
        contact.setAddress(edit.getAddress());
        contact.setZipCode(edit.getZipCode());
        contact.setCity(edit.getCity());
        contact.setPhoneNumber(edit.getPhoneNumber());
        contact.setEmail(edit.getEmail());
        contact.setBirthday(edit.getBirthday());

        contactRepository.save(contact);

        return new ResponseEntity(HttpStatus.ACCEPTED);
    }


}

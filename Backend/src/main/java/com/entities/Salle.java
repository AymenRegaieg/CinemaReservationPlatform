package com.entities;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "SALLE")
@NamedQuery(name = "findSalleById", query = "SELECT s FROM Salle s WHERE s.id_salle = :id")
@NamedQuery(name = "AllSalles", query = "SELECT s FROM Salle s")
public class Salle implements Serializable {
    private int id_salle;
    private String name;
    private String address;
    private int capacite;
    @JsonbTransient
    private SalleProg salleprog;

    public Salle() {
        super();
    }

    public Salle(int id_salle, String name, String address, int capacite, SalleProg salleprog) {
        this.id_salle = id_salle;
        this.name = name;
        this.address = address;
        this.capacite = capacite;
        this.salleprog = salleprog;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId_salle() {
        return id_salle;
    }

    public void setId_salle(int id_salle) {
        this.id_salle = id_salle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCapacite() {
        return capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    @OneToOne
    @JoinColumn(name = "id_salleprog")
    public SalleProg getSalleprog() {
        return salleprog;
    }

    public void setSalleprog(SalleProg salleprog) {
        this.salleprog = salleprog;
    }
}

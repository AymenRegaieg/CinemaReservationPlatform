package com.entities;

import java.io.Serializable;
import java.util.Collection;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;

@Entity
@Table(name = "COMPTE")
@NamedQueries({
    @NamedQuery(name = "findAllComptes", query = "SELECT c FROM Compte c"),
    @NamedQuery(name = "findCompteByName", query = "SELECT c FROM Compte c WHERE c.name = :cname"),
    @NamedQuery(name = "findCompteById", query = "SELECT c FROM Compte c WHERE c.id = :cid")
})
public class Compte implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String password;
    private float solde;

   
    @ManyToMany
    private Collection<Seance>seance;

    public Compte() {}
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public float getSolde() {
        return solde;
    }

    public void setSolde(float solde) {
        this.solde = solde;
    }

    @JsonbTransient
    public Collection<Seance> getSeances() {
        return seance;
    }

    public void setSeances(Collection<Seance>  seance) {
        this.seance = seance;
    }

    public void decreaseSolde(float somme) {
        this.solde -= somme;
    }

    @Override
    public String toString() {
        return "Compte[id=" + id + ", name=" + name + "]";
    }
}

package com.entities;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "FILM")
@NamedQueries({
    @NamedQuery(name = "findAllFilms", query = "SELECT f FROM Film f"),
    @NamedQuery(name = "findFilmByName", query = "SELECT f FROM Film f WHERE f.name =:fname"),
    @NamedQuery(name = "findFilmById", query = "SELECT f FROM Film f WHERE f.id =:fid"),
    @NamedQuery(name = "findFilmByPattern", query = "SELECT f FROM Film f WHERE f.name LIKE :pattern")
})
public class Film implements Serializable {
    private int id;
    private String name;
    private String description;
    @JsonbTransient
    private Collection<SalleProg> salleprog;
    public Film() {
        super();
    }

    public Film(String name, String description) {
        this.name = name;
        this.description = description;
        this.salleprog = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public Collection<SalleProg> getSalleprog() {
        return salleprog;
    }

    public void setSalleprog(Collection<SalleProg> salleprog) {
        this.salleprog = salleprog;
    }
}

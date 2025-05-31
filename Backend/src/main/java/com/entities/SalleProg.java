package com.entities;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Table(name = "SALLE_PROG")
@NamedQuery(name = "findAllSalleProg", query = "SELECT s FROM SalleProg s")
@NamedQuery(name = "findSalleProgById", query = "SELECT s FROM SalleProg s WHERE s.id_salleprog =:id")
public class SalleProg implements Serializable {
    private int id_salleprog;
    private Film film;
    private Salle salle;
    @JsonbTransient
    private Collection<Seance> seances;

    public SalleProg() {
        super();
    }

    public SalleProg(int id, Film film, Salle salle, Collection<Seance> seances) {
        this.id_salleprog = id;
        this.film = film;
        this.salle = salle;
        this.seances = seances;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId_salleprog() {
        return id_salleprog;
    }

    public void setId_salleprog(int id) {
        this.id_salleprog = id;
    }

    @ManyToOne
    @JoinColumn(name = "id_film")
    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    @OneToOne(mappedBy = "salleprog")
    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    @OneToMany(mappedBy = "salleprog", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public Collection<Seance> getSeances() {
        return seances;
    }

    public void setSeances(Collection<Seance> seances) {
        this.seances = seances;
    }
}

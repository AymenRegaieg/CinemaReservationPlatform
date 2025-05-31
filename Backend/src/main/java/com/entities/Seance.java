package com.entities;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "SEANCE")
@NamedQueries({
    @NamedQuery(name = "findSeanceById", query = "SELECT s FROM Seance s WHERE s.id_seance = :id"),
    @NamedQuery(name = "AllSeance", query = "SELECT s FROM Seance s")
})
public class Seance implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_seance;

    private LocalDateTime horaire;
    private int places;
    private float tarif;

    @JsonbTransient
    @ManyToOne
    @JoinColumn(name = "id_salleprog")
    private SalleProg salleprog;

    @JsonbTransient
    @ManyToMany(mappedBy = "seance", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Compte> comptes;

    public Seance() {}

    public Seance(LocalDateTime horaire, int places, float tarif, SalleProg salleprog) {
        this.horaire = horaire;
        this.places = places;
        this.tarif = tarif;
        this.salleprog = salleprog;
    }

    public int getId_seance() {
        return id_seance;
    }

    public void setId_seance(int id_seance) {
        this.id_seance = id_seance;
    }

    public LocalDateTime getHoraire() {
        return horaire;
    }

    public void setHoraire(LocalDateTime horaire) {
        this.horaire = horaire;
    }

    public int getPlaces() {
        return places;
    }

    public void setPlaces(int places) {
        this.places = places;
    }

    public float getTarif() {
        return tarif;
    }

    public void setTarif(float tarif) {
        this.tarif = tarif;
    }


    public SalleProg getSalleprog() {
        return salleprog;
    }

    public void setSalleprog(SalleProg salleprog) {
        this.salleprog = salleprog;
    }

    public Collection<Compte> getComptes() {
        return comptes;
    }

    public void setComptes(Collection<Compte> comptes) {
        this.comptes = comptes;
    }

    public void inreasePlaces() {
        this.places += 1;
    }
}

package com.service;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.ejb.*;

import com.entities.Compte;
import com.entities.Film;
import com.entities.Salle;
import com.entities.SalleProg;
import com.entities.Seance;


@Remote
public interface Cinema {
 
    public List<Film> list ();  
    public List<Film> findByPattern (String pattern);
    public Film findFilm (int id);    
    public void reserve (int seance, int compte);  
    public List<SalleProg> getAllSalleProg ();
    public SalleProg getSalleProg (int id);
    public Film createFilm (String name, String description);
    public void deleteFilm(int film_id);
    public void update(int film_id ,String name,String description);  
    public float getTarif (Seance seance);
    public void addSalle(String address ,String name,int capacite);
    public void programmSalle(Salle salle , Film film);
    public Salle findSalle(int id);
    public List<Salle> getAllSalle();
    public void createSeance(LocalDateTime horaire,float tarif,SalleProg salleprog);
    public void deleteSeance(int seance_id);
    public Seance findSeance(int id);
    public List<Seance> getAllSeance();
    public void updateSeance(int seance_id,LocalDateTime horaire,float tarif,int places,SalleProg salleprog);
}

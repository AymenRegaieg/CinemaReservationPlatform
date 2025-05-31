package com.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.ejb.Stateless;
import jakarta.ejb.TransactionAttribute;
import jakarta.ejb.TransactionAttributeType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import com.entities.Compte;
import com.entities.Film;
import com.entities.Salle;
import com.entities.SalleProg;
import com.entities.Seance;

@Stateless
public class CinemaBean implements Cinema {

    @PersistenceContext(unitName = "cinemaPersistense")
    private EntityManager em;

    @Override
    public List<Film> list() {
        Query q = em.createNamedQuery("findAllFilms");
        List<Film> filmList = q.getResultList();
        if (filmList.isEmpty()) {
            throw new FilmNotFoundException("No films found.");
        }
        return filmList;
    }

    @Override
    public List<Film> findByPattern(String pattern) {
        Query q = em.createNamedQuery("findFilmByPattern");
        q.setParameter("pattern", "%" + pattern + "%");
        List<Film> filmList = q.getResultList();
        return filmList;
    }

    @Override
    public Film findFilm(int id) {
        Query q = em.createNamedQuery("findFilmById");
        q.setParameter("fid", id);
        return (Film) q.getSingleResult();
    }

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void reserve(int seanceId, int userId) {
        // Retrieve Compte
        Query compteQuery = em.createNamedQuery("findCompteById");
        compteQuery.setParameter("cid", userId);
        Compte retrievedCompte;
        try {
            retrievedCompte = (Compte) compteQuery.getSingleResult();
        } catch (Exception e) {
            throw new IllegalArgumentException("Compte with ID " + userId + " does not exist.");
        }

        // Retrieve Seance
        Query seanceQuery = em.createNamedQuery("findSeanceById");
        seanceQuery.setParameter("id", seanceId);
        Seance retrievedSeance;
        try {
            retrievedSeance = (Seance) seanceQuery.getSingleResult();
        } catch (Exception e) {
            throw new IllegalArgumentException("Seance with ID " + seanceId + " does not exist.");
        }

        // Check for available seats
        if ((retrievedSeance.getSalleprog().getSalle().getCapacite() - retrievedSeance.getPlaces()) <= 0) {
            throw new NoSeatsAvailableException("No seats available for this seance.");
        }

        // Check for sufficient funds
        float tarif = retrievedSeance.getTarif();
        if (retrievedCompte.getSolde() < tarif) {
            throw new InsufficientFundsException("Insufficient funds for reservation.");
        }

        // Update places and solde
        retrievedSeance.inreasePlaces();
        retrievedCompte.decreaseSolde(tarif);

        // Update relationships
        retrievedCompte.getSeances().add(retrievedSeance);
        retrievedSeance.getComptes().add(retrievedCompte);

        // Merge entities
        em.merge(retrievedSeance);
        em.merge(retrievedCompte);
    }


    
    @Override
    public List<SalleProg> getAllSalleProg() {
        Query q = em.createNamedQuery("findAllSalleProg", SalleProg.class);
        List<SalleProg> salleProgList = q.getResultList();
        return salleProgList;
    }
    @Override
    public SalleProg getSalleProg (int id) {
    	Query q = em.createNamedQuery("findSalleProgById");
        q.setParameter("id", id);
        return (SalleProg) q.getSingleResult();
    }
    @Override
    public Film createFilm(String name, String description) {
        Film newFilm = new Film();
        newFilm.setName(name);
        newFilm.setDescription(description);
        em.persist(newFilm);
        return newFilm;
    }

    @Override
    public void update(int film_id,String name,String description) {
    	Film updatedfilm = findFilm(film_id);
    	updatedfilm.setDescription(description);
    	updatedfilm.setName(name);
        em.merge(updatedfilm);
    }

    @Override
    public float getTarif(Seance seance) {
        Query seanceQuery = em.createNamedQuery("findSeanceById");
        seanceQuery.setParameter("id", seance.getId_seance());
        Seance retrievedSeance = (Seance) seanceQuery.getSingleResult();
        return retrievedSeance.getTarif();
    }
    
    @Override
	public void addSalle(String address ,String name,int capacite) {
		// TODO Auto-generated method stub
    	Salle newSalle = new Salle();
    	newSalle.setAddress(address);
    	newSalle.setCapacite(capacite);
		newSalle.setName(name);
		em.persist(newSalle);
	}
    public List<Salle> getAllSalle(){
    	Query q = em.createNamedQuery("AllSalles");
        List<Salle> salles = q.getResultList();
        return salles;
    }
	@Override
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void programmSalle(Salle salle, Film film) {
		// TODO Auto-generated method stub
		SalleProg salleProg = new SalleProg();
		salleProg.setFilm(film);
		salleProg.setSalle(salle);
		em.persist(salleProg);
		salle.setSalleprog(salleProg);
		em.merge(salle);
	}
	@Override
	public void createSeance(LocalDateTime horaire,float tarif,SalleProg salleprog) {
		// TODO Auto-generated method stub
		Seance newSeance = new Seance(horaire,0,tarif,salleprog);
		em.persist(newSeance);
	}

	@Override
	public void deleteSeance(int seance_id) {
		// TODO Auto-generated method stub
		Query seanceQuery = em.createNamedQuery("findSeanceById");
        seanceQuery.setParameter("id", seance_id);
        Seance retrievedSeance = (Seance) seanceQuery.getSingleResult();
        em.remove(retrievedSeance);
	}

	@Override
	public void updateSeance(int seance_id,LocalDateTime horaire,float tarif,int places,SalleProg salleprog){
		// TODO Auto-generated method stub
		Query seanceQuery = em.createNamedQuery("findSeanceById");
        seanceQuery.setParameter("id", seance_id);
        Seance retrievedSeance = (Seance) seanceQuery.getSingleResult();
        retrievedSeance.setHoraire(horaire);
        retrievedSeance.setPlaces(places);
        retrievedSeance.setTarif(tarif);
        retrievedSeance.setSalleprog(salleprog);
        em.merge(retrievedSeance);
	}
	@Override
	public void deleteFilm(int film_id) {
		// TODO Auto-generated method stub
		em.remove(findFilm(film_id));
		
	}
	@Override
	public Seance findSeance(int id) {
		// TODO Auto-generated method stub
		Query seanceQuery = em.createNamedQuery("findSeanceById");
        seanceQuery.setParameter("id", id);
		return (Seance) seanceQuery.getSingleResult();
	}
	public Salle findSalle(int id) {
		Query seanceQuery = em.createNamedQuery("findSalleById");
        seanceQuery.setParameter("id", id);
		return (Salle) seanceQuery.getSingleResult();
	}
	public List<Seance> getAllSeance(){
		Query q = em.createNamedQuery("AllSeance");
        List<Seance> seance = q.getResultList();
        return seance;
	}
    // Custom exception classes for better error handling
    public static class FilmNotFoundException extends RuntimeException {
        public FilmNotFoundException(String message) {
            super(message);
        }
    }

    public static class NoSeatsAvailableException extends RuntimeException {
        public NoSeatsAvailableException(String message) {
            super(message);
        }
    }

    public static class InsufficientFundsException extends RuntimeException {
        public InsufficientFundsException(String message) {
            super(message);
        }
    }

	

	

	

	
}
package com.service;

import java.util.List;

import jakarta.ejb.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import com.entities.Compte;

@Stateless
public class UtilisateurBean implements Utilisateur {

    @PersistenceContext(unitName = "cinemaPersistense")
    private EntityManager em;
    private int user_id;
	public UtilisateurBean() {
        super();
    }

    @Override
    public Compte getCompte(){
        Query q = em.createNamedQuery("findCompteById");
        q.setParameter("cid", user_id);
        List<Compte> res = q.getResultList();
        if (res.isEmpty()) {
            throw new AccountNotFoundException("Account not found for user id: " + user_id);
        }
        return res.get(0);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void debite(float somme) {
        float solde = solde();
        if (solde + somme <= 0) {
        	throw new InsufficientFundsException("insufficient funds! you can't continue the purchase");
        } else {
            Compte compte = getCompte();
            compte.setSolde(solde + somme);
            em.merge(compte);
        }
    }

    public String getName() {
        return getCompte().getName();
    }

    @Override
    public int init(String name, String passwd) {
        Query q = em.createNamedQuery("findCompteByName");
        q.setParameter("cname", name);
        List<Compte> res = q.getResultList();
        if (res != null && !res.isEmpty()) {
            Compte compte = res.get(0);
            if (compte.getName().equals(name) && compte.getPassword().equals(passwd)) {
                this.user_id = compte.getId();
                return user_id;
            } else {
                throw new InvalidCredentialsException("Invalid username or password");
            }
        } else {
            throw new AccountNotFoundException("Account not found with name: " + name);
        }
    }


    public float solde() {
        return getCompte().getSolde();
    }
    public void  increaseSolde(float somme) {
    	if(somme>=0)
    		getCompte().setSolde(getCompte().getSolde() + somme);   
 }
    @Override
    public void createAccount(String name, String passwd) {
    	if (name == null || name.isEmpty() || passwd == null || passwd.isEmpty()) {
    	    throw new IllegalArgumentException("Username and password cannot be null or empty.");
    	}
        Query q = em.createNamedQuery("findCompteByName");
        q.setParameter("cname", name);
        List<Compte> res = q.getResultList();
        if (res == null || res.isEmpty()) {
        	Compte newUser = new Compte();
            newUser.setName(name);
            newUser.setPassword(passwd);
            em.persist(newUser);
        } else {
            throw new UsernameAlreadyExistsException("Username already exists! Please choose another one.");
        }
    }
    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void deleteAccount(){
    	 Compte compte = getCompte(); 
         em.remove(compte);
         user_id = 0;
    	
	}
    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updateAccount(String newName, String newPasswd) {
        Query q = em.createNamedQuery("findCompteByName");
        q.setParameter("cname", newName);
        List<Compte> res = q.getResultList();
        Compte currentAccount = getCompte();
        if (res == null || res.isEmpty() || currentAccount.getName().equals(newName)) {
            currentAccount.setName(newName);
            currentAccount.setPassword(newPasswd);
            em.merge(currentAccount);
        } else {
            throw new UsernameAlreadyExistsException("Username already exists! Please choose another one.");
        }
    }

    // Custom exception classes for better error handling
    public static class AccountNotFoundException extends RuntimeException {
        public AccountNotFoundException(String message) {
            super(message);
        }
    }

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException(String message) {
            super(message);
        }
    }

    public static class UsernameAlreadyExistsException extends RuntimeException {
        public UsernameAlreadyExistsException(String message) {
            super(message);
        }
    }
    public static class InsufficientFundsException extends RuntimeException {
        public InsufficientFundsException(String message) {
            super(message);
        }
    }
	
}
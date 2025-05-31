package com.service;

import com.entities.Compte;


import jakarta.ejb.*;

@Remote
public interface Utilisateur {
	
	public int init(String name, String passwd);
	public Compte getCompte();
	public String getName(); 
	public float  solde();
	public void  increaseSolde(float somme);
	public void   debite(float f);
	public void createAccount(String name, String passwd);
	public void updateAccount(String newName, String newPasswd);
	public void deleteAccount();
}

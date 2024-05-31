package com.rogu.librell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rogu.librell.entities.Pedido;

public interface PedRepository extends JpaRepository<Pedido, Long>{

}

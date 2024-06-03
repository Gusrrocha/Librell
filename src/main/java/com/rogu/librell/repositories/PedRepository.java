package com.rogu.librell.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.rogu.librell.entities.Pedido;

public interface PedRepository extends JpaRepository<Pedido, Long>{
	
	@Query(nativeQuery = true, value = "select * from pedido p where user_id = :id")
	List<Pedido> findByUserId(Long id);
	

	
}

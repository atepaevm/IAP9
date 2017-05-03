package service;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by 12 on 03.05.2017.
 */
public interface PointRepository extends CrudRepository<Point,Integer>{
    Point findById(int id);
}

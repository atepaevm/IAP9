package service;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("jpaContactService")
@Repository
@Transactional
public class PointServiceImpl implements PointService {

    @Autowired
    private PointRepository pointRepository;

    public List<Point> findAll() {
        return Lists.newArrayList(pointRepository.findAll());
    }

    public Point findById(int id) {
        return pointRepository.findById(id);
    }

    public void addPoint(Point point) {
        pointRepository.save(point);
    }

    public void deletePoint(int id) {
        pointRepository.delete(id);
    }

    public Point getPoint(int id) {
        return pointRepository.findById(id);
    }

    public List<Point> getPoints() {
        return Lists.newArrayList(pointRepository.findAll());
    }

    public void deleteAllPoints() {
        pointRepository.deleteAll();
    }

    /*public List<Point> findAll() {
        return Lists.newArrayList(pointRepository.findAll());
    }

    public List<Point> findById(int id) {
        return pointRepository.findById(id);
    }*/


   /* public void addPoint(Point point) {
        pointRepository.addPoint(point);
    }

    public void deletePoint(int id) {
        pointRepository.deletePoint(id);
    }

    public Point getPoint(int id) {
        return pointRepository.getPoint(id);
    }

    public List<Point> getPoints() {
        return pointRepository.getPoints();
    }

    public void deleteAllPoints() {
        pointRepository.deleteAllPoints();
    }*/
}

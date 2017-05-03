package service;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
public interface PointService{
    List<Point> findAll();
    Point findById(int id);
    public void addPoint(Point point);
    public void deletePoint(int id);
    public Point getPoint(int id);
    public List<Point> getPoints();
    public void deleteAllPoints();
}

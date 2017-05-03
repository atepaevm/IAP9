package main;

import org.springframework.context.support.GenericXmlApplicationContext;
import service.Point;
import service.PointService;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
        ctx.load("classpath:spring-config.xml"); //move from src.main.java to src.main.resources
        ctx.refresh();
        Point point=new Point();
        point.setIsEntry(true);
        point.setR(666.0);
        point.setX(666.0);
        point.setY(666.0);
        PointService service = ctx.getBean("jpaContactService", PointService.class);
        service.addPoint(point);
        service.deletePoint(2);
        List<Point> points = service.getPoints();
        printAll(points);
        System.out.println(service.getPoint(5).toString());
        service.deleteAllPoints();
        points = service.getPoints();
        printAll(points);
    }

    private static void printAll(List<Point> points) {
        System.out.println("printAll: ");
        for (Point point:points) {
            System.out.println(point);
        }
    }
}
import org.springframework.context.support.GenericXmlApplicationContext;
import service.Point;
import service.PointService;
import service.PointServiceImpl;

import javax.websocket.*;
import javax.json.*;
import javax.websocket.server.ServerEndpoint;
import java.io.*;
import java.util.List;

@ServerEndpoint("/echo")
public class EchoEndpoint {

    PointService pointDao;

    @OnMessage
    public void onMessage(Session session, String msg) {
        String type;
        Double r;
        Point curPoint = new Point();
        JsonReader jsonReader = Json.createReader(new StringReader(msg));
        JsonObject message = jsonReader.readObject();
        JsonObject data = message.getJsonObject("data");
        type = message.getString("type");
        if(type.equals("D")){
            try{
                pointDao.deleteAllPoints();
                JsonObject retData = Json.createObjectBuilder().add("type", "D").add("data", "").build();
                try {
                    session.getBasicRemote().sendText(retData.toString());
                } catch (java.lang.Throwable e){}
            } catch (Exception e){
                try {
                    session.getBasicRemote().sendText(e.toString());
                } catch (java.lang.Throwable f){}
            }
        } else if (type.equals("A")) {
            Double x, y;
            r = data.getJsonNumber("r").doubleValue();
            x = data.getJsonNumber("x").doubleValue();
            y = data.getJsonNumber("y").doubleValue();
            curPoint.setR(r);
            curPoint.setX(x);
            curPoint.setY(y);
            curPoint.checkIsEntry();
            try{
                pointDao.addPoint(curPoint);
            } catch (Exception e){
                try {
                    session.getBasicRemote().sendText(e.toString());
                } catch (java.lang.Throwable f){}
            }
            JsonObject retMessage = Json.createObjectBuilder()
                    .add("type", "A")
                    .add("data", Json.createObjectBuilder()
                        .add("isInside", curPoint.getIsEntry())
                        .add("r", r)
                        .add("x", x)
                        .add("y", y)
                    )
                    .build();
            try {
                session.getBasicRemote().sendText(retMessage.toString());
            } catch (java.lang.Throwable e){}
        } else if(type.equals("G")){
            try{
                List<Point> pointList = pointDao.getPoints();
                JsonArrayBuilder databasePoints = Json.createArrayBuilder();
                for(int i = 0; i < pointList.size(); ++i){
                    curPoint = pointList.get(i);
                    databasePoints.add(Json.createObjectBuilder()
                        .add("x", curPoint.getX())
                        .add("y", curPoint.getY())
                        .add("r", curPoint.getR())
                        .add("isInside", curPoint.getIsEntry())
                    );
                }
                JsonObject retData = Json.createObjectBuilder()
                        .add("type", "G")
                        .add("data", Json.createObjectBuilder()
                            .add("points", databasePoints)
                        ).build();
                try {
                    session.getBasicRemote().sendText(retData.toString());
                } catch (java.lang.Throwable f){}
            } catch (java.lang.Throwable e){

            }
        } else if(type.equals("C")){
            r = data.getJsonNumber("r").doubleValue();
            try{
                List<Point> pointList = pointDao.getPoints();
                JsonArrayBuilder points = Json.createArrayBuilder();
                for(int i = 0; i < pointList.size(); ++i){
                    curPoint = pointList.get(i);
                    curPoint.setR(r);
                    curPoint.checkIsEntry();
                    points.add(Json.createObjectBuilder()
                            .add("x", curPoint.getX())
                            .add("y", curPoint.getY())
                            .add("isInside", curPoint.getIsEntry())
                    );
                }
                JsonObject retData = Json.createObjectBuilder()
                        .add("type", "C")
                        .add("data", Json.createObjectBuilder()
                                .add("points", points)
                        ).build();
                try {
                    session.getBasicRemote().sendText(retData.toString());
                } catch (java.lang.Throwable f){

                }
            } catch (java.lang.Throwable e){

            }
        }
    }

    public void init(){
        GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
        ctx.load("classpath:spring-config.xml"); //move from src.main.java to src.main.resources
        ctx.refresh();
        pointDao = ctx.getBean("jpaContactService", PointService.class);
    }

    @OnOpen
    public void onOpen(){
        init();
    }


}

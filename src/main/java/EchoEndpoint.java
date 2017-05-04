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
        JsonObject data = jsonReader.readObject();
        type = data.getString("type");
        r = (Double)data.getJsonNumber("rval").doubleValue();
        if(type.equals("C")){
            JsonArray xvals, yvals;
            xvals = data.getJsonArray("xvals");
            yvals = data.getJsonArray("yvals");
            JsonArrayBuilder result = Json.createArrayBuilder();
            curPoint.setR(r);
            for(int i=0; i < xvals.size(); ++i){
                curPoint.setX((Double) xvals.getJsonNumber(i).doubleValue());
                curPoint.setY((Double)yvals.getJsonNumber(i).doubleValue());
                curPoint.checkIsEntry();
                result.add((boolean)curPoint.getIsEntry());
            }
            JsonArray res = result.build();
            JsonObject retData = Json.createObjectBuilder().add("type", "C").add("points", res).add("first", data.getInt("begin")).build();
            try {
                session.getBasicRemote().sendText(retData.toString());
            } catch (java.lang.Throwable e){

            }

        } else if(type.equals("A")) {
            Double xval, yval;
            xval = (Double) data.getJsonNumber("xval").doubleValue();
            yval = (Double) data.getJsonNumber("yval").doubleValue();
            curPoint.setR(r);
            curPoint.setX(xval);
            curPoint.setY(yval);
            curPoint.checkIsEntry();
            try{
                pointDao.addPoint(curPoint);
            } catch (Exception e){

            }
            JsonObject retData = Json.createObjectBuilder().add("type", "A").add("point", (boolean) curPoint.getIsEntry()).add("r", (double)r).add("id", data.getInt("id")).build();
            try {
                session.getBasicRemote().sendText(retData.toString());
            } catch (java.lang.Throwable e){

            }

        } else if(type.equals("G")){
            JsonArray xvals, yvals, points;
            try{
                List<Point> pointList = pointDao.getPoints();
                JsonArrayBuilder xBuild = Json.createArrayBuilder();
                JsonArrayBuilder yBuild = Json.createArrayBuilder();
                JsonArrayBuilder pBuild = Json.createArrayBuilder();
                for(int i = 0; i < pointList.size(); ++i){
                    curPoint = pointList.get(i);
                    curPoint.setR(r);
                    curPoint.checkIsEntry();
                    xBuild.add((double)curPoint.getX());
                    yBuild.add((double)curPoint.getY());
                    pBuild.add((boolean)curPoint.getIsEntry());
                }
                xvals = xBuild.build();
                yvals = yBuild.build();
                points = pBuild.build();
                JsonObject retData = Json.createObjectBuilder().add("type", "G").add("xvals", xvals).add("yvals", yvals).add("points", points).build();
                try {
                    session.getBasicRemote().sendText(retData.toString());
                } catch (java.lang.Throwable e){

                }
            } catch (Exception e){

            }

        } else if(type.equals("D")){
            try{
                pointDao.deleteAllPoints();
                JsonObject retData = Json.createObjectBuilder().add("type", "D").build();
                try {
                    session.getBasicRemote().sendText(retData.toString());
                } catch (java.lang.Throwable e){

                }
            } catch (Exception e){

            }


        }
    }

    public void init(){
        pointDao = new PointServiceImpl();
    }

    @OnOpen
    public void onOpen(Session session){
        init();
    }


}

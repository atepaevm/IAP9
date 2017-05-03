package service;
import javax.persistence.*;
@Entity
@Table(name="points")
public class Point {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Integer id;
    @Column(name="X")
    private Double X;
    @Column(name="Y")
    private Double Y;
    @Column(name="R")
    private Double R;
    @Column(name="isentry")
    private Boolean isEntry;
    public void setId(Integer id1){this.id=id1;}
    public void setX(Double X){this.X=X;}
    public void setY(Double Y){this.Y=Y;}
    public void setR(Double R){this.R=R;}
    public void setIsEntry(Boolean isEntry){this.isEntry=isEntry;}
    public void checkIsEntry(){
        //double x = (double)this.X, y = (double)this.Y, r = (double)this.R;
        if(X >= 0 && Y >= 0){
            if(X <= R && Y <= R){
                this.isEntry = (Boolean) true;
            } else {
                this.isEntry = (Boolean) false;
            }

        } else if( X >= 0 && Y < 0){
            if(X * X + Y * Y <= R * R ){
                this.isEntry = (Boolean) true;
            } else {
                this.isEntry = (Boolean) false;
            }
        } else if( X < 0 && Y >= 0){
            if(Y <= (R - 2 * (-X))){
                this.isEntry = (Boolean) true;
            } else {
                this.isEntry = (Boolean) false;
            }

        } else {
            this.isEntry = (Boolean) false;
        }
    }
    public Integer getId(){return id;}
    public Double getX(){return X;}
    public Double getY(){return Y;}
    public Double getR(){return R;}
    public Boolean getIsEntry(){return isEntry;}
    @Override
    public String toString(){
        return "id: "+id.toString()+" X: "+X.toString()+" Y: "+Y.toString()
                +" R: "+R.toString()+" isEntry: "+isEntry.toString();
    }
}
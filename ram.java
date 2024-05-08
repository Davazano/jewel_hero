class RAM{

        // members of protected nested class
        double memory;
        String manufacturer;

        double getClockSpeed(){
            return 5.5;
        }
    }

public class Main {
    public static void main(String[] args) {

        // create object of Outer class CPU
        RAM ram = new RAM();
        
        System.out.println("Ram Clock speed = " + ram.getClockSpeed());
    }
}

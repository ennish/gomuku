package com.ennio.gomoku.dto;



public class MoveDto{
    
    public static void main(String[] args){
        String input = "13073 5099";
        String[] array = input.split(" ");
        Integer a = Integer.parseInt(array[0]);
        Integer b = Integer.parseInt(array[1]);
        
        System.out.println(a+b);
    }
}
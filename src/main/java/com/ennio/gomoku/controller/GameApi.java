package com.ennio.gomoku.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameApi {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String msg){

        return "Hello " + msg;
    }

    @MessageMapping("/play")
    @SendTo("/topic/play")
    public String send(){

        return "";
    }
}

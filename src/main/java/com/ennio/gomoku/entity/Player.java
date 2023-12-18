package com.ennio.gomoku.entity;

public class Player {

    private Long playerId;

    private String name;

    private String avatorUrl;

    private String password;

    private Integer countTotal;

    private Integer countWin;

    private Integer countDraw;

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatorUrl() {
        return avatorUrl;
    }

    public void setAvatorUrl(String avatorUrl) {
        this.avatorUrl = avatorUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getCountTotal() {
        return countTotal;
    }

    public void setCountTotal(Integer countTotal) {
        this.countTotal = countTotal;
    }

    public Integer getCountWin() {
        return countWin;
    }

    public void setCountWin(Integer countWin) {
        this.countWin = countWin;
    }

    public Integer getCountDraw() {
        return countDraw;
    }

    public void setCountDraw(Integer countDraw) {
        this.countDraw = countDraw;
    }

}
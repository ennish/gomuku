# Gomoku server and client project

Gomoku, also called Five in a Row, is an abstract strategy board game. It is traditionally played with Go pieces (black and white stones) on a 15×15 Go board.

## Rules

Players alternate turns placing a stone of their color on an empty intersection. Black plays first. The winner is the first player to form an unbroken line of five stones of their color horizontally, vertically, or diagonally. If the board is completely filled and no one can make a line of 5 stones, then the game ends in a draw.

## Server
The server provides below api:

- Player register
    1. Simple implemention : Register by user name;
    ....

- Game rooms
    1. List rooms(Waiting rooms and Playing rooms)
    2. Create room

- Game play
    1. Black first
    2. 

## Clients

### html5

Payload between server and client

```json
    {
        "gmkId":12121
        ,"user":{
            "userId":121
            ,"userName":"demo",
            "role":1
            ,"currentStep":1
        }
        ,"move":{
            "loc":{2,3}
        }
        "game":{
            "moveStack":[{1,2},{2,2}]
        }
    }
```
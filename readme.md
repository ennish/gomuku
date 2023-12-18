# Gomoku server and client project

Gomoku, also called Five in a Row, is an abstract strategy board game. It is traditionally played with Go pieces (black and white stones) on a 15×15 Go board.

## Rules

Players alternate turns placing a stone of their color on an empty intersection. Black plays first. The winner is the first player to form an unbroken line of five stones of their color horizontally, vertically, or diagonally. If the board is completely filled and no one can make a line of 5 stones, then the game ends in a draw.

## Server

The server provides below api:

- Player register
    1. Simple implemention : Register by name;
    . Get player info

- Game rooms
    1. List rooms(Waiting rooms and Playing rooms)
    2. Create room

- Game playing
    1. Receive move data
    2. Send lastes moves from the competitor
    3. Check game over/draw state

## Clients

### html5

### java JWT

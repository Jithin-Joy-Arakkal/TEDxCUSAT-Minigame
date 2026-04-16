#!/usr/bin/env python3
"""
TEDxCUSAT Idea Quest - A Simple Text-Based Adventure Game

Theme: Explore ideas worth spreading at TEDxCUSAT.
You are an idea explorer. Navigate through rooms, each containing an idea.
Answer a simple question to collect the idea and move to the next room.
Collect all ideas to win!

Controls:
- Type 'north', 'south', 'east', 'west' to move.
- Type 'look' to see the current room description.
- Type 'inventory' to see collected ideas.
- Type 'quit' to exit.
"""

import sys

# Define the rooms as a dictionary
rooms = {
    'start': {
        'description': 'You are at the entrance of TEDxCUSAT. Ideas are waiting to be discovered. Go north to begin your quest.',
        'north': 'innovation',
        'question': None,
        'idea': None
    },
    'innovation': {
        'description': 'You enter the Innovation Room. The air buzzes with creativity.',
        'south': 'start',
        'east': 'technology',
        'question': 'What is the first step in innovation? (hint: think)',
        'answer': 'thinking',
        'idea': 'Innovation starts with thinking outside the box.'
    },
    'technology': {
        'description': 'You are in the Technology Room. Gadgets and code surround you.',
        'west': 'innovation',
        'north': 'education',
        'question': 'What does AI stand for?',
        'answer': 'artificial intelligence',
        'idea': 'Technology like AI is shaping our future.'
    },
    'education': {
        'description': 'Welcome to the Education Room. Books and minds open here.',
        'south': 'technology',
        'question': 'Why is lifelong learning important?',
        'answer': 'to adapt and grow',
        'idea': 'Education empowers us to spread ideas.'
    }
}

# Player state
current_room = 'start'
inventory = []

def show_description():
    print(rooms[current_room]['description'])
    if rooms[current_room]['question']:
        print(f"Question: {rooms[current_room]['question']}")

def main():
    global current_room
    print("Welcome to TEDxCUSAT Idea Quest!")
    print("Type 'help' for commands.")
    show_description()

    while True:
        command = input("> ").lower().strip()

        if command == 'quit':
            print("Thanks for playing! Goodbye.")
            sys.exit()
        elif command == 'help':
            print("Commands: north, south, east, west, look, inventory, quit")
        elif command == 'look':
            show_description()
        elif command == 'inventory':
            if inventory:
                print("Collected Ideas:")
                for idea in inventory:
                    print(f"- {idea}")
            else:
                print("No ideas collected yet.")
        elif command in ['north', 'south', 'east', 'west']:
            if command in rooms[current_room]:
                next_room = rooms[current_room][command]
                if rooms[next_room]['question']:
                    print(f"To enter, answer: {rooms[next_room]['question']}")
                    answer = input("Your answer: ").lower().strip()
                    if answer == rooms[next_room]['answer']:
                        print("Correct! You collect the idea.")
                        inventory.append(rooms[next_room]['idea'])
                        current_room = next_room
                        show_description()
                        if len(inventory) == 3:  # All ideas collected
                            print("Congratulations! You have collected all ideas and won TEDxCUSAT Idea Quest!")
                            sys.exit()
                    else:
                        print("Wrong answer. Try again.")
                else:
                    current_room = next_room
                    show_description()
            else:
                print("You can't go that way.")
        else:
            print("Unknown command. Type 'help' for options.")

if __name__ == "__main__":
    main()
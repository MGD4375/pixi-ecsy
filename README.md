# PIXI-ECSY

The purpose of this project was to work out how I might work with both pixi.js and ecsy at the same time.
I've tested it against Chrome, and Edge. I'm aware there are problems in other browsers.

Working deployment: https://pixi-ecsy.netlify.app/

Controls: 
- WASD to move
- Space to jump


## Project Highlights
Overall, the structure is easy to work in. There's very little code to have to wrap your head around in app.js. It's quick and easy to add new systems or remove old systems.
During this project I learned about:
- ECSY SystemStateComponents
- I've never used Pixi before. I'm pleased that rendering performance was never an issue during this. In a previous test I was able to render many thousands of animated sprites using ECSY and pixi together.
- I'm relatively pleased with the solution I came up with for hitboxes. I draw a second invisible sprite inside the displayed one. This makes collision checking pretty easy, and by setting globals.debug to true I can see where all hitboxes are.

## Project Shortcomings
- SpriteSystem was originally intended to mediate between ECSY and the PIXI singleton. I found myself increasingly overloading the SpriteComponent class with anything pixi might need. This seems to violate the interface segregation principle. I did consider splitting SpriteComponent into AnimatedSpriteComponent and StaticSpriteComponent. I decided against this as in other places I wanted to treat both as generic sprites. 
I also found that I needed to access pixi sprites in a few places. I could probably go back and capture that entirely in SpriteStateComponent
- I tended to get confused about where the natural boundaries of systems/components were. Some systems such as PlayerMovementSystem covers velocity management and is responsible for stopping collisions before they occur. Other systems such as MotionSystem is lazer focused. 
- The biggest performance draw in the game comes from comparing the movers(Player and skeletons) against every single blocker. I suspect there's a way of merging colliders for the level walls which I haven't learned yet.

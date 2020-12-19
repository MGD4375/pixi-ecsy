import {
  World
} from "../node_modules/ecsy/build/ecsy.module.js";
import AdventurerComponent from "./components/adventurerComponent.js";
import InputComponent from "./components/inputComponent.js";
import TransformComponent from "./components/transformComponent.js";
import VelocityComponent from "./components/velocityComponent.js";
import pixiApp from "./singletons/pixi.js";
import sprites from "./singletons/sprites.js";
import AdventurerSpriteManagerSystem from "./systems/adventurerSpriteManagerSystem.js";
import InputSystem from "./systems/inputSystem.js";
import MotionSystem from "./systems/motionSystem.js";
import PlayerMovementSystem from "./systems/playerMovementSystem.js";
import SpriteSystem from "./systems/spriteSystem.js";
import GravityComponent from "./components/gravityComponent.js";
import GravitySystem from "./systems/gravitySystem.js";
import BlockerComponent from "./components/blockerComponent.js";
import {
  SpriteComponent,
  SpriteStateComponent
} from "./components/spriteComponent.js";
import random from "./random.js";
import CameraFocusComponent from "./components/cameraFocusComponent.js";
import CameraSystem from "./systems/cameraSystem.js";
import {
  HitBoxComponent,
  HitBoxStateComponent
} from "./components/hitBoxComponent.js";
import HitBoxSystem from "./systems/hitBoxSystem.js";
import {
  FollowingBackgroundComponent,
  FollowingBackgroundStateComponent
} from "./components/followingBackgroundComponent.js";
import FollowingBackgroundSystem from "./systems/followingBackgroundSystem.js";
import CollisionComponent from "./components/collisionComponent.js";
import CollisionSystem from "./systems/collisionSystem.js";
import PlayerCollisions from "./systems/playerCollisions.js";
import VictoryTriggerComponent from "./components/victoryComponent.js";
import SkeletonComponent from "./components/skeletonComponent.js";
import SkeletonMovementSystem from "./systems/skeletonMovementSystem.js";
import SkeletonSpriteManagerSystem from "./systems/skeletonSpriteManagerSystem.js";
import DeathComponent from "./components/deathComponent.js";

const world = new World();
world.registerComponent(AdventurerComponent)
world.registerComponent(InputComponent)
world.registerComponent(TransformComponent)
world.registerComponent(GravityComponent)
world.registerComponent(BlockerComponent)
world.registerComponent(DeathComponent)
world.registerComponent(VelocityComponent)
world.registerComponent(FollowingBackgroundComponent)
world.registerComponent(FollowingBackgroundStateComponent)
world.registerComponent(SpriteComponent)
world.registerComponent(CollisionComponent)
world.registerComponent(SkeletonComponent)
world.registerComponent(CameraFocusComponent)
world.registerComponent(VictoryTriggerComponent)
world.registerComponent(HitBoxComponent)
world.registerComponent(SpriteStateComponent)
world.registerComponent(HitBoxStateComponent)
world.registerSystem(GravitySystem)
world.registerSystem(InputSystem)
world.registerSystem(AdventurerSpriteManagerSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(SkeletonMovementSystem)
world.registerSystem(SkeletonSpriteManagerSystem)
world.registerSystem(MotionSystem)
world.registerSystem(FollowingBackgroundSystem)
world.registerSystem(SpriteSystem)
world.registerSystem(CameraSystem)
world.registerSystem(HitBoxSystem)
world.registerSystem(CollisionSystem)
world.registerSystem(PlayerCollisions)

PIXI.Loader.shared
  .add("sprites/adventurer.json")
  .add("sprites/items/items.json")
  .add("sprites/skeleton/skeleton.json")
  .add("tilemaps/background_0.png")
  .add("tilemaps/grass.json")
  .load(setup);

function setup() {

  GameLoader.LoadLevel('level_01.json')
    .then(() => {
      pixiApp.ticker.add(delta => gameLoop(delta))
    })

  function gameLoop(delta) {
    world.execute(delta)
  }
}

class GameLoader {
  static LoadLevel(name) {
    return fetch('./game/levels/' + name)
      .then(response => response.json())
      .then(data => {

        for (let rowIndex = 0; rowIndex < data.tiles.length; rowIndex++) {
          const row = data.tiles[rowIndex];
          for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];

            if (cell.toLowerCase() === 'f') {
              var spriteComponent;
              var addHitbox = true
              if (isMiddle(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (6).png', 1); addHitbox = false }
              else if (isTopRight(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (4).png', 1); spriteComponent.flip = -1 }
              else if (isBottomRight(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (8).png', 1); spriteComponent.flip = -1 }
              else if (isBottomLeft(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (8).png', 1) }
              else if (isTopLeft(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (4).png', 1) }
              else if (isLeft(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (7).png', 1) }
              else if (isRight(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (5).png', 1); spriteComponent.flip = -1 }
              else if (isBottom(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (9).png', 1) }
              else if (isTop(data.tiles, rowIndex, colIndex)) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (3).png', 1) }
              else if (random(0, 9) !== 9) { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'space.png', 1); addHitbox = false }
              else { spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass (6).png', 1); addHitbox = false }

              spriteComponent.width = 16;
              spriteComponent.height = 16

              var entity = world.createEntity()
                .addComponent(TransformComponent, TransformComponent.create(colIndex * 16, rowIndex * 16))
                .addComponent(SpriteComponent, spriteComponent)

              if (addHitbox) {
                entity
                  .addComponent(BlockerComponent)
                  .addComponent(HitBoxComponent, HitBoxComponent.create(16.1, 16.1, .5, .5))
              }


            } else
              if (cell === 'P') {
                var spriteInfo = SpriteComponent.create(sprites.adventurer.fileName, sprites.adventurer.run, 1)
                spriteInfo.isAnimated = true

                world.createEntity()
                  .addComponent(FollowingBackgroundComponent, FollowingBackgroundComponent.create('', 'tilemaps/background_0.png'))
                  .addComponent(AdventurerComponent)
                  .addComponent(InputComponent)
                  .addComponent(GravityComponent)
                  .addComponent(CollisionComponent)
                  .addComponent(DeathComponent)
                  .addComponent(VelocityComponent, VelocityComponent.create(0, 0))
                  .addComponent(TransformComponent, TransformComponent.create(colIndex * 16, rowIndex * 16))
                  .addComponent(CameraFocusComponent)
                  .addComponent(HitBoxComponent, HitBoxComponent.create(28, 12, 0.5, 0.4))
                  .addComponent(SpriteComponent, spriteInfo)

              }
              else if (cell === ' ') {
                if (!data.tiles[rowIndex + 1]) continue
                if (!data.tiles[rowIndex + 1][colIndex]) continue

                if (data.tiles[rowIndex + 1][colIndex].toLowerCase() == 'f' && random(7, 10) === 10) {
                  var spriteComponent = SpriteComponent.create('tilemaps/grass.json', 'grass_clutter.png', 1)
                  spriteComponent.width = 16;
                  spriteComponent.height = 16
                  spriteComponent.flip = random(-2, 1)
                  world.createEntity()
                    .addComponent(TransformComponent, TransformComponent.create(colIndex * 16, rowIndex * 16))
                    .addComponent(SpriteComponent, spriteComponent)
                }

              }
              else if (cell === 'E') {
                var spriteInfo = SpriteComponent.create('sprites/skeleton/skeleton.json', 'walk', 1)
                spriteInfo.isAnimated = true

                world.createEntity()
                  .addComponent(GravityComponent)
                  .addComponent(CollisionComponent)
                  .addComponent(SkeletonComponent)
                  .addComponent(VelocityComponent, VelocityComponent.create(0, 0))
                  .addComponent(TransformComponent, TransformComponent.create(colIndex * 16, rowIndex * 16))
                  .addComponent(HitBoxComponent, HitBoxComponent.create(24, 12, .5, .3))
                  .addComponent(SpriteComponent, spriteInfo)
              }
              else if (cell === 'V') {
                spriteComponent = SpriteComponent.create('sprites/items/items.json', 'Item__71.png', 1)

                world.createEntity()
                  .addComponent(TransformComponent, TransformComponent.create(colIndex * 16, rowIndex * 16))
                  .addComponent(CollisionComponent)
                  .addComponent(VictoryTriggerComponent)
                  .addComponent(HitBoxComponent, HitBoxComponent.create(16, 16, .5, .5))
                  .addComponent(SpriteComponent, spriteComponent)
              }
              else {
                console.warn('unhandled level object: ' + cell)
              }
          }
        }
      });
  }
}

function isTop(tiles, rowIndex, colIndex) {
  return tiles[rowIndex - 1][colIndex].toLowerCase() !== "f"
}

function isTopRight(tiles, rowIndex, colIndex) {
  return tiles[rowIndex - 1][colIndex].toLowerCase() !== "f" && tiles[rowIndex][colIndex + 1].toLowerCase() !== "f"
}

function isRight(tiles, rowIndex, colIndex) {
  return tiles[rowIndex][colIndex + 1].toLowerCase() !== "f"
}

function isBottomRight(tiles, rowIndex, colIndex) {
  return tiles[rowIndex + 1][colIndex].toLowerCase() !== "f" && tiles[rowIndex][colIndex + 1].toLowerCase() !== "f"
}

function isBottom(tiles, rowIndex, colIndex) {
  return tiles[rowIndex + 1][colIndex].toLowerCase() !== "f"
}

function isBottomLeft(tiles, rowIndex, colIndex) {
  return tiles[rowIndex + 1][colIndex].toLowerCase() !== "f" && tiles[rowIndex][colIndex - 1].toLowerCase() !== "f"
}

function isLeft(tiles, rowIndex, colIndex) {
  return tiles[rowIndex][colIndex - 1].toLowerCase() !== "f"
}

function isTopLeft(tiles, rowIndex, colIndex) {
  return tiles[rowIndex - 1][colIndex].toLowerCase() !== "f" && tiles[rowIndex][colIndex - 1].toLowerCase() !== "f"
}

function isMiddle(tiles, rowIndex, colIndex) {
  return tiles[rowIndex - 1][colIndex].toLowerCase() !== "f"
    && tiles[rowIndex + 1][colIndex].toLowerCase() !== "f"
    && tiles[rowIndex][colIndex - 1].toLowerCase() !== "f"
    && tiles[rowIndex][colIndex + 1].toLowerCase() !== "f"
}
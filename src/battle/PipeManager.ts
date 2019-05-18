import { BattleScene } from "./Scene";
import * as constants from "../constants"
import * as Phaser from "phaser"

export const addRowOfPipes = (scene: BattleScene): Phaser.Physics.Arcade.Group => {
    // Randomly pick a number between 1 and 7
    // This will be the hole positioning
    const slots = 7
    
    // we have a height of 240 to work with ATM
    const windowHeight = 240
    // const windowHeight = scene.game.canvas.height
    
    // Distance from the top / bottom
    const pipeEdgeBuffer = 170

    // get the distance between each potential interval
    const pipeIntervals = (windowHeight - (pipeEdgeBuffer/2) - (constants.gapHeight /2)) / slots
    
    const holeSlot = Math.floor(scene.rng() * 5) + 1;
    const holeTop = (pipeIntervals * holeSlot) + (pipeEdgeBuffer/2) - (constants.gapHeight/2)
    const holeBottom = (pipeIntervals * holeSlot) + (pipeEdgeBuffer/2) + (constants.gapHeight/2)
    
    const pipeTop = createSprite(180, holeTop, 'pipe-top', scene)
    const pipeBottom = createSprite(180, holeBottom, 'pipe-bottom', scene)
    configurePipeSprite(pipeTop)
    configurePipeSprite(pipeBottom)

    const pipeTopBody = createSprite(180, holeTop - 5, "pipe-body", scene);
    pipeTopBody.setScale(1, 4000)
    configurePipeSprite(pipeTopBody)

    const pipeBottomBody = createSprite(180, windowHeight, "pipe-body", scene);
    pipeBottomBody.setScale(1, windowHeight - holeBottom - 5)
    configurePipeSprite(pipeBottomBody)
   
    const group = new Phaser.Physics.Arcade.Group(
      scene.physics.world, 
      scene, 
      [pipeTop, pipeTopBody, pipeBottom, pipeBottomBody],
      {}
    )

    this.sys.updateList.add(group)

    return group
}


const createSprite = (x: number, y: number, key: string, scene: Phaser.Scene, SpriteClass: any | Class = Phaser.Physics.Arcade.Sprite): Phaser.Physics.Arcade.Sprite => {
  // This is why we have this method at all
  const sprite = new SpriteClass(scene, x, y, key)

  /// These come directly from: https://github.com/photonstorm/phaser/blob/v3.17.0/src/physics/arcade/Factory.js#L191-L214 
  scene.sys.displayList.add(sprite);
  scene.sys.updateList.add(sprite);

  scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

  return sprite
}

const configurePipeSprite = (pipe: Phaser.Physics.Arcade.Sprite) => {
  pipe.body.velocity.x = -1 * constants.pipeSpeed; 
  
  const body = pipe.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  // Automatically kill the pipe when it's no longer visible 
  body.setCollideWorldBounds(true);
  body.onWorldBounds = true
}

export const addPipeSprite = (scene: BattleScene, pipe: Phaser.Physics.Arcade.Sprite) => {
  // Add the pipe to our previously created group
  scene.pipes.add(pipe);

  // Add velocity to the pipe to make it move left
  pipe.body.velocity.x = -1 * constants.pipeSpeed; 
  
  const body = pipe.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  // Automatically kill the pipe when it's no longer visible 
  body.setCollideWorldBounds(true);
  body.onWorldBounds = true
}
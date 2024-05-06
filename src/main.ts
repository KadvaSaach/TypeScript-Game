import { k } from "./kaboomCtx";

// all the logic
async function gameSetup() {
  k.loadSprite("assets", "./bob-like.png", {
    sliceX: 9,
    sliceY: 10,
    anims: {
      bobIdle: 0,
      bobInhaling: 1,
      bobFull: 2,
      bobInhaleEffect: { from: 3, to: 8, speed: 15, loop: true },
      shootingStar: 9,
      flame: { from: 36, to: 37, speed: 4, loop: true },
      guyIdle: 18,
      guyWalk: { from: 18, to: 19, speed: 4, loop: true },
      bird: { from: 27, to: 28, speed: 4, loop: true },
    },
  });

  k.loadSprite("level-1", "./level-1.png");

  k.scene("level-1", async () => {
    k.setGravity(2100);
    k.add([
      k.rect(k.width(), k.height()),
      k.color(k.Color.fromHex("#f7d7db")),
      k.fixed(),
    ]);
  });

  k.go("level-1");
}

gameSetup();

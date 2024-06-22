import {
  makeBirdEnemy,
  makeFlameEnemy,
  makeGuyEnemy,
  makePlayer,
  setControls,
} from "./entities";
import { k } from "./kaboomCtx";
import { globalGameState } from "./state";
import { makeMap } from "./utils";

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
  k.loadSprite("level-2", "./level-2.png");

  k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0), k.fixed()]);

  const { map: level1Layout, spawnPts: level1SpawnPts } = await makeMap(
    k,
    "level-1"
  );

  const { map: level2Layout, spawnPts: level2SpawnPts } = await makeMap(
    k,
    "level-2"
  );

  k.scene("level-1", async () => {
    globalGameState.setCurrentScene("level-1");
    globalGameState.setNextScene("level-2");
    k.setGravity(2100);
    k.add([
      k.rect(k.width(), k.height()),
      k.color(k.Color.fromHex("#f7d7db")),
      k.fixed(),
    ]);

    k.add(level1Layout);

    const bob = makePlayer(
      k,
      level1SpawnPts.player[0].x,
      level1SpawnPts.player[0].y
    );

    setControls(k, bob);
    k.add(bob);

    k.camScale(k.vec2(0.7));
    k.onUpdate(() => {
      if (bob.pos.x < level1Layout.pos.x + 432) k.camPos(bob.pos.x + 500, 860);
    });

    for (const flame of level1SpawnPts.flame) {
      makeFlameEnemy(k, flame.x, flame.y);
    }

    for (const guy of level1SpawnPts.guy) {
      makeGuyEnemy(k, guy.x, guy.y);
    }

    for (const bird of level1SpawnPts.bird) {
      const possibleSpeed = [100, 200, 300];
      k.loop(10, () => {
        makeBirdEnemy(
          k,
          bird.x,
          bird.y,
          possibleSpeed[Math.floor(Math.random() * possibleSpeed.length)]
        );
      });
    }
  });

  k.scene("level-2", async () => {
    globalGameState.setCurrentScene("level-2");
    globalGameState.setNextScene("level-1");
    k.setGravity(2100);
    k.add([
      k.rect(k.width(), k.height()),
      k.color(k.Color.fromHex("#f7d7db")),
      k.fixed(),
    ]);

    k.add(level2Layout);

    const bob = makePlayer(
      k,
      level2SpawnPts.player[0].x,
      level2SpawnPts.player[0].y
    );

    setControls(k, bob);
    k.add(bob);

    k.camScale(k.vec2(0.7));
    k.onUpdate(() => {
      if (bob.pos.x < level2Layout.pos.x + 2100) k.camPos(bob.pos.x + 500, 800);
    });

    for (const flame of level2SpawnPts.flame) {
      makeFlameEnemy(k, flame.x, flame.y);
    }

    for (const guy of level2SpawnPts.guy) {
      makeGuyEnemy(k, guy.x, guy.y);
    }

    for (const bird of level2SpawnPts.bird) {
      const possibleSpeed = [100, 200, 300];
      k.loop(10, () => {
        makeBirdEnemy(
          k,
          bird.x,
          bird.y,
          possibleSpeed[Math.floor(Math.random() * possibleSpeed.length)]
        );
      });
    }
  });

  k.scene("end", () => {});

  k.go("level-1");
}

gameSetup();

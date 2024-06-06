import { KaboomCtx } from "kaboom";
import { scale } from "./constans";

export async function makeMap(k: KaboomCtx, name: string) {
  const mapData = await (await fetch(`./${name}.json`)).json();

  const map = k.make([k.sprite(name), k.scale(scale), k.pos(0)]);

  const spawnPts: { [key: string]: { x: number; y: number }[] } = {};

  for (const layer of mapData.layers) {
    if (layer.name === "colliders") {
      for (const collider of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), collider.width, collider.height),
            collisionIgnore: ["platform", "exit"],
          }),
          collider.name !== "exit" ? k.body({ isStatic: true }) : null,
          k.pos(collider.x, collider.y),
          collider.name !== "exit" ? "platform" : "exit",
        ]);
      }
      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const spawnPt of layer.objects) {
        if (spawnPts[spawnPt.name]) {
          spawnPts[spawnPt.name].push({
            x: spawnPt.x,
            y: spawnPt.y,
          });
          continue;
        }

        spawnPts[spawnPt.name] = [{ x: spawnPt.x, y: spawnPt.y }];
      }
    }
  }
  return { map, spawnPts };
}

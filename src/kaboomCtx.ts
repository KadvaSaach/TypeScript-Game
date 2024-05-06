import kaboom from "kaboom";
import {scale } from "./constans";

export const k = kaboom({
  width: 256 * scale,
  height: 144 * scale,
  scale,
  letterbox: true,
  global: false,
});

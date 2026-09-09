import { mkdir, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

// A three-dimensional density and moonlight field, prepared outside the browser.
// Red is density; green/blue are direct and scattered light. No rendered images.
const width = 192,
  height = 80,
  depth = 144;
const min = [-52, -30, -78],
  extent = [104, 36, 84];
const voxels = width * height * depth;
const field = new Float32Array(voxels);
const data = new Uint8Array(voxels * 4);
let seed = 98173;
const rand = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
  return (seed >>> 0) / 4294967296;
};
const lattice = Float32Array.from({ length: 32768 }, rand);
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};
const value = (x, y, z) => lattice[((z & 31) * 32 + (y & 31)) * 32 + (x & 31)];
function noise(x, y, z) {
  const ix = Math.floor(x),
    iy = Math.floor(y),
    iz = Math.floor(z);
  const fx = smooth(x - ix),
    fy = smooth(y - iy),
    fz = smooth(z - iz);
  return mix(
    mix(
      mix(value(ix, iy, iz), value(ix + 1, iy, iz), fx),
      mix(value(ix, iy + 1, iz), value(ix + 1, iy + 1, iz), fx),
      fy,
    ),
    mix(
      mix(value(ix, iy, iz + 1), value(ix + 1, iy, iz + 1), fx),
      mix(value(ix, iy + 1, iz + 1), value(ix + 1, iy + 1, iz + 1), fx),
      fy,
    ),
    fz,
  );
}
for (let z = 0; z < depth; z++)
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const px = min[0] + (x / (width - 1)) * extent[0],
        py = min[1] + (y / (height - 1)) * extent[1],
        pz = min[2] + (z / (depth - 1)) * extent[2];
      const tower =
        Math.exp(-((px - 19) ** 2 / 145 + (pz + 31) ** 2 / 240)) * 8.7;
      const left =
        Math.exp(-((px + 29) ** 2 / 160 + (pz + 29) ** 2 / 180)) * 3.6;
      const top =
        -8 +
        0.12 * (pz + 20) -
        Math.max(pz + 16, 0) ** 2 * 0.018 +
        tower +
        left;
      const warp = noise(px * 0.055, py * 0.055, pz * 0.055) * 6;
      const turbulence =
        (noise(px * 0.19 + warp, py * 0.19, pz * 0.19) - 0.5) * 6.4 +
        (noise(px * 0.49, py * 0.49 + 7, pz * 0.49) - 0.5) * 2.5 +
        (noise(px * 1.2, py * 1.2, pz * 1.2 + 13) - 0.5) * 1.05 +
        (noise(px * 2.7, py * 2.7, pz * 2.7) - 0.5) * 0.32;
      const boundary =
        smooth((px - min[0]) / 7) *
        smooth((min[0] + extent[0] - px) / 7) *
        smooth((pz - min[2]) / 8) *
        smooth((min[2] + extent[2] - pz) / 7);
      const channelCenter = -2 + Math.sin((pz + 28) * 0.045) * 3;
      const channelWidth = 3.5 + 0.025 * (pz + 78);
      const hollow =
        Math.exp(-(((px - channelCenter) / (channelWidth + 2)) ** 2)) * 6;
      field[(z * height + y) * width + x] =
        smooth((top - hollow - py + turbulence + 0.15) / 1.35) *
        boundary *
        0.74;
    }
function sample(x, y, z) {
  const ix = Math.round(x),
    iy = Math.round(y),
    iz = Math.round(z);
  if (ix < 0 || iy < 0 || iz < 0 || ix >= width || iy >= height || iz >= depth)
    return 0;
  return field[(iz * height + iy) * width + ix];
}
for (let z = 0; z < depth; z++)
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = (z * height + y) * width + x,
        density = field[i];
      if (density < 0.002) continue;
      let optical = 0;
      for (const distance of [0.6, 1.3, 2.6, 4.8, 8, 12]) {
        optical +=
          sample(
            x + (distance * 0.42 * width) / extent[0],
            y + (distance * 0.86 * height) / extent[1],
            z + (distance * 0.29 * depth) / extent[2],
          ) *
          (distance * 0.4 + 0.3);
      }
      data[i * 4] = Math.round(density * 255);
      data[i * 4 + 1] = Math.round(Math.exp(-optical * 0.72) * 255);
      data[i * 4 + 2] = Math.round(Math.exp(-optical * 0.16) * 255);
      data[i * 4 + 3] = 255;
    }
await mkdir(new URL("../public/clouds/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/clouds/volume.rgba.gz", import.meta.url),
  gzipSync(data, { level: 9 }),
);
console.log(
  `Baked ${width} × ${height} × ${depth} cloud volume (${data.length} bytes).`,
);

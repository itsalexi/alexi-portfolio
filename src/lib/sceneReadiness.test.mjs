import assert from "node:assert/strict";
import test from "node:test";
import { beginSceneLoad, waitForSceneReady } from "./sceneReadiness.js";

test("waits when the preloader subscribes before the scene mounts", async () => {
  const waiting = waitForSceneReady("/");
  let completed = false;
  waiting.then(() => {
    completed = true;
  });
  await Promise.resolve();
  assert.equal(completed, false);
  const settle = beginSceneLoad("home");
  settle("ready");
  assert.deepEqual(await waiting, { status: "ready" });
});

test("keeps first-frame readiness for a later preloader subscriber", async () => {
  const settle = beginSceneLoad("moonlit");
  settle("ready");
  assert.deepEqual(await waitForSceneReady("/contact"), { status: "ready" });
});

test("an obsolete load cannot settle a newly mounted scene", async () => {
  const stale = beginSceneLoad("home");
  const current = beginSceneLoad("home");
  let completed = false;
  const waiting = waitForSceneReady("/").then((result) => {
    completed = true;
    return result;
  });
  stale("fallback");
  await Promise.resolve();
  assert.equal(completed, false);
  current("ready");
  assert.deepEqual(await waiting, { status: "ready" });
});

test("reports load failure immediately and settles each generation once", async () => {
  const settle = beginSceneLoad("moonlit");
  const waiting = waitForSceneReady("/about");
  settle("fallback");
  settle("ready");
  assert.deepEqual(await waiting, { status: "fallback" });
  assert.deepEqual(await waitForSceneReady("/projects"), {
    status: "fallback",
  });
});

test("aborting one subscriber does not cancel another or poison readiness", async () => {
  const settle = beginSceneLoad("home");
  const controller = new AbortController();
  const cancelled = waitForSceneReady("/", { signal: controller.signal });
  const waiting = waitForSceneReady("/");
  controller.abort();
  assert.deepEqual(await cancelled, { status: "fallback" });
  settle("ready");
  assert.deepEqual(await waiting, { status: "ready" });
  assert.deepEqual(await waitForSceneReady("/"), { status: "ready" });
});

test("an already aborted subscription resolves immediately", async () => {
  const controller = new AbortController();
  controller.abort();
  assert.deepEqual(
    await waitForSceneReady("/", { signal: controller.signal }),
    { status: "fallback" },
  );
});

test("admin routes do not wait for a decorative scene", async () => {
  assert.deepEqual(await waitForSceneReady("/admin/posts"), {
    status: "ready",
  });
});

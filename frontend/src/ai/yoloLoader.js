import * as ort from "onnxruntime-web";

const MODEL_URL = "/models/yolov8n.onnx";

let session = null;

export async function loadYOLO() {
  if (session) return session;

  ort.env.wasm.wasmPaths = "/ort-wasm/";
  ort.env.wasm.numThreads = 1;

const session = await ort.InferenceSession.create("/models/yolov8n.onnx", {
  executionProviders: ["wasm"],
  });

  return session;
}

export function getYOLOSession() {
  return session;
}
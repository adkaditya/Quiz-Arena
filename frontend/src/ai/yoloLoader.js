import * as ort from "onnxruntime-web";

const MODEL_URL = "/models/yolov8n.onnx";

let session = null;
let loadingPromise = null;

// ONNX Runtime configuration
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;

// Uncomment ONLY if your ort-wasm runtime files are correctly placed
// ort.env.wasm.wasmPaths = "/ort-wasm/";

export async function loadYOLO() {
  if (session) {
    return session;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      console.log("[YOLO] Loading model...");

      session = await ort.InferenceSession.create(MODEL_URL, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
        executionMode: "sequential",
      });

      console.log("[YOLO] Model loaded successfully.");
      console.log("[YOLO] Inputs:", session.inputNames);
      console.log("[YOLO] Outputs:", session.outputNames);

      return session;
    } catch (error) {
      console.error("[YOLO] Failed to load model:", error);
      session = null;
      throw error;
    } finally {
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}

export function getYOLOSession() {
  return session;
}

export async function disposeYOLO() {
  try {
    if (session && typeof session.release === "function") {
      await session.release();
    }
  } catch (error) {
    console.warn("[YOLO] Failed to dispose session:", error);
  } finally {
    session = null;
  }
}
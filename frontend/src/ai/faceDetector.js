import {
  FilesetResolver,
  FaceDetector,
} from "@mediapipe/tasks-vision";

let faceDetector = null;
let vision = null;
let loadingPromise = null;

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.task";

/**
 * Load Face Detector
 */
export const loadFaceDetector = async () => {
  if (faceDetector) return faceDetector;

  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_URL,
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.5,
      });

      console.log("✅ Face Detector Loaded");

      return faceDetector;
    } catch (error) {
      console.error("Face Detector Load Failed:", error);

      faceDetector = null;
      vision = null;
      loadingPromise = null;

      throw error;
    }
  })();

  return loadingPromise;
};

/**
 * Get Loaded Detector
 */
export const getFaceDetector = () => faceDetector;

/**
 * Detect Faces
 */
export const detectFaces = async (video) => {
  try {
    if (!faceDetector) {
      await loadFaceDetector();
    }

    if (
      !faceDetector ||
      !video ||
      video.readyState < 2 ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return {
        faceCount: 0,
        faces: [],
        multipleFaces: false,
      };
    }

    const result = faceDetector.detectForVideo(
      video,
      performance.now()
    );

    const faces = result?.detections || [];

    return {
      faceCount: faces.length,
      faces,
      multipleFaces: faces.length > 1,
    };
  } catch (error) {
    console.error("Face Detection Error:", error);

    return {
      faceCount: 0,
      faces: [],
      multipleFaces: false,
    };
  }
};

/**
 * Used by useCameraMonitoring.js
 */
export const checkFaceViolations = async (video) => {
  const result = await detectFaces(video);

  return {
    multipleFaces: result.multipleFaces,
    faceCount: result.faceCount,
  };
};

/**
 * Cleanup
 */
export const disposeFaceDetector = () => {
  try {
    faceDetector?.close?.();
  } catch (error) {
    console.error("Dispose Error:", error);
  } finally {
    faceDetector = null;
    vision = null;
    loadingPromise = null;
  }
};
import { useCallback, useEffect, useRef, useState } from "react";
import { loadYOLO } from "../ai/yoloLoader.js";
import { detectPhones } from "../ai/yoloDetector.js";

import {
  loadFaceDetector,
  checkFaceViolations,
} from "../ai/faceDetector.js";
const DETECTION_INTERVAL_MS = 900;
const REQUIRED_CONSECUTIVE_DETECTIONS = 2;
const VIOLATION_COOLDOWN_MS = 8000;

const useCameraMonitoring = ({ enabled, onViolation, activeStreamRef }) => {
  const streamRef = useRef(null);
  const videoNodeRef = useRef(null);
  const isProcessingRef = useRef(false);
  const modelLoadedRef = useRef(false);
const consecutivePhoneFramesRef = useRef(0);
 const lastPhoneViolationRef = useRef(0);
const lastFaceViolationRef = useRef(0);
const onViolationRef = useRef(onViolation);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  useEffect(() => {
    onViolationRef.current = onViolation;
  }, [onViolation]);

  useEffect(() => {
    let mounted = true;

    const loadModel = async () => {
      try {
       await Promise.all([
  loadYOLO(),
  loadFaceDetector(),
]);
        if (mounted) {
          modelLoadedRef.current = true;
        }
    } catch (error) {
 console.error("AI Models failed to load:", error);

  if (mounted) {
    modelLoadedRef.current = false;
  }
}
    };

    loadModel();

    return () => {
      mounted = false;
    };
  }, []);

  const videoRef = useCallback((node) => {
    videoNodeRef.current = node;

    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch((error) => {
  console.error("Video play failed:", error);
});
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  if (videoNodeRef.current) {
    videoNodeRef.current.srcObject = null;
  }

  consecutivePhoneFramesRef.current = 0;
  setCameraEnabled(false);
  return;
}

    const startCamera = async () => {
      if (activeStreamRef?.current) {
        streamRef.current = activeStreamRef.current;
        activeStreamRef.current = null;
      }

      if (!streamRef.current) {
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
     } catch (error) {
  console.error("Camera access failed:", error);
  onViolationRef.current?.("Camera Permission Denied");
  return;
}
      }

      const stream = streamRef.current;
      const track = stream.getVideoTracks()[0];

      if (track) {
        track.onended = () => {
          consecutivePhoneFramesRef.current = 0;
          setCameraEnabled(false);
          onViolationRef.current?.("Camera Turned Off");
        };
      }

      const node = videoNodeRef.current;
      if (node) {
        node.srcObject = stream;
        node.play().catch(() => {});
      }

      setCameraEnabled(true);
    };

    startCamera();
  }, [enabled, activeStreamRef]);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(async () => {
      if (isProcessingRef.current || !modelLoadedRef.current) return;

      const stream = streamRef.current;
      if (!stream) {
        consecutivePhoneFramesRef.current = 0;
        setCameraEnabled(false);
        return;
      }

      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack || videoTrack.readyState !== "live") {
        consecutivePhoneFramesRef.current = 0;
        setCameraEnabled(false);
        onViolationRef.current?.("Camera Turned Off");
        return;
      }

      setCameraEnabled(true);

      const node = videoNodeRef.current;
      if (!node) return;

      if (node.srcObject !== stream) {
        node.srcObject = stream;
      }

   if (node.paused) {
  await node.play().catch((error) => {
    console.error("Video play failed:", error);
  });
}

      if (
        node.readyState < 2 ||
        node.videoWidth <= 0 ||
        node.videoHeight <= 0 ||
        node.paused
      ) {
        return;
      }

      isProcessingRef.current = true;
      try {
        const phones = await detectPhones(node);
const face = await checkFaceViolations(node);

const now = Date.now();

// Multiple Face
if (
  face.multipleFaces &&
  now - lastFaceViolationRef.current >= VIOLATION_COOLDOWN_MS
) {
  lastFaceViolationRef.current = now;
  onViolationRef.current?.("Multiple Faces Detected");
}

// Mobile
if (phones.length > 0) {
  consecutivePhoneFramesRef.current++;
} else {
  consecutivePhoneFramesRef.current = 0;
}

const canReport =
  consecutivePhoneFramesRef.current >= REQUIRED_CONSECUTIVE_DETECTIONS &&
  now - lastPhoneViolationRef.current >= VIOLATION_COOLDOWN_MS;

if (canReport) {
  lastPhoneViolationRef.current = now;
  consecutivePhoneFramesRef.current = 0;
  onViolationRef.current?.("Mobile Phone Detected");
}
     } catch (error) {
  console.error("Phone detection failed:", error);
  consecutivePhoneFramesRef.current = 0;
}finally {
        isProcessingRef.current = false;
      }
    }, DETECTION_INTERVAL_MS);

   return () => {
  clearInterval(interval);
  isProcessingRef.current = false;
};
  }, [enabled]);

  return {
    videoRef,
    cameraEnabled,
  };
};

export default useCameraMonitoring;

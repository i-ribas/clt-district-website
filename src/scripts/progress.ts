type ProgressData = {
  containerId: string;
  segments: string[];
  filledCount: number;
};

function createProgressBar({
  containerId,
  segments,
  filledCount,
}: ProgressData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const bar = document.createElement("div");
  bar.className = "progress-bar";

  segments.forEach((label, index) => {
    const segment = document.createElement("div");
    segment.className = "segment" + (index < filledCount ? " filled" : "");
    segment.textContent = label;
    bar.appendChild(segment);
  });

  container.appendChild(bar);
}

// Example usage:
function generateSegments(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${prefix} ${i + 1}`);
}

document.addEventListener("DOMContentLoaded", () => {
  createProgressBar({
    containerId: "progress-limbus",
    segments: generateSegments("Canto", 8),
    filledCount: 4,
  });

  createProgressBar({
    containerId: "progress-leviathan",
    segments: generateSegments("Capítulo", 20),
    filledCount: 6,
  });

  createProgressBar({
    containerId: "progress-distortion",
    segments: generateSegments("Capítulo", 40),
    filledCount: 1,
  });
});

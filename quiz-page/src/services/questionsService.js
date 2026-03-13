import localQuestions from "../data/questions.js";

export async function fetchQuestions() {
  try {
    const response = await fetch("/api/questions", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    const json = await response.json();
    if (!Array.isArray(json)) {
      throw new Error("Invalid questions format");
    }

    return json;
  } catch (error) {
    // Fallback: use bundled questions when backend is not available.
    // When the backend is ready, remove this fallback.
    console.warn("fetchQuestions(): using local fallback questions", error);
    return localQuestions;
  }
}

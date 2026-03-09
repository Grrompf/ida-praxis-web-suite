

## Plan: Replace Prof. Dr. Pliquett's Portrait

Replace the current `src/assets/pliquett.jpg` with the uploaded image `RainerP.gif`.

### Steps
1. Copy `user-uploads://RainerP.gif` to `src/assets/pliquett.jpg` (overwrite the existing file). Since the import in `TeamSection.tsx` already references `@/assets/pliquett.jpg`, no code changes are needed — the new image will be picked up automatically.

Note: The uploaded file is a GIF but will be saved as `.jpg` to match existing imports. If this causes rendering issues, we'll rename to `.gif` and update the import.


/**
 * Curated demonstration photos for the FitZone exercise library.
 *
 * The photos come from the Free Exercise DB — an open, public-domain
 * (Unlicense) dataset of 800+ exercises, each shipped with a matching pair of
 * "start" and "end" demonstration photos:
 * https://github.com/yuhonas/free-exercise-db
 *
 * Every exercise id below points at the dataset folder that best demonstrates
 * that movement. The few exercises the dataset does not cover (burpees, high
 * knees, the kickboxing drills, ...) return an empty list here and fall back to
 * their own verified tutorial thumbnail in `components/ExerciseMedia`, so every
 * card still shows an image that matches the exercise.
 */

/** Dataset folder name for each exercise id. */
const datasetFolders: Record<string, string> = {
  "dumbbell-squats": "Dumbbell_Squat",
  "bicep-curls": "Dumbbell_Bicep_Curl",
  "shoulder-press": "Dumbbell_Shoulder_Press",
  "push-ups": "Pushups",
  "bodyweight-squats": "Bodyweight_Squat",
  plank: "Plank",
  "dumbbell-chest-press": "Dumbbell_Bench_Press",
  "dumbbell-flyes": "Dumbbell_Flyes",
  "incline-push-ups": "Incline_Push-Up",
  "wide-push-ups": "Push-Up_Wide",
  "dumbbell-floor-press": "Dumbbell_Floor_Press",
  "hammer-curls": "Hammer_Curls",
  "concentration-curls": "Concentration_Curls",
  "triceps-extensions": "Standing_Dumbbell_Triceps_Extension",
  "triceps-kickbacks": "Tricep_Dumbbell_Kickback",
  "diamond-push-ups": "Push-Ups_-_Close_Triceps_Position",
  "lateral-raises": "Side_Lateral_Raise",
  "front-raises": "Front_Dumbbell_Raise",
  "arnold-press": "Arnold_Dumbbell_Press",
  "reverse-flyes": "Reverse_Flyes",
  "reverse-lunges": "Crossover_Reverse_Lunge",
  "glute-bridges": "Butt_Lift_Bridge",
  "calf-raises": "Standing_Calf_Raises",
  "romanian-deadlifts": "Stiff-Legged_Dumbbell_Deadlift",
  crunches: "Crunches",
  "bicycle-crunches": "Cross-Body_Crunch",
  "dead-bug": "Dead_Bug",
  "mountain-climbers": "Mountain_Climbers",
  "leg-raises": "Flat_Bench_Lying_Leg_Raise",
  skaters: "Lateral_Bound",
  "barbell-squats": "Barbell_Squat",
  "barbell-bench-press": "Barbell_Bench_Press_-_Medium_Grip",
  "barbell-deadlift": "Barbell_Deadlift",
  "lat-pulldown": "Wide-Grip_Lat_Pulldown",
  "seated-cable-row": "Seated_Cable_Rows",
  "leg-press": "Leg_Press"
};

/**
 * CDNs that mirror the dataset. Both hosts are tried for each frame so a single
 * blocked or slow mirror never leaves a card without its photo.
 */
const imageHosts = [
  "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises",
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises"
];

/** The dataset stores a start and an end frame for every exercise. */
const frames = ["0.jpg", "1.jpg"];

/**
 * Ordered list of demonstration image URLs for an exercise. The first URL that
 * loads is used, so returning several candidates makes the card resilient to a
 * single broken image. Empty when the dataset has no matching exercise.
 */
export function getExerciseImages(exerciseId: string): string[] {
  const folder = datasetFolders[exerciseId];
  if (!folder) return [];

  const urls: string[] = [];
  for (const frame of frames) {
    for (const host of imageHosts) {
      urls.push(`${host}/${folder}/${frame}`);
    }
  }
  return urls;
}

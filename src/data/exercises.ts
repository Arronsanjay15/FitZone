import type {
  Equipment,
  Exercise,
  FitnessLevel,
  MuscleGroup
} from "../types";

/**
 * The full FitZone exercise library.
 *
 * `videoId` values point at a verified YouTube tutorial that demonstrates the
 * specific exercise (see `src/lib/video.ts`). Every entry also has a generated
 * YouTube search fallback so the "Watch video" feature always works.
 */
export const exercises: Exercise[] = [
  // ---------------------------------------------------------------
  // ORIGINAL EXERCISES
  // ---------------------------------------------------------------
  {
    id: "dumbbell-squats",
    name: "Dumbbell Squats",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "12 reps",
    description: "Build lower-body strength using dumbbells.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand with feet shoulder-width apart and dumbbells at your sides.",
      "Bend your knees and push your hips backward.",
      "Keep your chest lifted and heels on the floor.",
      "Stand up by pushing through your feet."
    ],
    tips: [
      "Keep your chest lifted and spine neutral throughout.",
      "Push through your whole foot, not just your toes."
    ],
    videoId: "v_c67Omje48"
  },
  {
    id: "bicep-curls",
    name: "Bicep Curls",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "12 reps",
    description: "Strengthen your biceps with controlled curls.",
    muscles: "Biceps and forearms",
    muscleGroups: ["Arms"],
    instructions: [
      "Stand tall with a dumbbell in each hand.",
      "Keep your elbows close to your body.",
      "Curl the weights toward your shoulders.",
      "Lower slowly without swinging your torso."
    ],
    tips: [
      "Keep your elbows pinned to your sides.",
      "Lower the weight slowly to build control."
    ],
    videoId: "XE_pHwbst04"
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps",
    description: "Build shoulder strength and pressing control.",
    muscles: "Shoulders and triceps",
    muscleGroups: ["Shoulders", "Arms"],
    instructions: [
      "Hold dumbbells at shoulder height.",
      "Brace your core and keep your back comfortable.",
      "Press the weights overhead under control.",
      "Lower the weights back to shoulder height."
    ],
    tips: [
      "Keep your wrists stacked over your elbows.",
      "Avoid arching your lower back as you press."
    ],
    videoId: "rO_iEImwHyo"
  },
  {
    id: "push-ups",
    name: "Push-Ups",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps",
    description: "A classic upper-body bodyweight exercise.",
    muscles: "Chest, shoulders, triceps and core",
    muscleGroups: ["Chest", "Shoulders", "Arms", "Core"],
    instructions: [
      "Place your hands slightly wider than your shoulders.",
      "Keep your body in a straight line.",
      "Lower your chest toward the floor.",
      "Push back up without letting your hips sag."
    ],
    tips: [
      "Keep a straight line from head to heels.",
      "Lower until your chest is just above the floor."
    ],
    videoId: "I9fsqKE5XHo"
  },
  {
    id: "bodyweight-squats",
    name: "Bodyweight Squats",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "15 reps",
    description: "Improve lower-body strength without equipment.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand with feet approximately shoulder-width apart.",
      "Push your hips back and bend your knees.",
      "Keep your heels planted and chest lifted.",
      "Return to standing with control."
    ],
    tips: [
      "Keep your heels planted on the floor.",
      "Stop before your lower back rounds."
    ],
    videoId: "Ul2idJKmpAc"
  },
  {
    id: "plank",
    name: "Plank",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "30 seconds",
    description: "Build core stability with an isometric hold.",
    muscles: "Abdominals, back and shoulders",
    muscleGroups: ["Core", "Shoulders"],
    instructions: [
      "Place your forearms on the floor with elbows under shoulders.",
      "Extend your legs and keep your body straight.",
      "Tighten your abdomen and breathe normally.",
      "Stop if you cannot maintain a comfortable, straight position."
    ],
    tips: [
      "Squeeze your glutes and brace your abs.",
      "Keep breathing steadily — don't hold your breath."
    ],
    videoId: "pvIjsG5Svck"
  },

  // ---------------------------------------------------------------
  // CHEST
  // ---------------------------------------------------------------
  {
    id: "dumbbell-chest-press",
    name: "Dumbbell Chest Press",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Build chest strength with a controlled pressing movement.",
    muscles: "Chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms"],
    instructions: [
      "Lie on a stable bench or the floor with a dumbbell in each hand.",
      "Keep your wrists straight and lower the weights toward your chest.",
      "Press the dumbbells upward with control.",
      "Lower slowly and repeat."
    ],
    tips: [
      "Keep your wrists straight over your elbows.",
      "Lower with control instead of letting the weights drop."
    ],
    videoId: "QsYre__-aro"
  },
  {
    id: "dumbbell-flyes",
    name: "Dumbbell Flyes",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the chest with a controlled fly movement.",
    muscles: "Chest and front shoulders",
    muscleGroups: ["Chest", "Shoulders"],
    instructions: [
      "Lie on a bench or the floor with light dumbbells above your chest.",
      "Keep a slight bend in your elbows.",
      "Open your arms slowly to a comfortable stretch.",
      "Bring the weights back together without bouncing."
    ],
    tips: [
      "Use light weights and a slight elbow bend.",
      "Stop at a comfortable stretch — never bounce."
    ],
    videoId: "QENKPHhQVi4"
  },
  {
    id: "incline-push-ups",
    name: "Incline Push-Ups",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "10–15 reps",
    description: "A beginner-friendly push-up variation.",
    muscles: "Chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms", "Core"],
    instructions: [
      "Place your hands on a sturdy elevated surface.",
      "Keep your body in a straight line.",
      "Bend your elbows and bring your chest toward the surface.",
      "Push back up while keeping your core engaged."
    ],
    tips: [
      "The higher the surface, the easier the push-up.",
      "Keep your hips from sagging."
    ],
    videoId: "cfns5VDVVvk"
  },
  {
    id: "wide-push-ups",
    name: "Wide Push-Ups",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "8–12 reps",
    description: "A push-up variation emphasizing the chest.",
    muscles: "Chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms", "Core"],
    instructions: [
      "Start in a high plank with hands slightly wider than shoulder width.",
      "Keep your body straight and brace your core.",
      "Lower your chest with control.",
      "Push up to return to the starting position."
    ],
    tips: [
      "Don't flare your elbows past 45 degrees.",
      "Keep your core tight to protect your lower back."
    ],
    videoId: "QwTW7DXBw5w"
  },
  {
    id: "knee-push-ups",
    name: "Knee Push-Ups",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "8–12 reps",
    description: "Practice push-up technique with reduced resistance.",
    muscles: "Chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms", "Core"],
    instructions: [
      "Start on your hands and knees with hands under your shoulders.",
      "Keep a straight line from your head to your knees.",
      "Lower your chest toward the floor under control.",
      "Push through your palms to return to the starting position."
    ],
    tips: [
      "Keep a straight line from head to knees.",
      "Lower your chest, not your head."
    ],
    videoId: "bwWlK8f1-NM"
  },
  {
    id: "dumbbell-floor-press",
    name: "Dumbbell Floor Press",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "8–12 reps",
    description: "A floor-based pressing exercise for chest and triceps.",
    muscles: "Chest, triceps and shoulders",
    muscleGroups: ["Chest", "Arms", "Shoulders"],
    instructions: [
      "Lie on the floor with a dumbbell in each hand.",
      "Keep your upper arms resting gently on the floor.",
      "Press the weights upward over your chest.",
      "Lower until your upper arms touch the floor again."
    ],
    tips: [
      "Pause briefly when your upper arms touch the floor.",
      "Keep your lower back relaxed on the floor."
    ],
    videoId: "Bx4QPVH-J1g"
  },

  // ---------------------------------------------------------------
  // ARMS
  // ---------------------------------------------------------------
  {
    id: "hammer-curls",
    name: "Hammer Curls",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Strengthen the biceps and forearms.",
    muscles: "Biceps and forearms",
    muscleGroups: ["Arms"],
    instructions: [
      "Stand tall holding dumbbells with palms facing inward.",
      "Keep your elbows close to your sides.",
      "Curl the weights toward your shoulders without swinging.",
      "Lower the weights slowly."
    ],
    tips: [
      "Keep your palms facing inward throughout.",
      "Avoid swinging your torso to lift."
    ],
    videoId: "BRVDS6HVR9Q"
  },
  {
    id: "concentration-curls",
    name: "Concentration Curls",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps per arm",
    description: "Focus on controlled single-arm biceps training.",
    muscles: "Biceps",
    muscleGroups: ["Arms"],
    instructions: [
      "Sit securely and hold a dumbbell in one hand.",
      "Rest your upper arm against the inside of your thigh.",
      "Curl the dumbbell toward your shoulder.",
      "Lower slowly, then switch arms."
    ],
    tips: [
      "Brace your upper arm against your thigh.",
      "Squeeze at the top and lower slowly."
    ],
    videoId: "Jvj2wV0vOYU"
  },
  {
    id: "triceps-extensions",
    name: "Dumbbell Triceps Extensions",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the back of the upper arms.",
    muscles: "Triceps",
    muscleGroups: ["Arms", "Shoulders"],
    instructions: [
      "Hold one light dumbbell securely with both hands overhead.",
      "Keep your elbows pointing forward and close to your head.",
      "Bend your elbows to lower the weight behind your head.",
      "Extend your arms slowly without arching your back."
    ],
    tips: [
      "Keep your elbows close to your head.",
      "Move only at the elbow — not the shoulders."
    ],
    videoId: "-Vyt2QdsR7E"
  },
  {
    id: "triceps-kickbacks",
    name: "Triceps Kickbacks",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps per arm",
    description: "Isolate the triceps using controlled extensions.",
    muscles: "Triceps",
    muscleGroups: ["Arms"],
    instructions: [
      "Hold a dumbbell and hinge forward with a flat back.",
      "Keep your upper arm close to your torso.",
      "Straighten your elbow to move the dumbbell backward.",
      "Return slowly and repeat before switching arms."
    ],
    tips: [
      "Keep your upper arm still and parallel to your torso.",
      "Extend fully and squeeze the triceps."
    ],
    videoId: "ZO81bExngMI"
  },
  {
    id: "diamond-push-ups",
    name: "Diamond Push-Ups",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "6–10 reps",
    description: "A challenging push-up emphasizing the triceps.",
    muscles: "Triceps, chest and shoulders",
    muscleGroups: ["Arms", "Chest", "Shoulders", "Core"],
    instructions: [
      "Start in a high plank with hands close together beneath your chest.",
      "Keep your body straight and brace your abdomen.",
      "Bend your elbows and lower with control.",
      "Push back up, or use knee push-ups for an easier variation."
    ],
    tips: [
      "Keep your hands under your chest, not your face.",
      "Use knee push-ups if your form breaks down."
    ],
    videoId: "J0DnG1_S92I"
  },

  // ---------------------------------------------------------------
  // SHOULDERS
  // ---------------------------------------------------------------
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Build shoulder strength with a controlled side raise.",
    muscles: "Side shoulders",
    muscleGroups: ["Shoulders"],
    instructions: [
      "Stand with light dumbbells by your sides.",
      "Keep a slight bend in your elbows.",
      "Raise your arms outward to a comfortable height.",
      "Lower slowly without swinging your body."
    ],
    tips: [
      "Lead with your elbows, not your hands.",
      "Raise only to shoulder height."
    ],
    videoId: "pgrWjBfaFe8"
  },
  {
    id: "front-raises",
    name: "Front Raises",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the front of the shoulders.",
    muscles: "Front shoulders",
    muscleGroups: ["Shoulders"],
    instructions: [
      "Stand tall with dumbbells in front of your thighs.",
      "Keep your elbows slightly bent.",
      "Raise the weights in front of you to about shoulder height.",
      "Lower with control and avoid leaning backward."
    ],
    tips: [
      "Keep a slight bend in your elbows.",
      "Avoid using momentum to swing the weight up."
    ],
    videoId: "CH9JzDStL3U"
  },
  {
    id: "arnold-press",
    name: "Arnold Press",
    category: "Dumbbell",
    level: "Advanced",
    sets: 3,
    reps: "8–10 reps",
    description: "A rotational shoulder press variation.",
    muscles: "Shoulders and triceps",
    muscleGroups: ["Shoulders", "Arms"],
    instructions: [
      "Hold dumbbells in front of your shoulders with palms facing you.",
      "Press upward while rotating your palms forward.",
      "Keep your core engaged and avoid arching your back.",
      "Reverse the rotation as you lower the weights."
    ],
    tips: [
      "Rotate smoothly without shrugging.",
      "Keep your core braced to protect your back."
    ],
    videoId: "ris9tKqMwgU"
  },
  {
    id: "pike-push-ups",
    name: "Pike Push-Ups",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "6–10 reps",
    description: "Use bodyweight to challenge the shoulders.",
    muscles: "Shoulders, triceps and core",
    muscleGroups: ["Shoulders", "Arms", "Core"],
    instructions: [
      "Start in a downward-facing V position with hips raised.",
      "Keep your hands shoulder-width apart.",
      "Bend your elbows and lower your head toward the floor.",
      "Push back up while maintaining control."
    ],
    tips: [
      "Keep your hips high throughout.",
      "Lower your head between your hands, not forward."
    ],
    videoId: "fXgou2W10ok"
  },
  {
    id: "reverse-flyes",
    name: "Reverse Flyes",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps",
    description: "Strengthen the rear shoulders and upper back.",
    muscles: "Rear shoulders and upper back",
    muscleGroups: ["Shoulders", "Back"],
    instructions: [
      "Hold light dumbbells and hinge forward with a flat back.",
      "Let the weights hang beneath your shoulders.",
      "Raise your arms outward while gently squeezing your shoulder blades.",
      "Lower slowly without jerking."
    ],
    tips: [
      "Keep a flat back and soft elbows.",
      "Squeeze your shoulder blades at the top."
    ],
    videoId: "3MKmYlhxgOo"
  },

  // ---------------------------------------------------------------
  // LEGS
  // ---------------------------------------------------------------
  {
    id: "reverse-lunges",
    name: "Reverse Lunges",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "10 reps per leg",
    description: "Improve single-leg strength and balance.",
    muscles: "Quads, glutes and hamstrings",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand tall with feet about hip-width apart.",
      "Step one foot backward and lower both knees comfortably.",
      "Keep your front foot planted and torso upright.",
      "Push through the front foot to stand and switch sides."
    ],
    tips: [
      "Keep your front knee over your ankle.",
      "Hold a wall for balance if needed."
    ],
    videoId: "Ry-wqegeKlE"
  },
  {
    id: "glute-bridges",
    name: "Glute Bridges",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Strengthen the glutes and posterior chain.",
    muscles: "Glutes and hamstrings",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Lie on your back with knees bent and feet flat on the floor.",
      "Keep your arms relaxed beside you.",
      "Lift your hips by squeezing your glutes.",
      "Pause without over-arching your back, then lower."
    ],
    tips: [
      "Squeeze your glutes at the top, not your lower back.",
      "Keep your chin tucked and ribs down."
    ],
    videoId: "wPM8icPu6H8"
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "15–20 reps",
    description: "Strengthen the calf muscles and ankle control.",
    muscles: "Calves",
    muscleGroups: ["Legs"],
    instructions: [
      "Stand tall near a sturdy support for balance.",
      "Keep your feet about hip-width apart.",
      "Rise onto the balls of your feet.",
      "Pause briefly and lower your heels slowly."
    ],
    tips: [
      "Move slowly through a full range of motion.",
      "Hold a support for balance to stay safe."
    ],
    videoId: "k8ipHzKeAkQ"
  },
  {
    id: "romanian-deadlifts",
    name: "Dumbbell Romanian Deadlifts",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the hamstrings and glutes with a hip hinge.",
    muscles: "Hamstrings, glutes and back stabilizers",
    muscleGroups: ["Legs", "Back", "Core"],
    instructions: [
      "Stand with dumbbells in front of your thighs and knees slightly bent.",
      "Push your hips backward while keeping your back neutral.",
      "Lower the dumbbells close to your legs.",
      "Drive your hips forward to stand tall."
    ],
    tips: [
      "Keep the weights close to your legs.",
      "Hinge at the hips, not the lower back."
    ],
    videoId: "hQgFixeXdZo"
  },
  {
    id: "wall-sit",
    name: "Wall Sit",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "20–45 seconds",
    description: "Build leg endurance with an isometric hold.",
    muscles: "Quads and glutes",
    muscleGroups: ["Legs"],
    instructions: [
      "Stand with your back against a wall.",
      "Slide down until your knees are comfortably bent.",
      "Keep your feet flat and knees aligned with your feet.",
      "Hold while breathing steadily, then stand up."
    ],
    tips: [
      "Keep your knees above your ankles.",
      "Breathe steadily and stop if your knees hurt."
    ],
    videoId: "cWTZ8Am1Ee0"
  },

  // ---------------------------------------------------------------
  // CORE
  // ---------------------------------------------------------------
  {
    id: "crunches",
    name: "Crunches",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Train the abdominal muscles with a controlled curl.",
    muscles: "Abdominals",
    muscleGroups: ["Core"],
    instructions: [
      "Lie on your back with knees bent and feet flat.",
      "Place your hands lightly beside your head or across your chest.",
      "Lift your shoulders slightly by tightening your abdomen.",
      "Lower slowly without pulling on your neck."
    ],
    tips: [
      "Support your head lightly — don't pull your neck.",
      "Lift with your abs, not momentum."
    ],
    videoId: "9T4WQGlKCRk"
  },
  {
    id: "bicycle-crunches",
    name: "Bicycle Crunches",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "12 reps per side",
    description: "Challenge the abdominals with alternating rotation.",
    muscles: "Abdominals and obliques",
    muscleGroups: ["Core"],
    instructions: [
      "Lie on your back and lift your knees into a tabletop position.",
      "Lift your shoulders gently off the floor.",
      "Rotate your torso toward the opposite knee.",
      "Alternate sides slowly without pulling your neck."
    ],
    tips: [
      "Rotate from your torso, not your elbows.",
      "Keep your lower back gently pressed down."
    ],
    videoId: "eqg47ZuGZXQ"
  },
  {
    id: "dead-bug",
    name: "Dead Bug",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "8–10 reps per side",
    description: "Build core stability while controlling opposite limbs.",
    muscles: "Deep core and abdominals",
    muscleGroups: ["Core"],
    instructions: [
      "Lie on your back with arms raised and knees bent.",
      "Brace your abdomen and keep your lower back comfortably supported.",
      "Extend one arm and the opposite leg slowly.",
      "Return to the start and alternate sides."
    ],
    tips: [
      "Keep your lower back flat on the floor.",
      "Move slowly and coordinate opposite limbs."
    ],
    videoId: "o4GKiEoYClI"
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "20–30 total reps",
    description: "Combine core stability with a cardio challenge.",
    muscles: "Core, shoulders and hip flexors",
    muscleGroups: ["Core", "Shoulders"],
    instructions: [
      "Start in a high plank with hands beneath your shoulders.",
      "Keep your body stable and brace your core.",
      "Bring one knee toward your chest.",
      "Alternate legs without letting your hips bounce."
    ],
    tips: [
      "Keep your hips low and stable.",
      "Start slow and build up your pace."
    ],
    videoId: "cnyTQDSE884"
  },
  {
    id: "leg-raises",
    name: "Lying Leg Raises",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "8–12 reps",
    description: "Train the abdominals and hip flexors.",
    muscles: "Abdominals and hip flexors",
    muscleGroups: ["Core"],
    instructions: [
      "Lie on your back with legs extended.",
      "Keep your lower back comfortably supported against the floor.",
      "Raise your legs without swinging.",
      "Lower slowly; bend your knees for an easier variation."
    ],
    tips: [
      "Keep your lower back pressed to the floor.",
      "Bend your knees to make it easier."
    ],
    videoId: "xJJu-WiROM8"
  },

  // ---------------------------------------------------------------
  // CARDIO AND FULL BODY
  // ---------------------------------------------------------------
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "30 seconds",
    description: "A simple full-body warm-up and cardio movement.",
    muscles: "Legs, shoulders and cardiovascular system",
    muscleGroups: ["Legs", "Shoulders", "Core"],
    instructions: [
      "Stand upright with feet together and arms by your sides.",
      "Jump your feet apart while raising your arms overhead.",
      "Jump back to the starting position.",
      "Use a step-out version for lower impact."
    ],
    tips: [
      "Land softly with bent knees.",
      "Step out instead of jumping for lower impact."
    ],
    videoId: "yg3KQQn3QWg"
  },
  {
    id: "high-knees",
    name: "High Knees",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "30 seconds",
    description: "Raise your heart rate with alternating knee drives.",
    muscles: "Legs, hip flexors and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand tall with your feet hip-width apart.",
      "Lift one knee toward hip height while moving your opposite arm.",
      "Switch sides in a controlled rhythm.",
      "March instead of running for lower impact."
    ],
    tips: [
      "Stay tall and light on your feet.",
      "March in place if you need lower impact."
    ],
    videoId: "FvjmPRU3zn4"
  },
  {
    id: "burpees",
    name: "Burpees",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "6–10 reps",
    description: "A challenging full-body conditioning exercise.",
    muscles: "Chest, shoulders, legs and core",
    muscleGroups: ["Chest", "Shoulders", "Legs", "Core", "Arms"],
    instructions: [
      "Stand upright and squat down, placing your hands on the floor.",
      "Step or jump your feet back into a plank.",
      "Step or jump your feet forward to return to a squat.",
      "Stand up; add a jump only if comfortable."
    ],
    tips: [
      "Step back instead of jumping to reduce impact.",
      "Keep your core braced in the plank."
    ],
    videoId: "G2hv_NYhM-A"
  },
  {
    id: "skaters",
    name: "Skaters",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps per side",
    description: "Build lateral movement, balance and conditioning.",
    muscles: "Glutes, quads and calves",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand with knees slightly bent and feet hip-width apart.",
      "Step or hop sideways onto one foot.",
      "Bring the other leg behind you while maintaining balance.",
      "Move to the opposite side, using step-outs if needed."
    ],
    tips: [
      "Keep your knees bent and land softly.",
      "Use controlled steps if balance is a challenge."
    ],
    videoId: "9_jLW6VkU8A"
  },

  // ---------------------------------------------------------------
  // KICKBOXING
  // ---------------------------------------------------------------
  {
    id: "jab-cross",
    name: "Jab and Cross",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "1 minute",
    description: "Learn the fundamental one-two punch combination.",
    muscles: "Shoulders, arms and core",
    muscleGroups: ["Shoulders", "Arms", "Core"],
    instructions: [
      "Stand in a relaxed fighting stance with hands up near your chin.",
      "Extend your lead hand straight forward for the jab.",
      "Quickly bring it back and extend your rear hand for the cross.",
      "Rotate your hips and rear foot slightly with the cross."
    ],
    tips: [
      "Keep your chin tucked behind your hands.",
      "Snap your punches back quickly to stay protected."
    ],
    videoId: "vyTaKpylOcU"
  },
  {
    id: "hooks",
    name: "Hooks",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "1 minute",
    description: "Throw strong, compact hooks to the side of the target.",
    muscles: "Shoulders, arms and core",
    muscleGroups: ["Shoulders", "Arms", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Bend your lead arm to about 90 degrees.",
      "Rotate your hips and torso to swing the hook across.",
      "Return your hand to your chin immediately."
    ],
    tips: [
      "Keep your elbow at shoulder height.",
      "Generate power from your hips, not just your arm."
    ],
    videoId: "0gtMKaCJ5I8"
  },
  {
    id: "uppercuts",
    name: "Uppercuts",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "1 minute",
    description: "Drive upward punches to build power and coordination.",
    muscles: "Shoulders, arms and core",
    muscleGroups: ["Shoulders", "Arms", "Core"],
    instructions: [
      "Take your fighting stance with hands up.",
      "Drop your shoulder slightly and bend your elbow.",
      "Drive your fist upward while rotating your hips.",
      "Return to your guard and alternate hands."
    ],
    tips: [
      "Bend your knees to load the punch.",
      "Keep the movement controlled to protect your shoulder."
    ],
    videoId: "eBxn21FtqPg"
  },
  {
    id: "front-kick",
    name: "Front Kick",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "8 reps per leg",
    description: "A straight push kick that builds balance and leg power.",
    muscles: "Quads, glutes, core and hip flexors",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand with feet staggered and hands up in guard.",
      "Lift your rear knee toward your chest.",
      "Extend your leg forward and push through the ball of your foot.",
      "Retract your leg and return to your stance."
    ],
    tips: [
      "Keep your guard up while kicking.",
      "Kick at a comfortable height to protect your hip."
    ],
    videoId: "_oZ9_3FFnZs"
  },
  {
    id: "roundhouse-kick",
    name: "Roundhouse Kick",
    category: "Kickboxing",
    level: "Intermediate",
    sets: 3,
    reps: "6–8 reps per leg",
    description: "A powerful circular kick driven by hip rotation.",
    muscles: "Glutes, quads, core and obliques",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Pivot your supporting foot and turn your hips over.",
      "Swing your leg in a horizontal arc, striking with the shin.",
      "Rotate back to your stance under control."
    ],
    tips: [
      "Turn your supporting foot to protect your knee.",
      "Build power slowly before adding speed."
    ],
    videoId: "Bp_QVO7kYtg"
  },
  {
    id: "knee-strikes",
    name: "Knee Strikes",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "10 reps per leg",
    description: "Drive your knee upward for a close-range strike.",
    muscles: "Core, hip flexors, glutes and quads",
    muscleGroups: ["Core", "Legs"],
    instructions: [
      "Stand tall in your fighting stance with hands up.",
      "Pull your imaginary guard down with both hands.",
      "Drive one knee upward and forward.",
      "Lower your leg and alternate sides."
    ],
    tips: [
      "Keep your core braced as you strike.",
      "Keep your supporting knee slightly bent for balance."
    ],
    videoId: "AVU2NZd-H2Q"
  },

  // ---------------------------------------------------------------
  // GYM
  // ---------------------------------------------------------------
  {
    id: "barbell-squats",
    name: "Barbell Back Squat",
    category: "Gym",
    level: "Intermediate",
    sets: 4,
    reps: "8–10 reps",
    description: "The classic barbell lift for total lower-body strength.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Set the bar comfortably across your upper back and grip it firmly.",
      "Stand with feet shoulder-width apart and brace your core.",
      "Push your hips back and bend your knees to squat down.",
      "Drive through your feet to stand back up."
    ],
    tips: [
      "Keep your chest up and back neutral.",
      "Use a spotter or a safety rack when lifting heavy."
    ],
    videoId: "9PV96eMj_m4"
  },
  {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    category: "Gym",
    level: "Intermediate",
    sets: 4,
    reps: "8–10 reps",
    description: "Build chest, shoulder and triceps strength with a barbell.",
    muscles: "Chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms"],
    instructions: [
      "Lie on the bench with your eyes under the bar and feet flat.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar to your mid-chest with control.",
      "Press the bar back up over your shoulders."
    ],
    tips: [
      "Keep your wrists stacked over your elbows.",
      "Always use a spotter or safety pins."
    ],
    videoId: "4Y2ZdHCOXok"
  },
  {
    id: "barbell-deadlift",
    name: "Barbell Deadlift",
    category: "Gym",
    level: "Advanced",
    sets: 4,
    reps: "5–8 reps",
    description: "A full-body lift that trains the back, glutes and legs.",
    muscles: "Back, glutes, hamstrings and core",
    muscleGroups: ["Back", "Legs", "Core"],
    instructions: [
      "Stand with the bar over your mid-foot and hinge down to grip it.",
      "Brace your core and keep your back neutral.",
      "Drive through your legs to stand, keeping the bar close.",
      "Hinge at the hips to lower the bar under control."
    ],
    tips: [
      "Keep the bar close to your legs at all times.",
      "Never round your lower back — reduce the weight if needed."
    ],
    videoId: "r4MzxtBKyNE"
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the back and biceps with a guided pulling motion.",
    muscles: "Back, biceps and shoulders",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Sit with your thighs secured under the pads.",
      "Grip the bar wider than shoulder width.",
      "Pull the bar down toward your upper chest.",
      "Control the bar back up without shrugging."
    ],
    tips: [
      "Lead with your elbows, not your hands.",
      "Avoid leaning back excessively."
    ],
    videoId: "SALxEARiMkw"
  },
  {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Strengthen the mid-back and arms with a horizontal pull.",
    muscles: "Back, biceps and rear shoulders",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Sit tall with your feet braced and knees slightly bent.",
      "Hold the handle with your arms extended.",
      "Pull the handle toward your midsection, squeezing your shoulder blades.",
      "Extend your arms slowly to return."
    ],
    tips: [
      "Keep your back straight, not rounded.",
      "Avoid using momentum to yank the handle."
    ],
    videoId: "vwHG9Jfu4sw"
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "10–15 reps",
    description: "Build leg strength safely with a supported pressing motion.",
    muscles: "Quads, glutes and hamstrings",
    muscleGroups: ["Legs"],
    instructions: [
      "Sit in the machine with your back and hips against the pad.",
      "Place your feet shoulder-width apart on the platform.",
      "Press the platform away without locking your knees.",
      "Bend your knees to lower the weight under control."
    ],
    tips: [
      "Never lock your knees at the top.",
      "Keep your lower back pressed against the pad."
    ],
    videoId: "ETOAyWM6i6A"
  },

  // ---------------------------------------------------------------
  // BEGINNER ADDITIONS
  // ---------------------------------------------------------------
  {
    id: "goblet-squats",
    name: "Goblet Squats",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Learn the squat pattern with a single dumbbell held at your chest.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Hold one dumbbell vertically against your chest with both hands.",
      "Stand with your feet shoulder-width apart.",
      "Bend your knees and sit down between your hips.",
      "Push through your feet to stand back up."
    ],
    tips: [
      "Keep the dumbbell tight to your chest so you stay upright.",
      "Squat only as deep as you can keep your heels down."
    ]
  },
  {
    id: "dumbbell-shrugs",
    name: "Dumbbell Shrugs",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Build the upper back and traps with a simple shoulder shrug.",
    muscles: "Traps and upper back",
    muscleGroups: ["Back", "Shoulders"],
    instructions: [
      "Stand tall with a dumbbell in each hand at your sides.",
      "Keep your arms straight and your shoulders relaxed.",
      "Lift your shoulders straight up toward your ears.",
      "Pause briefly, then lower with control."
    ],
    tips: [
      "Shrug straight up — don't roll your shoulders.",
      "Avoid bending your elbows or swinging the weights."
    ]
  },
  {
    id: "superman-hold",
    name: "Superman Hold",
    category: "Bodyweight",
    level: "Beginner",
    sets: 3,
    reps: "20–30 seconds",
    description: "Strengthen the lower back and glutes with an isometric hold.",
    muscles: "Lower back, glutes and shoulders",
    muscleGroups: ["Back", "Core"],
    instructions: [
      "Lie face down with your arms extended in front of you.",
      "Keep your neck in a comfortable, neutral position.",
      "Lift your arms, chest and legs slightly off the floor.",
      "Hold, then lower everything slowly."
    ],
    tips: [
      "Lift only as high as feels comfortable for your lower back.",
      "Keep breathing steadily throughout the hold."
    ]
  },
  {
    id: "leg-extensions",
    name: "Leg Extensions",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Isolate the quads with a guided machine movement.",
    muscles: "Quadriceps",
    muscleGroups: ["Legs"],
    instructions: [
      "Sit in the machine with your knees aligned to the pivot.",
      "Tuck the pad comfortably over your shins.",
      "Extend your knees until your legs are straight.",
      "Lower the weight under control."
    ],
    tips: [
      "Don't slam the weight down between reps.",
      "Keep your hips planted against the seat."
    ]
  },
  {
    id: "lying-leg-curls",
    name: "Lying Leg Curls",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "10–12 reps",
    description: "Train the hamstrings with a supported curling motion.",
    muscles: "Hamstrings",
    muscleGroups: ["Legs"],
    instructions: [
      "Lie face down with the pad resting above your heels.",
      "Hold the handles and keep your hips down.",
      "Curl your heels toward your glutes.",
      "Lower slowly without letting the weight drop."
    ],
    tips: [
      "Keep your hips pressed into the bench.",
      "Squeeze your hamstrings at the top of each rep."
    ]
  },
  {
    id: "face-pulls",
    name: "Face Pulls",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "12–15 reps",
    description: "Strengthen the rear shoulders and upper back for healthy posture.",
    muscles: "Rear shoulders and upper back",
    muscleGroups: ["Shoulders", "Back"],
    instructions: [
      "Set a rope attachment at about eye height.",
      "Grip the rope with your palms facing in and step back.",
      "Pull the rope toward your face, leading with your elbows.",
      "Squeeze your shoulder blades, then extend your arms."
    ],
    tips: [
      "Keep your elbows high and in line with your shoulders.",
      "Use light weight and focus on the squeeze."
    ]
  },
  {
    id: "body-kicks",
    name: "Body Kicks",
    category: "Kickboxing",
    level: "Beginner",
    sets: 3,
    reps: "8 reps per leg",
    description: "Practice a controlled mid-level kick for balance and power.",
    muscles: "Glutes, quads, obliques and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Start in your fighting stance with hands up in guard.",
      "Lift your rear knee and turn your hip over.",
      "Extend your leg to a comfortable mid height.",
      "Retract your leg and return to your stance."
    ],
    tips: [
      "Turn your supporting foot as you kick to protect your knee.",
      "Kick at a height you can control with good balance."
    ],
    videoId: "S2I5O92wXpI"
  },

  // ---------------------------------------------------------------
  // INTERMEDIATE ADDITIONS
  // ---------------------------------------------------------------
  {
    id: "dumbbell-lunges",
    name: "Dumbbell Lunges",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps per leg",
    description: "Build single-leg strength and balance while holding dumbbells.",
    muscles: "Quads, glutes and hamstrings",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand tall with a dumbbell in each hand at your sides.",
      "Step forward and lower both knees to about 90 degrees.",
      "Keep your torso upright and front knee over your ankle.",
      "Push through your front foot to return and switch legs."
    ],
    tips: [
      "Take a long enough step so your front knee stays over your ankle.",
      "Keep your core braced to stay balanced."
    ]
  },
  {
    id: "bent-over-rows",
    name: "Bent-Over Rows",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10–12 reps",
    description: "Build the mid-back and biceps with a horizontal pulling motion.",
    muscles: "Mid-back, lats and biceps",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Hold a dumbbell in each hand and hinge forward with a flat back.",
      "Let your arms hang beneath your shoulders.",
      "Pull the weights toward your ribs, squeezing your shoulder blades.",
      "Lower the weights slowly with control."
    ],
    tips: [
      "Keep your back flat and neck neutral.",
      "Lead with your elbows instead of your hands."
    ]
  },
  {
    id: "dumbbell-step-ups",
    name: "Dumbbell Step-Ups",
    category: "Dumbbell",
    level: "Intermediate",
    sets: 3,
    reps: "10 reps per leg",
    description: "Develop single-leg strength and stability on a step or bench.",
    muscles: "Quads, glutes and hamstrings",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Hold a dumbbell in each hand and stand facing a stable step.",
      "Place one whole foot on the step.",
      "Drive through that foot to stand up onto the step.",
      "Lower back down slowly and switch legs."
    ],
    tips: [
      "Use a step height you can control safely.",
      "Avoid pushing off the bottom leg too much."
    ]
  },
  {
    id: "side-plank",
    name: "Side Plank",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "20–40 seconds per side",
    description: "Build lateral core strength and stability.",
    muscles: "Obliques, deep core and shoulders",
    muscleGroups: ["Core", "Shoulders"],
    instructions: [
      "Lie on your side with your elbow under your shoulder.",
      "Stack your feet and keep your body in a straight line.",
      "Lift your hips so your body forms a straight line from head to feet.",
      "Hold, then lower and switch sides."
    ],
    tips: [
      "Drop to your knee to make the hold easier.",
      "Keep your hips lifted and stacked, not rolled forward."
    ]
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "20 reps",
    description: "Train the obliques with a controlled rotational movement.",
    muscles: "Obliques and abdominals",
    muscleGroups: ["Core"],
    instructions: [
      "Sit on the floor with your knees bent and heels down.",
      "Lean back slightly and keep your chest lifted.",
      "Rotate your torso to tap the floor beside one hip.",
      "Rotate to the other side, counting each tap as a rep."
    ],
    tips: [
      "Rotate from your torso, not just your arms.",
      "Keep your back straight instead of rounding it."
    ]
  },
  {
    id: "jump-squats",
    name: "Jump Squats",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "10–15 reps",
    description: "Add power and conditioning to the squat pattern.",
    muscles: "Quads, glutes and calves",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Lower into a comfortable squat.",
      "Drive through your feet and jump up.",
      "Land softly with bent knees and repeat."
    ],
    tips: [
      "Land softly and absorb the impact with your legs.",
      "Keep your chest lifted and knees tracking over your toes."
    ]
  },
  {
    id: "inverted-rows",
    name: "Inverted Rows",
    category: "Bodyweight",
    level: "Intermediate",
    sets: 3,
    reps: "8–12 reps",
    description: "Build the upper back and arms using a low bar or table.",
    muscles: "Mid-back, lats and biceps",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Set a sturdy bar at about waist height and lie underneath it.",
      "Grip the bar slightly wider than shoulder width.",
      "Pull your chest up toward the bar, squeezing your shoulder blades.",
      "Lower yourself slowly with control."
    ],
    tips: [
      "Keep your body straight from head to heels.",
      "Bend your knees to make the row easier."
    ]
  },
  {
    id: "switch-kicks",
    name: "Switch Kicks",
    category: "Kickboxing",
    level: "Intermediate",
    sets: 3,
    reps: "8 reps per leg",
    description: "Swap stance quickly while throwing a controlled kick.",
    muscles: "Glutes, quads, obliques and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Switch your feet quickly to change stance.",
      "Throw a controlled kick from the new stance.",
      "Return to your guard and keep switching."
    ],
    tips: [
      "Stay light on your feet and land softly.",
      "Keep your guard up between kicks."
    ],
    videoId: "D36W9_k9vIs"
  },
  {
    id: "jab-cross-hook",
    name: "Jab, Cross, Hook Combo",
    category: "Kickboxing",
    level: "Intermediate",
    sets: 3,
    reps: "1 minute",
    description: "Link the three fundamental punches into a smooth combination.",
    muscles: "Shoulders, arms and core",
    muscleGroups: ["Shoulders", "Arms", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Throw the jab, then the cross, rotating your hips.",
      "Follow with a hook from your lead hand.",
      "Reset your guard and repeat."
    ],
    tips: [
      "Return each hand to your chin after every punch.",
      "Rotate your hips to add power to the cross and hook."
    ],
    videoId: "MfqAtf_VGMY"
  },
  {
    id: "barbell-overhead-press",
    name: "Barbell Overhead Press",
    category: "Gym",
    level: "Intermediate",
    sets: 4,
    reps: "8–10 reps",
    description: "Build shoulder and triceps strength with a standing press.",
    muscles: "Shoulders, triceps and upper chest",
    muscleGroups: ["Shoulders", "Arms"],
    instructions: [
      "Set the bar at collarbone height and grip it just outside your shoulders.",
      "Brace your core and unrack the bar at your upper chest.",
      "Press the bar overhead until your arms are straight.",
      "Lower the bar back to your chest with control."
    ],
    tips: [
      "Keep your ribs down and avoid leaning back.",
      "Move your head slightly back so the bar travels straight."
    ]
  },
  {
    id: "barbell-bent-over-rows",
    name: "Barbell Bent-Over Row",
    category: "Gym",
    level: "Intermediate",
    sets: 4,
    reps: "8–10 reps",
    description: "Build back thickness and strength with a barbell pull.",
    muscles: "Mid-back, lats and biceps",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Hinge forward at the hips with a flat back and knees slightly bent.",
      "Grip the bar just outside your knees.",
      "Pull the bar toward your lower ribs.",
      "Lower the bar with control without rounding your back."
    ],
    tips: [
      "Keep your back flat and core braced throughout.",
      "Don't jerk the bar with your lower back."
    ]
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "Gym",
    level: "Intermediate",
    sets: 4,
    reps: "8–10 reps",
    description: "Emphasize the upper chest with an inclined barbell press.",
    muscles: "Upper chest, front shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms"],
    instructions: [
      "Set the bench to a low incline and lie back with feet flat.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar to your upper chest with control.",
      "Press the bar back up over your shoulders."
    ],
    tips: [
      "Use a low incline to keep the work on your chest.",
      "Always use a spotter or safety pins."
    ]
  },

  // ---------------------------------------------------------------
  // ADVANCED ADDITIONS
  // ---------------------------------------------------------------
  {
    id: "renegade-rows",
    name: "Renegade Rows",
    category: "Dumbbell",
    level: "Advanced",
    sets: 3,
    reps: "8 reps per arm",
    description: "A demanding plank-based row that challenges your whole core.",
    muscles: "Mid-back, lats and core",
    muscleGroups: ["Back", "Core", "Arms"],
    instructions: [
      "Start in a high plank with a dumbbell under each hand.",
      "Set your feet wide for stability and brace your core.",
      "Row one dumbbell to your ribs without twisting your hips.",
      "Lower it and repeat on the other side."
    ],
    tips: [
      "Keep your hips square to the floor as you row.",
      "Use lighter dumbbells until your stability improves."
    ]
  },
  {
    id: "pull-ups",
    name: "Pull-Ups",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "5–10 reps",
    description: "A challenging upper-body pull that builds the back and arms.",
    muscles: "Lats, mid-back and biceps",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Hang from a bar with an overhand grip slightly wider than shoulders.",
      "Pull your chest toward the bar, leading with your elbows.",
      "Lower yourself all the way down with control.",
      "Use a band for assistance if needed."
    ],
    tips: [
      "Avoid swinging or kipping to gain momentum.",
      "Use a band or an assisted machine to build up to full reps."
    ]
  },
  {
    id: "chin-ups",
    name: "Chin-Ups",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "5–10 reps",
    description: "An underhand pull that emphasizes the biceps and lats.",
    muscles: "Biceps, lats and mid-back",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Hang from a bar with an underhand, shoulder-width grip.",
      "Pull yourself up until your chin clears the bar.",
      "Squeeze your back and biceps at the top.",
      "Lower yourself slowly to a full hang."
    ],
    tips: [
      "Keep your core tight to stop your body from swinging.",
      "Lower under control instead of dropping."
    ]
  },
  {
    id: "triceps-dips",
    name: "Triceps Dips",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "8–12 reps",
    description: "A powerful bodyweight push for the triceps and chest.",
    muscles: "Triceps, chest and front shoulders",
    muscleGroups: ["Arms", "Chest", "Shoulders"],
    instructions: [
      "Sit on the edge of a sturdy bench and grip the edge beside your hips.",
      "Slide your hips forward and keep your chest lifted.",
      "Bend your elbows to lower yourself with control.",
      "Press back up until your arms are straight."
    ],
    tips: [
      "Keep your elbows pointing back, not flaring out.",
      "Bend your knees to make the dip easier."
    ]
  },
  {
    id: "decline-push-ups",
    name: "Decline Push-Ups",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "8–12 reps",
    description: "A harder push-up variation that loads the upper chest and shoulders.",
    muscles: "Upper chest, shoulders and triceps",
    muscleGroups: ["Chest", "Shoulders", "Arms", "Core"],
    instructions: [
      "Place your feet on a sturdy bench or step and hands on the floor.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest toward the floor with control.",
      "Push back up while bracing your core."
    ],
    tips: [
      "The higher your feet, the harder the push-up.",
      "Keep your hips from sagging or piking up."
    ]
  },
  {
    id: "hanging-leg-raises",
    name: "Hanging Leg Raises",
    category: "Bodyweight",
    level: "Advanced",
    sets: 3,
    reps: "8–12 reps",
    description: "An advanced core exercise hanging from a bar.",
    muscles: "Abdominals and hip flexors",
    muscleGroups: ["Core", "Arms"],
    instructions: [
      "Hang from a bar with an overhand grip and engaged shoulders.",
      "Keep your body still and brace your abdomen.",
      "Raise your legs until they are parallel to the floor.",
      "Lower them slowly without swinging."
    ],
    tips: [
      "Bend your knees to make the movement easier.",
      "Avoid using momentum — control both directions."
    ]
  },
  {
    id: "spinning-back-kick",
    name: "Spinning Back Kick",
    category: "Kickboxing",
    level: "Advanced",
    sets: 3,
    reps: "6 reps per leg",
    description: "A powerful spinning kick that demands balance and timing.",
    muscles: "Glutes, hamstrings, obliques and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Turn your head to look at the target as you pivot.",
      "Spin and drive your rear leg straight back toward the target.",
      "Land facing your target and return to your guard."
    ],
    tips: [
      "Look at the target before you kick to stay balanced.",
      "Build the turn slowly before adding speed and power."
    ],
    videoId: "YM0wVKko7SI"
  },
  {
    id: "flying-knee",
    name: "Flying Knee",
    category: "Kickboxing",
    level: "Advanced",
    sets: 3,
    reps: "6 reps per leg",
    description: "An explosive jumping strike that builds power and conditioning.",
    muscles: "Core, hip flexors, glutes and quads",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Start in your fighting stance with hands up.",
      "Step forward and drive off your rear foot to jump.",
      "Bring your rear knee up and forward at the peak.",
      "Land softly on the same foot and reset."
    ],
    tips: [
      "Land softly with a bent knee to absorb the impact.",
      "Start with a low jump and build height gradually."
    ],
    videoId: "-v0Ar9yrWXQ"
  },
  {
    id: "barbell-front-squats",
    name: "Barbell Front Squats",
    category: "Gym",
    level: "Advanced",
    sets: 4,
    reps: "6–8 reps",
    description: "An advanced squat variation that emphasizes the quads and core.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Rest the bar on the front of your shoulders with elbows high.",
      "Stand with feet shoulder-width apart and brace your core.",
      "Squat down while keeping your torso as upright as possible.",
      "Drive through your feet to stand back up."
    ],
    tips: [
      "Keep your elbows high so the bar stays on your shoulders.",
      "Reduce the weight if your torso starts tipping forward."
    ]
  },
  {
    id: "rack-pulls",
    name: "Rack Pulls",
    category: "Gym",
    level: "Advanced",
    sets: 4,
    reps: "6–8 reps",
    description: "A heavy partial deadlift that builds the back and grip.",
    muscles: "Back, glutes, hamstrings and traps",
    muscleGroups: ["Back", "Legs", "Core"],
    instructions: [
      "Set the bar on safety pins just below knee height.",
      "Stand with the bar over your mid-foot and grip it firmly.",
      "Brace your core and keep your back neutral.",
      "Drive through your legs to stand tall, then lower to the pins."
    ],
    tips: [
      "Keep the bar close to your legs as you pull.",
      "Reduce the weight if your back starts to round."
    ]
  },
  {
    id: "dumbbell-reverse-lunges",
    name: "Dumbbell Reverse Lunges",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10 reps per leg",
    description: "Build single-leg strength and balance with a controlled step back.",
    muscles: "Quads, glutes and core",
    muscleGroups: ["Legs", "Core"],
    instructions: [
      "Stand tall with a dumbbell in each hand at your sides.",
      "Step one foot straight back and lower your back knee toward the floor.",
      "Keep your front shin vertical and your chest lifted.",
      "Push through the front foot to stand, then repeat on the other leg."
    ],
    tips: [
      "Step straight back rather than to the side to stay balanced.",
      "Keep the movement slow and controlled instead of rushing."
    ]
  },
  {
    id: "dumbbell-one-arm-rows",
    name: "Dumbbell One-Arm Row",
    category: "Dumbbell",
    level: "Beginner",
    sets: 3,
    reps: "10 reps per arm",
    description: "Strengthen your back one side at a time with a supported row.",
    muscles: "Lats, mid-back and biceps",
    muscleGroups: ["Back", "Arms"],
    instructions: [
      "Place one hand and knee on a bench and the other foot on the floor.",
      "Hold a dumbbell in your free hand with your arm hanging straight.",
      "Pull the dumbbell toward your hip, keeping your elbow close to your side.",
      "Lower slowly, then finish all reps before switching arms."
    ],
    tips: [
      "Keep your back flat and avoid twisting your torso.",
      "Drive your elbow back instead of lifting with your hand."
    ]
  },
  {
    id: "cable-crunches",
    name: "Cable Crunches",
    category: "Gym",
    level: "Beginner",
    sets: 3,
    reps: "12 reps",
    description: "Train your abs against smooth, constant cable resistance.",
    muscles: "Abs and obliques",
    muscleGroups: ["Core"],
    instructions: [
      "Kneel in front of a high pulley and hold the rope beside your head.",
      "Keep your hips still and brace your abs.",
      "Curl your ribs toward your knees, rounding your spine.",
      "Return under control without pulling with your arms."
    ],
    tips: [
      "Move only at the waist — your hips stay in place.",
      "Exhale as you crunch and squeeze your abs at the bottom."
    ]
  }
];

export const muscleGroups: MuscleGroup[] = [
  "Chest",
  "Back",
  "Arms",
  "Shoulders",
  "Legs",
  "Core"
];

export const equipmentOptions: Equipment[] = [
  "Dumbbell",
  "Bodyweight",
  "Kickboxing",
  "Gym"
];

export const levels: FitnessLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced"
];

/** Friendly label for the equipment a user needs for an exercise. */
export const equipmentLabels: Record<Equipment, string> = {
  Dumbbell: "Dumbbells",
  Bodyweight: "No equipment",
  Kickboxing: "No equipment",
  Gym: "Gym equipment"
};

export const levelOrder: Record<FitnessLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};

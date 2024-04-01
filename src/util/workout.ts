const BASE_URL = `https://workouts.gamefox.vn`;

export const getAllWorkoutIds = async () => {
  const res = await fetch(`${BASE_URL}/id_list.txt`);
  const text = await res.text();
  return text.split("\n").filter(Boolean);
};

export type WorkoutInfo = {
  name: string;
  force: string;
  level: string;
  mechanic: null;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
};

export const getWorkoutInfo = async (id: string): Promise<WorkoutInfo> => {
  const res = await fetch(`${BASE_URL}/exercises/${id}/data.json`);
  const data = (await res.json()) as WorkoutInfo;
  data.images = data.images.map((img) => `${BASE_URL}/exercises/${img}`);
  return data;
};

export const getMultipleWorkoutInfo = async (
  ids: string[]
): Promise<WorkoutInfo[]> => {
  return Promise.all(ids.map((id) => getWorkoutInfo(id)));
};

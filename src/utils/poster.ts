import Poster from '../models/poster';

export async function createPoster(title: string, url: string): Promise<void> {
  const isDuplicateExist = await Poster.findOne({ title });
  if (isDuplicateExist) {
    throw new Error('Duplicate poster exists');
  }
  const poster = await new Poster({
    title, url,
  });
  await poster.save();
}

export async function findPoster(title: string): Promise<{ url: string }> {
  const poster = await Poster.findOne({ title });
  if (!poster) {
    throw new Error('No poster found');
  }
  const { url } = poster.toObject();
  return {
    url,
  };
}
'use server';

import { redirect } from 'next/navigation';

import fs from 'node:fs';
import xss from 'xss';
import slugify from 'slugify';

import { dummyMeals } from '@/initdb';
import { revalidatePath } from 'next/cache';

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (!meal.creator_email) {
    return {
      message: 'Invalid form'
    }
  }

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  // meal.image = `/images/${fileName}`;
  meal.image = '/images/burger.jpg';

  // let allMeals = [ ...dummyMeals ];
  dummyMeals.push(meal);
  // dummyMeals = [...allMeals];
  // Server call should be gone here
  // API....

  // To recall cache 
  revalidatePath("/meals");

  redirect('/meals');
}

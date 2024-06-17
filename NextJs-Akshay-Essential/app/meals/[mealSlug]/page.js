import Image from "next/image";
import { notFound } from "next/navigation";

import { dummyMeals } from "@/initdb";
import classes from "./page.module.css";

export async function generateMetadata({ params }) {
  const getMeal = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyMeals.find((m) => m.slug === params.mealSlug);
  };

  const meal = await getMeal();

  if (!meal) {
    notFound();
  }
  
  return {
    title: meal.title,
    description: meal.description
  }
}


export default async function MealDetailsPage({ params }) {
  const getMeal = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyMeals.find((m) => m.slug === params.mealSlug);
  };

  const meal = await getMeal();

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, "<br />"),
          }}
        ></p>
      </main>
    </>
  );
}

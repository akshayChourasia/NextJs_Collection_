import Link from 'next/link';
import { Suspense } from 'react';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { dummyMeals } from '@/initdb';
import MealsLoading from './loading-meals';

export const metadata = {
  title: 'All meals',
  description: 'Delicious meals, shared by a food-loving community.',
};


async function GetMeals() {

  const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return dummyMeals;
  }
  const meals = await getMeals();
  
  return <MealsGrid meals={meals} />
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoading />}>
          <GetMeals />
        </Suspense>
      </main>
    </>
  );
}

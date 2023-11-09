'use client';
import React, { useState, useEffect } from 'react';
import ItemKeywordSearchForm from '../components/features/items/ItemKeywordSearchForm';
import NewArrivalItems from '../components/features/items/NewArrivalItems';

interface itemProps {
  item_id: number;
  item_name: string;
  brewery: string;
  style: string;
  image_url: string;
  width: number;
  height: number;
}

export default function Home() {

  return (
    <main className=''>
      <div>

        <article className="prose max-w-none">
          <h4>
            び〜ちは、あなたがまだ飲んだことのないビールや、お気に入りのビールと出会うためのサービスです。
          </h4>
        </article>

        <ItemKeywordSearchForm />

        <article className="mt-10 mb-4 prose max-w-none">
          <h3>新着ビール</h3>
        </article>
        <NewArrivalItems />

        <article className="mt-10 mb-4 prose max-w-none">
          <h3>ランキング</h3>
        </article>
        <NewArrivalItems />

        <article className="mt-10 mb-4 prose max-w-none">
          <h3>あなたへのおすすめ</h3>
        </article>
        <NewArrivalItems />

      </div>
    </main>
  )
}

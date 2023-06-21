'use client';
import { apiClient } from '../../../utils/api';
import { useEffect, useState } from 'react';

interface BuildItem {
  item_id: number;
  item_name: string;
  country: string;
  prefecture: string;
  color: string;
  style: string;
  abv: string;
  type: string;
  brewery: string;
  tastes: string[];
  containers: string[];
}

export default function Item({ params }: { params: { id: number } }) {
  const { id } = params;
  const [buildItem, setBuildItem] = useState<BuildItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/items/${id}`);
        const responseData: BuildItem = response.data.data;
        console.log('item詳細情報のgetリクエストが成功しました。', responseData);
        setBuildItem(responseData);

      } catch (e) {
        console.error('item詳細情報のgetリクエストに対してエラーが発生しました:', e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>My Post: {params.id}</h2>
      <h2>取得した値</h2>
      {buildItem ? (
        <div className='card w-auto bg-base-100 shadow-xl m-2 p-4'>
          <div>{buildItem.item_name}</div>
          <div>{buildItem.country}</div>
          <div>{buildItem.prefecture}</div>
          <div>{buildItem.color}</div>
          <div className='badge badge-lg badge-accent rounded-none'>{buildItem.style}</div>
          <div>{buildItem.type}</div>
          <div>{buildItem.abv}</div>
          <div>{buildItem.brewery}</div>
          {buildItem.tastes.map((taste, i) => (
            <div key={i} className='badge badge-primary'>
              {taste}
            </div>
          ))}
          {buildItem.containers.map((container, i) => (
            <div key={i} className='badge badge-outline'>
              {container}
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

'use client';
import { apiClient } from '../../utils/api';
import { useEffect, useState } from 'react';

interface Props {
  id: number;
  name: string;
}

interface BuildItem {
  item_id: number;
  item_name: string;
  country: Props;
  prefecture: Props;
  color: Props;
  style: Props;
  abv: Props;
  type: Props;
  brewery: Props;
  tastes: Props[];
  containers: Props[];
}

export default function Item({ params }: { params: { id: number } }) {
  const { id } = params;
  const [buildItems, setBuildItems] = useState<BuildItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/items/${id}`);
        const responseData: BuildItem = response.data;
        console.log('item詳細情報のgetリクエストが成功しました。', responseData);
        setBuildItems([responseData]);
      } catch (e) {
        console.error('item詳細情報のgetリクエストに対してエラーが発生しました:', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>My Post: {params.id}</h2>
      <h2>取得した値</h2>
      {buildItems.map((item) => (
        <div key={item.item_id} className='card w-auto bg-base-100 shadow-xl m-2 p-4'>
          <div>{item.item_name}</div>
          <div>{item.country.name}</div>
          <div>{item.prefecture.name}</div>
          <div>{item.color.name}</div>
          <div className='badge badge-lg badge-accent rounded-none'>{item.style.name}</div>
          <div>{item.type.name}</div>
          <div>{item.abv.name}</div>
          <div>{item.brewery.name}</div>
          {item.tastes.map((taste) => (
            <div key={taste.id} className='badge badge-primary'>{taste.name}</div>
          ))}
          {item.containers.map((container) => (
            <div key={container.id} className='badge badge-outline'>{container.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
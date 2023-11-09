'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../utils/api';
import CarouselItem from './CarouselItem';

interface BuildItems {
  item_id: number;
  item_name: string;
	brewery: string;
  style: string;
	image_url: string;
}

export default function fetchNewArrivals() {

  // 新着ビール情報をget通信しresponseで得たデータをfetchする
  const [buildItems, setBuildItems] = useState<BuildItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/items/newarrivals/index');
        console.log('ビール情報表示用のgetリクエストが成功しました。', response.data);
        setBuildItems(response.data);

      } catch (e) {
        console.error('ビール情報表示用のgetリクエストが失敗しました。', e);
      }
    };
    fetchData();
  }, []);

  return (
		<div className='mb-10 max-w-full gap-2 carousel rounded-box'>
      {buildItems.length === 0 ? (
        <p>該当するアイテムはありません。</p>
      ) : (
        buildItems.map((buildItem) => (
					<CarouselItem
						item_id={buildItem.item_id}
						item_name={buildItem.item_name}
						brewery={buildItem.brewery}
						style={buildItem.style}
						image_url={'/test.jpg'}
						// image_url={buildItem.image_url}
						width={320}
						height={240}         
						likes={50}
					/>
        ))
      )}
    </div>
  );
}

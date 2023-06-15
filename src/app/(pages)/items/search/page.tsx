'use client';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { apiClient } from '../../../utils/api';

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

export default function SearchResults() {
  const searchParams = useSearchParams();

  // 検索条件の値をpost通信しresponseで得たデータをfetchする
  const [buildItems, setBuildItems] = useState<BuildItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inputKeyword = searchParams.get('keyword');

        const mapSearchParamsToNumbers = (paramName: string): number[] => {
          return searchParams.getAll(paramName).map(Number);
        };
        
        const breweryId = mapSearchParamsToNumbers('breweryId');
        const countryId = mapSearchParamsToNumbers('countryId');
        const prefectureId = mapSearchParamsToNumbers('prefectureId');
        const tasteId = mapSearchParamsToNumbers('tasteId');
        const containerId = mapSearchParamsToNumbers('containerId');
        const styleId = mapSearchParamsToNumbers('styleId');
        const colorId = mapSearchParamsToNumbers('colorId');
        const abvId = mapSearchParamsToNumbers('abvId');
        const typeId = mapSearchParamsToNumbers('typeId');
        
        const requestData = {
          inputKeyword: inputKeyword,
          breweryId: breweryId,
          countryId: countryId,
          prefectureId: prefectureId,
          tasteId: tasteId,
          containerId: containerId,
          styleId: styleId,
          colorId: colorId,
          abvId: abvId,
          typeId: typeId,
        };

        const response = await apiClient.post('/items/search', requestData);
        console.log('ビール情報表示用のpostリクエストが成功しました。', response.data);
        setBuildItems(response.data);

      } catch (e) {
        console.error('ビール情報表示用のpostリクエストが失敗しました。', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>検索結果</h2>
      <h2 className='font-bold'>取得した値</h2>
      {buildItems.length === 0 ? (
        <p>該当するアイテムはありません。</p>
      ) : (
        buildItems.map((item) => (
          <div key={item.item_id} className='card w-auto bg-base-100 shadow-xl m-2 p-4'>
            <Link href={`/items/${item.item_id}`}>
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
            </Link>
          </div>
        ))
      )}
    </div>
  );

}

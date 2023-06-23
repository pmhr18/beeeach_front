'use client';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { apiClient } from '../../../utils/api';

interface BuildItems {
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

export default function SearchResults() {
  const searchParams = useSearchParams();

  // 検索条件の値をpost通信しresponseで得たデータをfetchする
  const [buildItems, setBuildItems] = useState<BuildItems[]>([]);

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

        const response = await apiClient.post('/items/conditions/result', requestData);
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
        buildItems.map((buildItem) => (
          <div key={buildItem.item_id} className='w-auto bg-base-100 shadow-xl my-2 p-4'>
            <Link href={`/items/${buildItem.item_id}`}>
              <div className='badge badge-lg badge-accent rounded-none'>{buildItem.style}</div>
              <div>{buildItem.item_name}</div>
              {buildItem.tastes.map((taste,i) => (
                <div key={i} className='badge badge-primary'>{taste}</div>
              ))}
              <div>{buildItem.country}</div>
              <div>{buildItem.prefecture}</div>
              <div>{buildItem.brewery}</div>
              <div>{buildItem.color}</div>
              <div>{buildItem.type}</div>
              <div>{buildItem.abv}</div>
              {buildItem.containers.map((container,i) => (
                <div key={i} className='badge badge-outline'>{container}</div>
              ))}
            </Link>
          </div>
        ))
      )}
    </div>
  );

}

'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';

// 全てのコードにおいて検証用で実装しているので、各共通化できる箇所はコンポーネント化すること

interface Brewery {
  id: number;
  name: string;
}
interface Country {
  id: number;
  name: string;
}
interface Prefecture {
  id: number;
  name: string;
}
interface Taste {
  id: number;
  taste: string;
}
interface Container {
  id: number;
  name: string;
}
interface Style {
  id: number;
  name: string;
}
interface Color {
  id: number;
  color: string;
}
interface Abv {
  id: number;
  num: string;
}
interface Type {
  id: number;
  name: string;
}

function BreweryDetail() {


  // API_TEST_POST
  // input value
  const [inputItemName, setInputItemName] = useState<string>('');
  const [inputBreweryId, setInputBreweryId] = useState<number>();
  const [inputCountryId, setInputCountryId] = useState<number>();
  const [inputPrefectureId, setInputPrefectureId] = useState<number>();
  const [inputTasteId, setInputTasteId] = useState<number>();
  const [inputContainerId, setInputContainerId] = useState<number>();
  const [inputStyleId, setInputStyleId] = useState<number>();
  const [inputColorId, setInputColorId] = useState<number>();
  const [inputAbvId, setInputAbvId] = useState<number>();
  const [inputTypeId, setInputTypeId] = useState<number>();
  const [inputImage, setInputImage] = useState<string>();
  // fetch value
  const [fetchItemName, setFetchItemName] = useState<string>('');
  const [fetchBreweryName, setFetchBreweryName] = useState<string>('');
  const [fetchCountryName, setFetchCountryName] = useState<string>('');
  const [fetchPrefectureName, setFetchPrefectureName] = useState<string>('');
  const [fetchTaste, setFetchTaste] = useState<Taste[]>([]);
  const [fetchContainer, setFetchContainer] = useState<Container[]>([]);
  const [fetchStyleName, setFetchStyleName] = useState<string>('');
  const [fetchColor, setFetchColor] = useState<string>('');
  const [fetchAbvNum, setFetchAbvNum] = useState<string>('');
  const [fetchTypeName, setFetchTypeName] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const itemName = formData.get('itemName') as string;
    const breweryId = formData.get('brewery') as string;
    const countryId = formData.get('country') as string;
    const prefectureId = formData.get('prefecture') as string;
    const selectedTasteIds = Array.from(formData.getAll('taste') as string[]);
    const selectedContainerIds = Array.from(formData.getAll('container') as string[]);
    const styleId = formData.get('style') as string;
    const colorId = formData.get('color') as string;
    const abvId = formData.get('abv') as string;
    const typeId = formData.get('type') as string;
  
    // const image = (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0];
  
    const requestData = {
      itemName,
      breweryId,
      countryId,
      prefectureId,
      tasteIds: selectedTasteIds,
      containerIds: selectedContainerIds,
      styleId,
      colorId,
      abvId,
      typeId,
      // image,
    };
  
    try {
      const response = await apiClient.post('/items', requestData);
      console.log('ビール情報登録用のpostリクエストが成功しました。', response.data);
      const responseData = response.data;
      setFetchItemName(responseData.itemName);
      setFetchBreweryName(responseData.brewery.name);
      setFetchCountryName(responseData.country.name);
      setFetchPrefectureName(responseData.prefecture.name);
      setFetchTaste(responseData.taste);
      setFetchContainer(responseData.container);
      setFetchStyleName(responseData.style.name);
      setFetchColor(responseData.color.color);
      setFetchAbvNum(responseData.abv.num);
      setFetchTypeName(responseData.type.name);
    } catch (e) {
      console.error('ビール情報登録用のpostリクエストが失敗しました。', e);
    }
  };
  
  return (
    <>
      <div>
        <h2 className='font-bold'>取得した値</h2>
          <h3>ビール名</h3>
            <div className='text-orange-400'>{fetchItemName}</div>
          <h3>醸造所名</h3>
            <div className='text-orange-400'>{fetchBreweryName}</div>
          <h3>生産国名</h3>
            <div className='text-orange-400'>{fetchCountryName}</div>
          <h3>生産地詳細</h3>
            <div className='text-orange-400'>{fetchPrefectureName}</div>
          <h3>味情報</h3>
            {fetchTaste.map((taste, i) => (
              <div className="text-orange-900" key={i}>{taste.taste}</div>
            ))}
          <h3>容器情報</h3>
            {fetchContainer.map((container, i) => (
              <div className="text-orange-900" key={i}>{container.name}</div>
            ))}
          <h3>スタイル情報</h3>
            <div className='text-orange-400'>{fetchStyleName}</div>
          <h3>色情報</h3>
            <div className='text-orange-400'>{fetchColor}</div>
          <h3>アルコール度数情報</h3>
            <div className='text-orange-400'>{fetchAbvNum}</div>
          <h3>種類情報</h3>
            <div className='text-orange-400'>{fetchTypeName}</div>
          <h3>画像</h3>
      </div>
    </>
  );
}

export default BreweryDetail;

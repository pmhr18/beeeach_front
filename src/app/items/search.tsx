'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';

interface ItemId {
  id: number;
}

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



function ItemSearch() {
  // 検索条件初期表示
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const [inputItemId, setInputItemId] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/items/conditions');
        const responseData = response.data;
        setItemId(responseData.itemId);
        console.log('検索条件用の初期getリクエストが成功しました。', responseData);
      } catch (e) {
        console.error('初期表示用のgetリクエストに対してエラーが発生しました:', e);
      }
    };

    fetchData();
  }, []);

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
		const fetchItemId = formData.get('itemId') as string;

		const requestData = {
			itemId: fetchItemId
		}
		console.log(requestData);
	
		try {
			const response = await apiClient.post('/items/search', requestData);
			console.log('ビール情報表示用のpostリクエストが成功しました。', response.data);
			const responseData = response.data;
      setFetchItemName(responseData.item.name);
      setFetchBreweryName(responseData.item.brewery.name);
      setFetchCountryName(responseData.item.country.name);
      setFetchPrefectureName(responseData.item.prefecture.name);
      setFetchTaste(responseData.item.tastes);
      setFetchContainer(responseData.item.containers);
      setFetchStyleName(responseData.item.style.name);
      setFetchColor(responseData.item.color.color);
      setFetchAbvNum(responseData.item.abv.num);
      setFetchTypeName(responseData.item.type.name);
		} catch (e) {
			console.error('ビール情報表示用のpostリクエストが失敗しました。', e);
		}
	}

  return (
	<>
		<div>
			<div>
				<h2>API_TEST_GET 検索して表示させる</h2>
				<h3>idを選ぶ</h3>
				<form onSubmit={handleSubmit}>
					<div>
						<select
							name='itemId'
							value={inputItemId}
							onChange={(e) => setInputItemId(Number(e.target.value))}
						>
							{itemId.map((itemId, i) => (
								<option key={i} value={itemId.id}>{itemId.id}</option>
							))}
						</select>
					</div>
					<button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2'>レコードを表示する</button>
				</form>
			</div>
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
		</div>
	</>
	);
}

export default ItemSearch;

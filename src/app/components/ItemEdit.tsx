'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';

// 全てのコードにおいて検証用で実装しているので、各共通化できる箇所はコンポーネント化すること
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

function ItemEdit() {
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
	// render value 表示データ格納用
	const [renderBreweriesId, setRenderBreweriesId] = useState<Brewery[]>([]);
	const [renderCountriesId, setRenderCountriesId] = useState<Country[]>([]);
	const [renderPrefecturesId, setRenderPrefecturesId] = useState<Prefecture[]>([]);
	const [renderTastesId, setRenderTastesId] = useState<Taste[]>([]);
	const [renderContainersId, setRenderContainersId] = useState<Container[]>([]);
	const [renderStylesId, setRenderStylesId] = useState<Style[]>([]);
	const [renderColorsId, setRenderColorsId] = useState<Color[]>([]);
	const [renderAbvsId, setRenderAbvsId] = useState<Abv[]>([]);
	const [renderTypesId, setRenderTypesId] = useState<Type[]>([]);
	// fetch value 登録済データ格納用
	const [fetchAndInputItemNameValue, setFetchAndInputItemNameValue] = useState<string>('');
	const [fetchbreweryId, setFetchBreweryId] = useState<string>('');
	const [fetchCountryId, setFetchCountryId] = useState<string>('');
	const [fetchPrefectureId, setFetchPrefectureId] = useState<string>('');
	const [fetchtastesId, setFetchTastesId] = useState<Taste[]>([]);
	const [fetchContainersId, setFetchContainersId] = useState<Container[]>([]);
	const [fetchStyleId, setFetchStyleId] = useState<string>('');
	const [fetchColorId, setFetchColorId] = useState<string>('');
	const [fetchAbvId, setFetchAbvId] = useState<string>('');
	const [fetchTypeId, setFetchTypeId] = useState<string>('');
	// input value 更新データ格納用
	const [inputbreweryId, setInputBreweryId] = useState<string>('');
	const [inputCountryId, setInputCountryId] = useState<string>('');
	const [inputPrefectureId, setInputPrefectureId] = useState<string>('');
	const [inputtastesId, setInputTastesId] = useState<Taste[]>([]);
	const [inputContainersId, setInputContainersId] = useState<Container[]>([]);
	const [inputStyleId, setInputStyleUd] = useState<string>('');
	const [inputColorId, setInputColorId] = useState<string>('');
	const [inputAbvId, setInputAbvId] = useState<string>('');
	const [inputTypeId, setInputTypeId] = useState<string>('');

	// 更新したいデータを取得する
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
			console.log('更新対象ビール情報の取得用postリクエストが成功しました。', response.data);
			const responseData = response.data;
      setFetchAndInputItemNameValue(responseData.item.name);
      setFetchBreweryId(responseData.item.brewery.id);
      setFetchCountryId(responseData.item.country.id);
      setFetchPrefectureId(responseData.item.prefecture.id);
      setFetchTastesId(responseData.item.tastes);
      setFetchContainersId(responseData.item.containers);
      setFetchStyleId(responseData.item.style.id);
      setFetchColorId(responseData.item.color.id);
      setFetchAbvId(responseData.item.abv.id);
      setFetchTypeId(responseData.item.type.id);
		} catch (e) {
			console.error('更新対象ビール情報の取得用postリクエストが失敗しました。', e);
		}
	}

  return (
	<>
		<div>
			<div>
				<h2>API_TEST_GET データを更新する</h2>
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
				<h2 className='font-bold'>必要な箇所を更新入力してください</h2>
				<form onSubmit={handleUpdate}>
				<h3>ビール名</h3>
					<div>
						<input
							name='itemName'
							value={fetchAndInputItemNameValue}
							onChange={(e) => setFetchAndInputItemNameValue(e.target.value)}
						/>
					</div>
					<h3>醸造所情報</h3>
            <div>

						<select>
							{options.map((option) => (
								<option key={option.value} value={option.value} selected={option.value === selectedValue}>
									{option.label}
								</option>
							))}
						</select>

              <select
                name='brewery'
                value={inputBreweryId}
                onChange={(e) => setInputBreweryId(Number(e.target.value))}
              >
                {brewery.map((breweryItem, i) => (
                  <option key={i} value={breweryItem.id}>{breweryItem.name}</option>
                ))}
              </select>
            </div>
            <h3>生産国情報</h3>
            <div>
              <select
                name='country'
                value={inputCountryId}
                onChange={(e) => setInputCountryId(Number(e.target.value))}
              >
                {country.map((countryItem, i) => (
                  <option key={i} value={countryItem.id}>{countryItem.name}</option>
                ))}
              </select>
            </div>
            <div>
              {/* {inputCountryId ? ( */}
                <div>
                  <h3>生産地詳細</h3>
                  <div>
                    <select
                      name='prefecture'
                      value={inputPrefectureId}
                      onChange={(e) => setInputPrefectureId(Number(e.target.value))}
                    >
                      {prefecture.map((prefectureItem, i) => (
                        <option key={i} value={prefectureItem.id}>{prefectureItem.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              {/* ) : null} */}
            </div>
            <h3>味情報</h3>
            <div>
              {taste.map((tasteItem, i) => (
                <div key={i}>
                  <input
                    type='checkbox'
                    value={tasteItem.id}
                    name='taste'
                    onChange={() => setInputTasteId(tasteItem.id)}
                  />
                  <label>{tasteItem.taste}</label>
                </div>
              ))}
            </div>
            <h3>容器情報</h3>
            <div>
              {container.map((containerItem, i) => (
                <div key={i}>
                  <input
                    type='checkbox'
                    value={containerItem.id}
                    name='container'
                    onChange={() => setInputContainerId(containerItem.id)}
                  />
                  <label>{containerItem.name}</label>
                </div>
              ))}
            </div>
            <h3>スタイル情報</h3>
            <div>
              <select
                name='style'
                value={inputStyleId}
                onChange={(e) => setInputStyleId(Number(e.target.value))}
              >
                {style.map((styleItem, i) => (
                  <option key={i} value={styleItem.id}>{styleItem.name}</option>
                ))}
              </select>
            </div>
            <h3>色情報</h3>
            <div>
              <select
                name='color'
                value={inputColorId}
                onChange={(e) => setInputColorId(Number(e.target.value))}
              >
                {color.map((colorItem, i) => (
                  <option key={i} value={colorItem.id}>{colorItem.color}</option>
                ))}
              </select>
            </div>
            <h3>アルコール度数情報</h3>
            <div>
              <select
                name='abv'
                value={inputAbvId}
                onChange={(e) => setInputAbvId(Number(e.target.value))}
              >
                {abv.map((abvItem, i) => (
                  <option key={i} value={abvItem.id}>{abvItem.num}</option>
                ))}
              </select>
            </div>
            <h3>種類情報</h3>
            <div>
              <select
                name='type'
                value={inputTypeId}
                onChange={(e) => setInputTypeId(Number(e.target.value))}
              >
                {type.map((typeItem, i) => (
                  <option key={i} value={typeItem.id}>{typeItem.name}</option>
                ))}
              </select>
            </div>
            <h3>画像</h3>
            <div>
              <input
                type='file'
                name='image'
                // onChange={(e) => setInputImage(e.target.files?.[0])}
              />
            </div>
            <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2'>レコードを登録する</button>
          </form>
					</div>
		</div>
	</>
	);
}

export default ItemEdit;

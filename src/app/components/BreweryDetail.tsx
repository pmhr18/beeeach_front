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

// API_TEST_GET_選択肢を表示
// for create
const [brewery, setBrewery] = useState<Brewery[]>([]);
const [country, setCountry] = useState<Country[]>([]);
const [prefecture, setPrefecture] = useState<Prefecture[]>([]);
const [taste, setTaste] = useState<Taste[]>([]);
const [container, setContainer] = useState<Container[]>([]);
const [style, setStyle] = useState<Style[]>([]);
const [color, setColor] = useState<Color[]>([]);
const [abv, setAbv] = useState<Abv[]>([]);
const [type, setType] = useState<Type[]>([]);
// init value
const [initBreweryId, setInitBreweryId] = useState<number>();
const [initCountryId, setInitCountryId] = useState<number>();
const [initPrefectureId, setInitPrefectureId] = useState<number>();
const [initTasteId, setInitTasteId] = useState<number>();
const [initContainerId, setInitContainerId] = useState<number>();
const [initStyleId, setInitStyleId] = useState<number>();
const [initColorId, setInitColorId] = useState<number>();
const [initAbvId, setInitAbvId] = useState<number>();
const [initTypeId, setInitTypeId] = useState<number>();


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiClient.get('/items/create');
      const responseData = response.data;
      setBrewery(responseData.brewery);
      setCountry(responseData.country);
      setPrefecture(responseData.prefecture);
      setTaste(responseData.taste);
      setContainer(responseData.container);
      setStyle(responseData.style);
      setColor(responseData.color);
      setAbv(responseData.abv);
      setType(responseData.type);
      console.log('初期表示用のgetリクエストが成功しました。', responseData);
    } catch (e) {
      console.error('初期表示用のgetリクエストに対してエラーが発生しました:', e);
    }
  };

  fetchData();
}, []);

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
        <div>
          <h1>API_TEST_GET_ビール情報を登録する</h1>
          <form onSubmit={handleSubmit}>
            <h3>ビール名</h3>
            <div>
              <input
                placeholder='ビール名を入力してください'
                name='itemName'
                value={inputItemName}
                onChange={(e) => setInputItemName(e.target.value)}
              />
            </div>
            <h3>醸造所情報</h3>
            <div>
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
        <div className='border-2 border-orange-500'></div>
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
        <div className='border-2 border-orange-500'></div>
      </div>
    </>
  );
}

export default BreweryDetail;

'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../utils/api';
import CheckboxInputOption from '../components/CheckboxInputOption';

interface CheckboxProps {
	id: number;
  name: string;
	checked: boolean;
}

interface RenderValues {
  brewery: CheckboxProps[];
  country: CheckboxProps[];
  prefecture: CheckboxProps[];
  taste: CheckboxProps[];
  container: CheckboxProps[];
  style: CheckboxProps[];
  color: CheckboxProps[];
  abv: CheckboxProps[];
  type: CheckboxProps[];
}

interface ConditionValues {
  [key: string]: number[]; // インデックスシグネチャを追加
  breweryId: number[];
  countryId: number[];
  prefectureId: number[];
  tasteId: number[];
  containerId: number[];
  styleId: number[];
  colorId: number[];
  abvId: number[];
  typeId: number[];
}

interface ConditionChecked {
  [key: string]: boolean[]; // インデックスシグネチャを追加
  breweryChecked: boolean[];
  countryChecked: boolean[];
  prefectureChecked: boolean[];
  tasteChecked: boolean[];
  containerChecked: boolean[];
  styleChecked: boolean[];
  colorChecked: boolean[];
  abvChecked: boolean[];
  typeChecked: boolean[];
}

export default function ItemSearchConditionForm() {
  const router = useRouter()

  // 検索条件初期表示
	const [renderConditionValue, setRenderConditionValue] = useState<RenderValues>({
    brewery: [],
    country: [],
    prefecture: [],
		taste: [],
    container: [],
    style: [],
    color: [],
    abv: [],
    type: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/items/create');
        const responseData: RenderValues = response.data;
        console.log('検索条件用の初期getリクエストが成功しました。', responseData);
        setRenderConditionValue(responseData);
      } catch (e) {
        console.error('初期表示用のgetリクエストに対してエラーが発生しました:', e);
      }
    };
    fetchData();
  }, []);

  // 検索条件入力値を取得
  const [inputConditionValues, setInputConditionValues] = useState<ConditionValues>({
    breweryId: [],
    countryId: [],
    prefectureId: [],
    tasteId: [],
    containerId: [],
    styleId: [],
    colorId: [],
    abvId: [],
    typeId: [],
  });

  const [inputConditionChecked, setInputConditionChecked] = useState<ConditionChecked>({
    breweryChecked: [],
    countryChecked: [],
    prefectureChecked: [],
    tasteChecked: [],
    containerChecked: [],
    styleChecked: [],
    colorChecked: [],
    abvChecked: [],
    typeChecked: [],
  });

  // 各フォームをチェックすることで入力値処理イベントが動作
  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, category: string) => {
    const { checked, value } = e.target;
    const id = Number(value);

    setInputConditionChecked((prevChecked) => {
      const updatedChecked = [...prevChecked[`${category}Checked`]];
      updatedChecked[id - 1] = checked;

      return {
        ...prevChecked,
        [`${category}Checked`]: updatedChecked,
      };
    });

    setInputConditionValues((prevValues) => {
      const updatedIds = checked
        ? [...prevValues[`${category}Id`], id]
        : prevValues[`${category}Id`].filter((itemId) => itemId !== id);

      return {
        ...prevValues,
        [`${category}Id`]: updatedIds,
      };
    });
  };

  const handleChangeBreweryChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'brewery');
  };
  const handleChangeCountryChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'country');
  };
  const handleChangePrefectureChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'prefecture');
  };
  const handleChangeTasteChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'taste');
  };
  const handleChangeContainerChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'container');
  };
  const handleChangeStyleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'style');
  };
  const handleChangeColorChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'color');
  };
  const handleChangeAbvChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'abv');
  };
  const handleChangeTypeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeChecked(e, 'type');
  };

  // 検索ボタン押下により検索条件の値を検索結果画面へ引き渡し及び遷移する
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const queryParams = Object.entries(inputConditionValues)
      .flatMap(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          return value.map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        } else {
          return [];
        }
      })
      .join('&');
      const url = queryParams.length > 0 ? `/items/search?${queryParams}` : '/items/search';

      router.push(url);
    
    } catch (e) {
      console.error('URLパラメータ引き渡し及び遷移処理が失敗しました。',e);
    }   
  }

  return (
    <div>
      <h2>ビール情報を登録</h2>
        <h3>API_TEST_GET_ビール情報を登録するためのInputを初期表示</h3>
          <form onSubmit={handleSubmit}>
            <CheckboxInputOption
              label='醸造所'
              name='brewery'
              value={inputConditionValues.breweryId}
              checked={inputConditionChecked.breweryChecked}
              options={renderConditionValue.brewery}
              onChange={handleChangeBreweryChecked}
            />
            <CheckboxInputOption
              label='生産国'
              name='country'
              value={inputConditionValues.countryId}
              checked={inputConditionChecked.countryChecked}
              options={renderConditionValue.country}
              onChange={handleChangeCountryChecked}
            />
            <CheckboxInputOption
              label='都道府県'
              name='prefecture'
              value={inputConditionValues.prefectureId}
              checked={inputConditionChecked.prefectureChecked}
              options={renderConditionValue.prefecture}
              onChange={handleChangePrefectureChecked}
            />
            <CheckboxInputOption
              label="テイスト"
              name="tastes"
              value={inputConditionValues.tasteId}
              checked={inputConditionChecked.tasteChecked}
              options={renderConditionValue.taste}
              onChange={handleChangeTasteChecked}
            />
            <CheckboxInputOption
              label="容器"
              name="containers"
              value={inputConditionValues.containerId}
              checked={inputConditionChecked.containerChecked}
              options={renderConditionValue.container}
              onChange={handleChangeContainerChecked}
            />
            <CheckboxInputOption
              label='スタイル'
              name='style'
              value={inputConditionValues.styleId}
              checked={inputConditionChecked.styleChecked}
              options={renderConditionValue.style}
              onChange={handleChangeStyleChecked}
            />
            <CheckboxInputOption
              label='カラー'
              name='color'
              value={inputConditionValues.colorId}
              checked={inputConditionChecked.colorChecked}
              options={renderConditionValue.color}
              onChange={handleChangeColorChecked}
            />
            <CheckboxInputOption
              label='アルコール度数'
              name='abv'
              value={inputConditionValues.abvId}
              checked={inputConditionChecked.abvChecked}
              options={renderConditionValue.abv}
              onChange={handleChangeAbvChecked}
            />
            <CheckboxInputOption
              label='種類'
              name='type'
              value={inputConditionValues.typeId}
              checked={inputConditionChecked.typeChecked}
              options={renderConditionValue.type}
              onChange={handleChangeTypeChecked}
            />
            <button type="submit" className='btn btn-neutral'>
              検索する
            </button>
          </form>
    </div>
	);  
}

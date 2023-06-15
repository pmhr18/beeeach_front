'use client';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { apiClient } from '../../../utils/api';
import TextInput from '../../../components/TextInput';
import SelectInputOption from '../../../components/SelectInputOption';
import CheckboxInputOption from '../../../components/CheckboxInputOption';

interface Props {
	id: number;
  name: string;
}

interface CheckboxProps {
	id: number;
  name: string;
	checked: boolean;
}

interface ItemProps {
  brewery: Props[];
  country: Props[];
  prefecture: Props[];
  taste: CheckboxProps[];
  container: CheckboxProps[];
  style: Props[];
  color: Props[];
  abv: Props[];
  type: Props[];
}

export default function ItemStoreForm () {

	// フォーム初期表示
	const [renderItemDetailValue, setRenderItemDetailValue] = useState<ItemProps>({
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
				const responseData: ItemProps = response.data;
				console.log('初期表示用のgetリクエストが成功しました。', responseData);
				setRenderItemDetailValue(responseData);
			} catch (e) {
				console.error('初期表示用のgetリクエストに対してエラーが発生しました:', e);
			}
		};
		fetchData();
	}, []);

	// フォーム入力値を取得
	const [inputValues, setInputValues] = useState<{
		itemName: string;
		breweryId: number;
		countryId: number;
		prefectureId: number;
		tasteChecked: boolean[];
		tasteId: number[];
		containerChecked: boolean[];
		containerId: number[];
		styleId: number;
		colorId: number;
		abvId: number;
		typeId: number;
		image: string;
	}>({
		itemName: '',
		breweryId: 0,
		countryId: 0,
		prefectureId: 0,
		tasteChecked: [],
		tasteId: [],
		containerChecked: [],
		containerId: [],
		styleId: 0,
		colorId: 0,
		abvId: 0,
		typeId: 0,
		image: '',
	});
	
	const handleChangeTasteChecked = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		const id  = Number(value);

		setInputValues((prevValues) => {
			const updatedTasteChecked = [...prevValues.tasteChecked];
			updatedTasteChecked[id - 1] = checked;
			const updatedTasteId = checked
				? [...prevValues.tasteId, id]
				: prevValues.tasteId.filter((tasteId) => tasteId !== id);
			
			return { ...prevValues, tasteChecked: updatedTasteChecked, tasteId: updatedTasteId };
		});
	};

	const handleChangeContainerChecked = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		const id  = Number(value);

		setInputValues((prevValues) => {
			const updatedContainerChecked = [...prevValues.containerChecked];
			updatedContainerChecked[id - 1] = checked;
			const updatedContainerId = checked
				? [...prevValues.containerId, id]
				: prevValues.containerId.filter((containerId) => containerId !== id);
			
			return { ...prevValues, containerChecked: updatedContainerChecked, containerId: updatedContainerId };
		});
	};

	// 取得した値をpost通信する
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = inputValues;
  
    try {
      const response = await apiClient.post('/items', requestData);
      console.log('ビール情報登録用のpostリクエストが成功しました。', response.data);
    } catch (e) {
      console.error('ビール情報登録用のpostリクエストが失敗しました。', e);
    }
  };
	
	return (
		<div>
			<h2>ビール情報を登録</h2>
			<h3>API_TEST_GET_ビール情報を登録するためのInputを初期表示</h3>
			<form onSubmit={handleSubmit}>
				<TextInput
					className='input input-sm input-bordered input-primary rounded-full w-full max-w-xs'
					label='ビール名'
					name='itemName'
					value={inputValues.itemName}
					placeholder='ビール名を入力してください'
					onChange={(e) => setInputValues({ ...inputValues, itemName: e.target.value })}
				/>
				<SelectInputOption
					label='醸造所'
					name='brewery'
					value={inputValues.breweryId}
					options={renderItemDetailValue.brewery}
					onChange={(e) => setInputValues({ ...inputValues, breweryId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='生産国'
					name='country'
					value={inputValues.countryId}
					options={renderItemDetailValue.country}
					onChange={(e) => setInputValues({ ...inputValues, countryId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='都道府県'
					name='prefecture'
					value={inputValues.prefectureId}
					options={renderItemDetailValue.prefecture}
					onChange={(e) => setInputValues({ ...inputValues, prefectureId: Number(e.target.value) })}
				/>
				<CheckboxInputOption
					label="テイスト"
					name="tastes"
					value={inputValues.tasteId}
					checked={inputValues.tasteChecked}
					options={renderItemDetailValue.taste}
					onChange={handleChangeTasteChecked}
				/>
				<CheckboxInputOption
					label="容器"
					name="containers"
					value={inputValues.containerId}
					checked={inputValues.containerChecked}
					options={renderItemDetailValue.container}
					onChange={handleChangeContainerChecked}
				/>
				<SelectInputOption
					label='スタイル'
					name='style'
					value={inputValues.styleId}
					options={renderItemDetailValue.style}
					onChange={(e) => setInputValues({ ...inputValues, styleId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='カラー'
					name='color'
					value={inputValues.colorId}
					options={renderItemDetailValue.color}
					onChange={(e) => setInputValues({ ...inputValues, colorId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='アルコール度数'
					name='abv'
					value={inputValues.abvId}
					options={renderItemDetailValue.abv}
					onChange={(e) => setInputValues({ ...inputValues, abvId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='種類'
					name='type'
					value={inputValues.typeId}
					options={renderItemDetailValue.type}
					onChange={(e) => setInputValues({ ...inputValues, typeId: Number(e.target.value) })}
				/>
				<h4>イメージ</h4>
				<button
					type="submit"
					className='btn btn-neutral'
				>
					ビール情報を登録する
				</button>
			</form>
		</div>
	);
}

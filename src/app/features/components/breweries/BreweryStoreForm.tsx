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

interface RenderBreweryProps {
  country: Props[];
  prefecture: Props[];
  storeInfo: CheckboxProps[];
}

export default function BreweryStoreForm () {

	// フォーム初期表示
	const [renderBreweryDetailValue, setRenderBreweryDetailValue] = useState<RenderBreweryProps>({
		country: [],
    prefecture: [],
		storeInfo: []
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiClient.get('/breweries/create');
				const responseData: RenderBreweryProps = response.data;
				console.log('初期表示用のgetリクエストが成功しました。', responseData);
				setRenderBreweryDetailValue(responseData);
			} catch (e) {
				console.error('初期表示用のgetリクエストに対してエラーが発生しました:', e);
			}
		};
		fetchData();
	}, []);

	// フォーム入力値を取得
	const [inputValues, setInputValues] = useState<{
		breweryName: string;
		formalName: string;
		countryId: number;
		prefectureId: number;
		address: string;
		access: string;
		storeInfoChecked: boolean[];
		storeInfoId: number[];
		image: string;
	}>({
		breweryName: '',
		formalName: '',
		countryId: 0,
		prefectureId: 0,
		address: '',
		access: '',
		storeInfoChecked: [],
		storeInfoId: [],
		image: '',
	});
	
	const handleChangestoreInfoChecked = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		const id  = Number(value);

		setInputValues((prevValues) => {
			const updatedstoreInfoChecked = [...prevValues.storeInfoChecked];
			updatedstoreInfoChecked[id - 1] = checked;
			const updatedstoreInfoId = checked
				? [...prevValues.storeInfoId, id]
				: prevValues.storeInfoId.filter((storeInfoId) => storeInfoId !== id);
			
			return { ...prevValues, storeInfoChecked: updatedstoreInfoChecked, storeInfoId: updatedstoreInfoId };
		});
	};


	// 取得した値をpost通信する
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = inputValues;
  
    try {
      const response = await apiClient.post('/breweries', requestData);
      console.log('ビール情報登録用のpostリクエストが成功しました。', response.data);
    } catch (e) {
      console.error('ビール情報登録用のpostリクエストが失敗しました。', e);
    }
  };
	
	return (
		<div>
			<h2>ブルワリー情報を登録</h2>
			<form onSubmit={handleSubmit}>
				<TextInput
					className='input input-sm input-bordered input-primary rounded-full w-full max-w-xs'
					label='ブルワリー名'
					name='breweryName'
					value={inputValues.breweryName}
					placeholder='ブルワリー名を入力してください'
					onChange={(e) => setInputValues({ ...inputValues, breweryName: e.target.value })}
				/>
				<TextInput
					className='input input-sm input-bordered input-primary rounded-full w-full max-w-xs'
					label='正式名称'
					name='formalName'
					value={inputValues.formalName}
					placeholder='正式名称を入力してください'
					onChange={(e) => setInputValues({ ...inputValues, formalName: e.target.value })}
				/>
				<SelectInputOption
					label='国'
					name='country'
					value={inputValues.countryId}
					options={renderBreweryDetailValue.country}
					onChange={(e) => setInputValues({ ...inputValues, countryId: Number(e.target.value) })}
				/>
				<SelectInputOption
					label='都道府県'
					name='prefecture'
					value={inputValues.prefectureId}
					options={renderBreweryDetailValue.prefecture}
					onChange={(e) => setInputValues({ ...inputValues, prefectureId: Number(e.target.value) })}
				/>
				<TextInput
					className='input input-sm input-bordered input-primary rounded-full w-full max-w-xs'
					label='住所'
					name='address'
					value={inputValues.address}
					placeholder='住所を入力してください'
					onChange={(e) => setInputValues({ ...inputValues, address: e.target.value })}
				/>
				<TextInput
					className='input input-sm input-bordered input-primary rounded-full w-full max-w-xs'
					label='アクセス'
					name='access'
					value={inputValues.access}
					placeholder='アクセス方法を入力してください'
					onChange={(e) => setInputValues({ ...inputValues, access: e.target.value })}
				/>
				<CheckboxInputOption
					label="醸造所詳細"
					name="storeInfo"
					value={inputValues.storeInfoId}
					checked={inputValues.storeInfoChecked}
					options={renderBreweryDetailValue.storeInfo}
					onChange={handleChangestoreInfoChecked}
				/>
				<h4>イメージ</h4>
				<button
					type="submit"
					className='btn btn-neutral'
				>
					ブルワリー情報を登録する
				</button>
			</form>
		</div>
	);
}

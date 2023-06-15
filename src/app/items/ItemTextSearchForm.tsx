'use client';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '../components/TextInput';

export default function ItemTextSearchForm() {
	const router = useRouter()
	const [inputKeyword, setInputKeyword] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

		try {
			const url = inputKeyword ? `/items/search?keyword=${inputKeyword}` : '/items/search';
			router.push(url);

		} catch(e) {
			console.error('キーワード検索のpost通信処理に失敗しました。', e);
		}

	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextInput
					label=''
					name='itemName'
					value={inputKeyword}
					placeholder='気になるキーワードでビールをサーチしよう'
					onChange={handleChange}
				/>
				<button type="submit" className='btn btn-sm btn-primary'>
					検索する
				</button>
			</form>
		</div>
	);
}

'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';

function BreweryDetail() {

  const [inputValue, setInputValue] = useState<string>('');
  const [fetchValue, setFetchValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/breweries', { value: inputValue });

      if (response.status === 200) {
        // リクエストが成功した場合の処理
        console.log('リクエストが成功しました。', response.data);
        const changeFetchValue = JSON.stringify(response.data);
        setFetchValue(changeFetchValue);
      } else {
        // リクエストが失敗した場合の処理
        console.error('リクエストが失敗しました。');
      }
    } catch (e) {
      // エラーハンドリング
      console.error('エラーが発生しました:', e);
    }

  };


  const [brewery, setBrewery] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function getData() {
    try {
      const response = await apiClient.get('/breweries/1');
      setBrewery(response.data.name);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isDataLoaded) {
      getData();
    }
  }, [isDataLoaded]);

  return (
    <>
      <div onClick={() => setIsDataLoaded(true)}>
        <h1>API_GET_TEST</h1>
        <h2 className="mb-5">Brewery Name: {brewery}</h2>
      </div>  
      <form onSubmit={handleSubmit}>
        <a>ブルワリー名</a>
        <input type="text" value={inputValue} onChange={handleChange} className='mb-1 text-black' />
        <p>入力値：{inputValue}</p>
        <button type="submit">API_POST_TEST</button>
        <a>返ってきた値： {fetchValue}</a>
      </form>
    </>
  );
}

export default BreweryDetail;


//   apiClient.get('/breweries/1')
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }








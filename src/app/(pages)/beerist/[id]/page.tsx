'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../utils/api';

interface BuildUser {
  user_id: number;
  user_name: string;
  email: string;
  avatar: string;
  // item_id: number;
  // item_name: string;
  // country: string;
  // prefecture: string;
  // color: string;
  // style: string;
  // abv: string;
  // type: string;
  // brewery: string;
  // tastes: string[];
  // containers: string[];
}

export default function User({ params }: { params: { id: number } }) {
  const { id } = params;
  const [buildUser, setBuildUser] = useState<BuildUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/users/${id}`);
        const responseData: BuildUser = response.data.data;
        console.log('APIリクエスト: get(`/users/${id}`) に成功しました。', responseData);
        setBuildUser(responseData);

      } catch (e) {
        console.error('APIリクエスト: get(`/users/${id}`) に失敗しました。', e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>My Post: {params.id}</h2>
      <h2>取得した値</h2>
      {buildUser ? (
        <div className='w-auto bg-base-100 shadow-xl my-2 p-4'>
          <div>{buildUser.user_name}</div>
            <div className='avatar'>
              <div className="w-24 rounded-full">
                <img src={buildUser.avatar} />
              </div>
            </div>
          {/* <div>{buildUser.item_name}</div>
          <div>{buildUser.country}</div>
          <div>{buildUser.prefecture}</div>
          <div>{buildUser.color}</div>
          <div className='badge badge-lg badge-accent rounded-none'>{buildUser.style}</div>
          <div>{buildUser.type}</div>
          <div>{buildUser.abv}</div>
          <div>{buildUser.brewery}</div>
          {buildUser.tastes.map((taste, i) => (
            <div key={i} className='badge badge-primary'>
              {taste}
            </div>
          ))}
          {buildUser.containers.map((container, i) => (
            <div key={i} className='badge badge-outline'>
              {container}
            </div>
          ))} */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

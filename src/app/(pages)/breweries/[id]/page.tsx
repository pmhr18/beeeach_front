'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../utils/api';

interface BuildBrewery {
  brewery_id: number;
	brewery_name: string;
	formal_name: string;
	store_info: string[];
	address: string;
	access: string;
	country: string;
	prefecture: string;
	items: BuildBreweryItems[];
}

interface BuildBreweryItems {
	item_id: number;
	item_name: string;
	style: string;
}

export default function Item({ params }: { params: { id: number } }) {
  const { id } = params;
  const [buildBrewery, setBuildBrewery] = useState<BuildBrewery | null>(null);
  const [buildBreweryItems, setBuildBreweryItems] = useState<BuildBreweryItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/breweries/${id}`);
        const responseData: BuildBrewery = response.data.data;
        console.log('APIリクエスト: get(`/breweries/${id}`) に成功しました。', responseData);
				setBuildBrewery(responseData);
				setBuildBreweryItems(responseData.items);
      } catch (e) {
        console.error('APIリクエスト: get(`/breweries/${id}`) に失敗しました。', e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>My Post: {params.id}</h2>
      <h2>取得した値</h2>
      {buildBrewery ? (
        <div className='w-auto bg-base-100 shadow-xl my-2 p-4'>
          <div>{buildBrewery.brewery_name}</div>
          <div>{buildBrewery.formal_name}</div>
          {buildBrewery.store_info.map((store_info, i) => (
            <div key={i} className='badge badge-primary'>
              {store_info}
            </div>
          ))}
          <div>{buildBrewery.address}</div>
          <div>{buildBrewery.access}</div>
          <div>{buildBrewery.country}</div>
          <div>{buildBrewery.prefecture}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

			<div className="carousel rounded-box w-6/12 flex">
				{buildBreweryItems.map((buildbreweryItem) => (
          <div key={buildbreweryItem.item_id} className='carousel-item w-48 bg-base-100 shadow-xl m-2 p-4'>
              <div className='badge badge-lg badge-accent rounded-none'>{buildbreweryItem.style}</div>
              <div>{buildbreweryItem.item_name}</div>
          </div>
        ))}
			</div>
    </div>
  );
}

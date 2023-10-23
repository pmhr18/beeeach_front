'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ItemKeywordSearchForm from '../components/features/items/ItemKeywordSearchForm';
import CarouselItem from '../components/features/items/CarouselItem';

export default function Home() {
  return (
    <main className=''>
      <div>
        <ItemKeywordSearchForm />
        <div className='my-20'></div>
          <div className='max-w-full gap-2 carousel rounded-box'>

            <CarouselItem
              item_id={1}
              item_name={'よなよなエール'}
              brewery={'ヤッホーブルーイング'}
              style={'ペールエール'}
              image_url={'/test.jpg'}
              width={320}
              height={240}              
            />
            
          </div>
      </div>
    </main>
  )
}

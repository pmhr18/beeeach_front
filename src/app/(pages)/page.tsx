'use client';
import Image from 'next/image';
import Link from 'next/link'
import ItemKeywordSearchForm from '../components/features/items/ItemKeywordSearchForm';

export default function Home() {

	

  return (
    <main className="">
      <div>
        <ItemKeywordSearchForm />
        <div>
          <Link href="/login">
            <button 
              type="submit" 
              className='btn btn-outline'
            >
              ログインページへ
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

'use client';
import Link from 'next/link'
import ItemTextSearchForm from '../../features/components/items/ItemTextSearchForm';
import ItemSearchConditionForm from '../../features/components/items/ItemSearchConditionForm';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <ItemTextSearchForm />
      <label htmlFor="search_modal" className="btn">open search modal</label>
      <input type="checkbox" id="search_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <ItemSearchConditionForm />
          </div>
          <label className="modal-backdrop" htmlFor="search_modal"></label>
        </div>
      <Link href="/items/new">
        <button className='btn btn-sm btn-primary'>登録する</button>
      </Link>
    </div>
  )
}



'use client';
import Link from 'next/link'
import Image from 'next/image';
// import { useEffect, useState } from 'react';
import ItemSearchConditionForm from '../items/ItemSearchConditionForm';

export default function Header() {

	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

	return (
    <div className="fixed lg:static navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<Link href="/about">
								beeeachについて
							</Link>
						</li>
						<li>
							<Link href="/items/new">
								ビール情報を登録する
							</Link>
						</li>
          </ul>
        </div>
				<div className="hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link href="/about">
								beeeachについて
							</Link>
						</li>
						<li>
							<Link href="/items/new">
								ビール情報を登録する
							</Link>
						</li>
					</ul>
				</div>
      </div>
      
			<div className="navbar-center">
				<Link href="/">
					<Image
						src="/logo_beer.svg"
						alt="beeeach Logo"
						width={48}
						height={48}
						priority
					/>
				</Link>
      </div>

      <div className="navbar-end">
				<label htmlFor="search_modal" className="btn btn-ghost btn-circle">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</label>
				<input type="checkbox" id="search_modal" className="modal-toggle"/>
					<div className="modal">
						<div className="modal-box w-11/12 max-w-5xl">
							<ItemSearchConditionForm />
						</div>
					<label className="modal-backdrop" htmlFor="search_modal"></label>
					</div>

				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
						<span className="badge badge-xs badge-primary indicator-item"></span>
					</div>
				</button>
      </div>
    </div>
  );
}

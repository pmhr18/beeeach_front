'use client';
// import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
						<FontAwesomeIcon icon={faBarsStaggered} className="fa-lg" />
					</label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<Link href="/login">
								ログイン
							</Link>
						</li>
						<li>
							<Link href="/login">
								新規登録
							</Link>
						</li>
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

				<div className="hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link href="/login">
								ログイン
							</Link>
						</li>
						<li>
							<Link href="/login">
								新規登録
							</Link>
						</li>
					</ul>
				</div>

				<label htmlFor="search_modal" className="btn btn-ghost btn-circle">
					<FontAwesomeIcon icon={faMagnifyingGlass} className="fa-lg" />
				</label>
				<input type="checkbox" id="search_modal" className="modal-toggle"/>
					<div className="modal">
						<div className="modal-box w-11/12 max-w-5xl">
							<ItemSearchConditionForm />
						</div>
					<label className="modal-backdrop" htmlFor="search_modal"></label>
					</div>

					<button className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<img src="/IMG_6868.jpeg" />
					</div>
				</button>

      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { apiClient } from '../../../utils/api';
import ItemSearchConditionForm from '../items/ItemSearchConditionForm';

interface FetchUserValue {
	user_id: number;
	user_name: string;
	email: string;
	avatar: string;
}

export default function Header() {

	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

	const [fetchUserValue, setFetchUserValue] = useState<FetchUserValue[]>([]);

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('token');
    return token !== null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = checkLoginStatus();
        console.log('ログイン状態:', isLoggedIn);
				const id = sessionStorage.getItem('id');
				console.log(id);
				const response = await apiClient.get(`/users/${id}`);
				const responseData: FetchUserValue = response.data.data;
				console.log(responseData);
				setFetchUserValue(responseData);
      } catch (e) {
        console.error('エラー:', e);
      }
    };

    fetchData();
  }, []);

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		// ログアウト後の処理
		window.location.href = '/';
	};

	return (
    <div className="fixed lg:static navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<FontAwesomeIcon icon={faBarsStaggered} className="fa-lg" />
					</label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						{checkLoginStatus() ? null : (
							<>
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
							</>
						)}
						<li>
							<Link href="/about">
								beeeachについて
							</Link>
						</li>
						{checkLoginStatus() ? (
							<li>
								<Link href="/items/new">
									ビール情報を登録する
								</Link>
							</li>
						) : null}
          </ul>
        </div>
				<div className="hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link href="/about">
								beeeachについて
							</Link>
						</li>
						{checkLoginStatus() ? (
						<li>
							<Link href="/items/new">
								ビール情報を登録する
							</Link>
						</li>
						) : null}
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

			{checkLoginStatus() ? null : (
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
				)}

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

				{checkLoginStatus() ? (
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src={fetchUserValue.avatar} />
								{/* <img src="/IMG_6868.jpeg" /> */}
							</div>
						</label>
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><a>マイページ</a></li>
						<li onClick={handleLogout}><a>ログアウト</a></li>
						</ul>
					</div>
				) : null}

      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faLine } from '@fortawesome/free-brands-svg-icons'
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { apiClient } from '../../utils/api';

export default function Login() {
  const [loading, setLoading] = useState(false);

  // Appleでサインアップを実装予定
  // const appleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await apiClient.get('/login/google');
  //     window.location.href = response.data;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/login/google');
      window.location.href = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const lineLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/login/line');
      window.location.href = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  // Twitterでサインアップを実装予定
  // const twitterLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await apiClient.get('/login/twitter');
  //     window.location.href = response.data;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className='mx-auto card w-auto py-10 sm:w-[32rem] bg-base-100 shadow-xl'>
      <div className='card-body'>
        <Link href="/">
          <figure>
            <Image
              src="/logo_beer.svg"
              alt="beeeach Logo"
              width={128}
              height={128}
              priority
            />
          </figure>
				</Link>
        <div className="tabs tabs-boxed mx-auto my-10">
          <a className="tab">サインイン</a> 
          <a className="tab tab-active">サインアップ</a>
        </div>
        <div className='font-semibold mx-auto my-3'>SNSアカウントでサインアップ</div>
          {loading ? 
            <span className="mx-auto my-2 loading loading-spinner loading-md text-accent"></span>
            : 
            <>
              {/* <button className='btn border-apple bg-base-100 text-apple hover:border-apple hover:bg-apple hover:text-base-100 flex' onClick={appleLogin} disabled={loading}>
                <div className='flex-one'><FontAwesomeIcon icon={faApple} className='fa-xl color-apple hover:color-base-100' /></div>
                <div className='grow'>Appleでサインアップ</div>
                <div className='flex-one'></div>
              </button> */}
              <button className='btn border-google bg-base-100 text-google hover:border-google hover:bg-google hover:text-base-100 flex' onClick={googleLogin} disabled={loading}>
                <div className='flex-one'><FontAwesomeIcon icon={faGoogle} className='fa-xl color-google hover:color-base-100' /></div>
                <div className='grow'>Googleでサインアップ</div>
                <div className='flex-one'></div>
              </button>
              <button className='btn border-line bg-base-100 text-line hover:border-line hover:bg-line hover:text-base-100 flex' onClick={lineLogin} disabled={loading}>
                <div className='flex-one'><FontAwesomeIcon icon={faLine} className='fa-xl color-line hover:color-base-100' /></div>
                <div className='grow'>LINEでサインアップ</div>
                <div className='flex-one'></div>
              </button>
              {/* <button className='btn border-twitter bg-base-100 text-twitter hover:border-twitter hover:bg-twitter hover:text-base-100 flex' onClick={twitterLogin} disabled={loading}> */}
                {/* <div className='flex-one'><FontAwesomeIcon icon={faTwitter} className='fa-xl color-twitter hover:color-base-100' /></div> */}
                {/* <div className='grow'>Twitterでサインアップ</div> */}
                {/* <div className='flex-one'></div> */}
              {/* </button> */}
            </>
          }
        <div className='text-sm mt-2'>
          アカウントを新規登録するにあたり、<Link href="/terms" className='link link-hover'>利用規約</Link>及び<Link href="/privacy" className='link link-hover'>プライバシーポリシー</Link>に同意するものとします。
        </div>
      </div>
    </div>
  );
}

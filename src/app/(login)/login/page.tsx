'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { apiClient } from '../../utils/api';
import LogoBeer from '../../components/common/LogoBeer';

import SigninContent from '../../components/features/login/SigninContent';
import SignupContent from '../../components/features/login/SignupContent';

import { Suspense } from "react";
import dynamic from 'next/dynamic'
// import Loading from '../../components/common/Loading';

// const SigninContent = dynamic(() => import('../../components/features/login/SigninContent'))
// const SignupContent = dynamic(() => import('../../components/features/login/SignupContent'))
// const Loading = lazy(() => import('../../components/common/Loading'))
const Loading = dynamic(() => import('../../components/common/Loading'))

export default function Login() {
  const searchParams = useSearchParams();
  const width = 128;
  const height = 128;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initTabParam = searchParams.get('show');
        if (initTabParam) {
          setSigninTabActive(initTabParam === 'signin' ? true : false);
        }

      } catch (e) {
        console.error('ビール情報表示用のpostリクエストが失敗しました。', e);

      }
    };
    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);

  const [signinTabActive, setSigninTabActive] = useState(false);
  const handleTabClick = () => {
    setSigninTabActive(!signinTabActive);
  };

  // 各ソーシャルログインへのgetリクエスト
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
  const twitterLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/login/twitter');
      window.location.href = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <Suspense fallback={<Loading />}>
    <div className='mx-auto card w-auto py-10 sm:w-[32rem] bg-base-100 shadow-xl'>
      <div className='card-body'>

        <figure>
          {loading ? <LogoBeer width={width} height={height} /> : 
            <Link href="/">
              <LogoBeer width={width} height={height} />
            </Link>
          }
        </figure>

        {loading ?
          <>
            <span className="mx-auto my-2 text-accent"></span>
            <span className="mx-auto my-2 loading loading-spinner loading-md text-accent"></span> 
          </>:
          <>
            {signinTabActive ? 
              <SigninContent 
                tabClick={handleTabClick}
                googleLogin={googleLogin}
                lineLogin={lineLogin}
                twitterLogin={twitterLogin}
              /> : 
              <SignupContent 
                tabClick={handleTabClick}
                googleLogin={googleLogin}
                lineLogin={lineLogin}
                twitterLogin={twitterLogin}
              />
            }
          </>
        }
      </div>
    </div>
    </Suspense>
    </>
  );
}

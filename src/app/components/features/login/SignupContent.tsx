import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface ClickEvent {
  tabClick: () => void;
  googleLogin: () => void;
  lineLogin: () => void;
  twitterLogin: () => void;
}

export default function SignupContent({ tabClick, googleLogin, lineLogin, twitterLogin }: ClickEvent) {
  return (
    <>
      <div className="tabs tabs-boxed mx-auto my-10">
        <a className="tab" onClick={tabClick}>ログイン</a>
        <a className="tab tab-active">新規登録</a>
      </div>
      <div className="font-semibold mx-auto my-3">SNSアカウントで新規登録</div>
      <button
        className="btn border-google bg-base-100 text-google hover:border-google hover:bg-google hover:text-base-100 flex"
        onClick={googleLogin}
      >
        <div className="flex-one">
          <FontAwesomeIcon
            icon={faGoogle}
            className="fa-xl color-google hover:color-base-100"
          />
        </div>
        <div className="grow">Googleで新規登録</div>
        <div className="flex-one"></div>
      </button>
      <button
        className="btn border-line bg-base-100 text-line hover:border-line hover:bg-line hover:text-base-100 flex"
        onClick={lineLogin}
      >
        <div className="flex-one">
          <FontAwesomeIcon
            icon={faLine}
            className="fa-xl color-line hover:color-base-100"
          />
        </div>
        <div className="grow">LINEで新規登録</div>
        <div className="flex-one"></div>
      </button>
      <button
        className="btn border-twitter bg-base-100 text-twitter hover:border-twitter hover:bg-twitter hover:text-base-100 flex"
        onClick={twitterLogin}
      >
        <div className="flex-one">
          <FontAwesomeIcon
            icon={faTwitter}
            className="fa-xl color-twitter hover:color-base-100"
          />
        </div>
        <div className="grow">Twitterで新規登録</div>
        <div className="flex-one"></div>
      </button>
      <div className="text-sm mt-2">
        アカウントを新規登録するにあたり、
        <Link href="/terms" className="link link-hover">
          利用規約
        </Link>
        及び
        <Link href="/privacy" className="link link-hover">
          プライバシーポリシー
        </Link>
        に同意するものとします。
      </div>
    </>
  );
}
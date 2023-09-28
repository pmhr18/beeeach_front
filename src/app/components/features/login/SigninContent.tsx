import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface ClickEvent {
  tabClick: () => void;
  googleLogin: () => void;
  lineLogin: () => void;
  twitterLogin: () => void;
}

export default function SigninContent({ tabClick, googleLogin, lineLogin, twitterLogin }: ClickEvent) {
  return (
    <>
      <div className="tabs tabs-boxed mx-auto my-10">
        <a className="tab tab-active">ログイン</a>
        <a className="tab" onClick={tabClick}>新規登録</a>
      </div>
      <div className="font-semibold mx-auto my-3">SNSアカウントでログイン</div>
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
        <div className="grow">Googleでログイン</div>
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
        <div className="grow">LINEでログイン</div>
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
        <div className="grow">Twitterでログイン</div>
        <div className="flex-one"></div>
      </button>
    </>
  );
}
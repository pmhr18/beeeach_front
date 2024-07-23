'use client';
import Link from 'next/link'
import Image from 'next/image';

export default function Footer() {

	return (
		<footer className='bg-secondary-focus text-base-100'>
			<div className='container mx-auto px-6 md:px-24 xl:px-48'>
				<div className="footer grid-rows-2 py-10">
					<div>
						<span className="footer-title">beeeachについて</span> 
						<Link href="/about" className='link link-hover'>beeeachとは</Link>
						<Link href="/us" className='link link-hover'>運営者について</Link>
					</div>
					<div>
						<span className="footer-title">ビールを探す</span>
						<Link href="/items/search" className='link link-hover'>ビールを検索する</Link>
						<Link href="/items/new" className='link link-hover'>ビール情報を登録する</Link>
						<Link href="/breweries/new" className='link link-hover'>ブルワリー情報を登録する</Link>
					</div>
					<div>
						<span className="footer-title">ビールを知る</span> 
						<a className="link link-hover">スタイルを知る</a> 
						<a className="link link-hover">指数を知る</a> 
						<a className="link link-hover">楽しみ方を知る</a>
					</div>
					<div>
						<span className="footer-title">ガイドライン</span> 
						<Link href="/terms" className='link link-hover'>利用規約</Link>
						<Link href="/privacy" className='link link-hover'>プライバシーポリシー</Link>
						<Link href="/browser" className='link link-hover'>推奨環境</Link>
					</div>
					<div>
						<span className="footer-title">お問い合わせ</span> 
						<a className="link link-hover">よくある質問</a> 
						<a className="link link-hover">お問い合せフォーム</a> 
					</div>
				</div>
				<div className="footer py-10">
					<div className='mx-auto md:mx-0'>
						<Link href="/">
							<Image
							src="/logo_bubble.svg"
							alt="beeeach Logo"
							width={150}
							height={150}
							priority
							/>
						</Link>
						<p className='mx-auto md:mx-0'>© beeeach</p>
					</div> 
					<div className='md:ml-auto'>
						<span className="md:w-2/5 md:ml-auto footer-title">ストップ！20歳未満飲酒・飲酒運転。妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります。</span> 
					</div>
				</div>
			</div>
		</footer>
	);
}

import Image from 'next/image';

interface LogoDetailProps {
	width: number;
	height: number;
}

export default function LogoBeer ({width, height}: LogoDetailProps ) {
	return (
		<Image
			src="/logo_beer.svg"
			alt="beeeach Logo"
			width={width}
			height={height}
			priority
		/>
	)
}
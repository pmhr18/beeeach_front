export default function Loading () {
	return (
		<>
			<div className="inset-0 absolute w-screen h-screen z-50 backdrop-blur">
				<div className="h-screen w-screen flex justify-center items-center">
				<span className="loading loading-lg loading-spinner text-accent"></span>
				</div>
			</div>
		</>
	);
}
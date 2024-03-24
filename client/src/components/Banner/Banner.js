function Banner( {imgSrc} ) {
	return (
		<div className="h-[500px] overflow-hidden flex items-center">
			<img className="object-fill h-full w-full" src={imgSrc} />
		</div>
	);
}

export default Banner;

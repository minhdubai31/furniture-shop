function Banner( {imgSrc} ) {
	return (
		<div className="h-[500px] overflow-hidden flex items-center">
			<img loading="lazy" className="object-cover h-full w-full" src={imgSrc} />
		</div>
	);
}

export default Banner;

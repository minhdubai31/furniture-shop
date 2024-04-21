import { useLocation, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import nl2br from 'react-nl2br';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import ProductVisitedContext from '../../context/ProductVisitedProvider';
import CartContext from '../../context/CartProvider';

import ProductCard from '../../components/ProductCard';
import DeleteButton from '../../components/DeleteButton';
import RelativeTime from '../../components/RelativeTime';

import ProductService from '../../services/ProductService';
import CartService from '../../services/CartService';

function ProductDetail() {
	const { setCartNumber } = useContext(CartContext);
	const { auth } = useAuth();

	const { updateCart } = CartService();
	const { addComment, deleteComment, getProduct } = ProductService();
	const { visitedProducts, setVisitedProducts } = useContext(
		ProductVisitedContext
	);
	const location = useLocation();
	const [product, setProduct] = useState(location.state);
	const [quantity, setQuantity] = useState(1);
	const [index, setIndex] = useState(-1);
	const [comment, setComment] = useState('');
	const [repComment, setRepComment] = useState('');

	const photos = product?.gallery.map((image) => {
		return {
			src: process.env.REACT_APP_BACKEND_SERVER + image?.path,
			width: image?.width,
			height: image?.height,
		};
	});

	const fetchProduct = async (id) => {
		try {
			setProduct(await getProduct(id));
		} catch (error) {
			console.log(error);
		}
	};

	const addCommentHandler = async (e, id, comment, repId) => {
		e.preventDefault();
		if (repId) {
			setRepComment('');
			document
				.querySelectorAll('.replyBox')
				.forEach((replyBox) => replyBox.classList.add('hidden'));
		}
		try {
			setComment('');
			await addComment(id, comment, repId);
			fetchProduct(id);
		} catch (error) {
			console.log(error);
		}
	};

	const addToCartHandler = async (productId, amount) => {
		try {
			setCartNumber((prev) => prev + amount);
			await updateCart(productId, amount, false);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteCommentHandler = async (id) => {
		try {
			await deleteComment(id);
			fetchProduct(product.id);
		} catch (error) {
			console.log(error);
		}
	};

	const showReplyBox = (e) => {
		document
			.querySelectorAll('.replyBox')
			.forEach((replyBox) => replyBox.classList.add('hidden'));
		if (e.target.parentElement.querySelector('.replyBox'))
			e.target.parentElement
				.querySelector('.replyBox')
				?.classList.remove('hidden');
		else
			e.target.parentElement.parentElement
				.querySelector('.replyBox')
				?.classList.remove('hidden');
	};

	useEffect(() => {
		fetchProduct(product.id);

		setVisitedProducts((prevState) => [
			product,
			...prevState.filter((prod) => prod.id != product.id),
		]);
	}, []);

	return (
		<div className="bg-gray-100 py-5">
			<div className="w-[1280px] m-auto bg-white border rounded-md p-12">
				<div className="flex gap-10">
					<div className="w-[350px]">
						<img
							loading="lazy"
							className="aspect-square rounded-md border object-cover"
							src={
								product.image &&
								process.env.REACT_APP_BACKEND_SERVER +
									product.image?.path
							}
							alt={product.name}
						/>
					</div>
					<div>
						<h2 className="text-5xl mb-4">{product.name}</h2>
						<p>Brand: {product.brand?.name}</p>
						<p className="mb-5">
							Danh mục: {product.category?.name}
						</p>
						{product?.salePrice && (
							<p className="text-xl line-through text-zinc-400">
								{product.price.toLocaleString('vi-VN')}đ
							</p>
						)}
						<p className="text-3xl mt-1 mb-5">
							{product?.salePrice
								? product.salePrice?.toLocaleString('vi-VN')
								: product.price?.toLocaleString('vi-VN')}
							đ
						</p>
						{product.remainingAmount < 1000 && (
							<p className="text-xs mb-1 text-red-600 font-semibold">
								Còn {product.remainingAmount} sản phẩm
							</p>
						)}
						<div className="py-2 px-3 bg-white border border-gray-300 rounded-lg inline-block w-64">
							<div className="w-full flex justify-between items-center gap-x-5">
								<div className="grow">
									<span className="block text-xs text-gray-500">
										Số lượng
									</span>
									<input
										className="w-full p-0 bg-transparent border-0 text-gray-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
										type="number"
										value={quantity}
										min={1}
										max={product.remainingAmount}
										onChange={(e) =>
											setQuantity(
												e.target.value >
													product.remainingAmount
													? product.remainingAmount
													: e.target.value < 1
													? 1
													: e.target.value
											)
										}
									/>
								</div>
								<div className="flex justify-end items-center gap-x-1.5">
									<button
										type="button"
										onClick={(e) =>
											setQuantity(
												quantity > 2 ? quantity - 1 : 1
											)
										}
										className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
									>
										<svg
											className="flex-shrink-0 size-3.5"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M5 12h14"></path>
										</svg>
									</button>
									<button
										type="button"
										onClick={(e) =>
											setQuantity(
												quantity <
													product.remainingAmount
													? quantity + 1
													: product.remainingAmount
											)
										}
										className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
									>
										<svg
											className="flex-shrink-0 size-3.5"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M5 12h14"></path>
											<path d="M12 5v14"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div className="mt-4 w-64 flex gap-5 bottom-4 duration-200">
							<button
								onClick={(e) =>
									addToCartHandler(product.id, quantity)
								}
								className="p-2 px-8 rounded-md  text-black hover:bg-black hover:text-white duration-150 border border-gray-500"
							>
								<FontAwesomeIcon icon={faCartPlus} />
							</button>
							<Link
								to={'/payment?buynow=true'}
								state={[{ product: product, amount: quantity }]}
								className="flex-grow text-center p-2 rounded-md bg-black text-white border border-zinc-800 hover:bg-zinc-600 duration-150"
							>
								Mua ngay
							</Link>
						</div>
					</div>
				</div>
				<div className="pt-10">
					<p className="font-bold">Thông tin</p>
					<p>{nl2br(product.description)}</p>
					<p className="font-bold mt-8">Ảnh sản phẩm</p>
					<PhotoAlbum
						layout="rows"
						onClick={({ index }) => setIndex(index)}
						photos={photos}
					/>
					<div className="flex gap-10">
						<div className="flex-grow">
							<form
								method="post"
								onSubmit={(e) =>
									addCommentHandler(e, product.id, comment)
								}
							>
								<p className="font-bold mt-8 ms-1">Bình luận</p>
								<textarea
									id="comment"
									name="comment"
									className="p-3 border border-gray-300 rounded-md focus:outline-none w-full"
									placeholder="Để lại bình luận..."
									disabled={auth ? false : true}
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								></textarea>
								<button className="p-2 mb-5 rounded-md bg-black text-white border border-gray-500 hover:bg-zinc-600 duration-150">
									Bình luận
								</button>
							</form>
							{product.comments?.toReversed().map(
								(comment) =>
									!comment.replyCommentId && (
										<div className="my-4" key={comment.id}>
											<p className="font-bold">
												{comment.user.name}{' '}
												<span className="text-xs text-gray-400 font-normal">
													-{' '}
													<RelativeTime
														date={
															new Date(
																comment.createdAt
															)
														}
													/>
												</span>
											</p>
											<p className="text-sm">
												{comment.content}
											</p>
											<span
												className="font-semibold text-[11px] text-gray-400 mt-1 hover:text-black cursor-pointer"
												onClick={showReplyBox}
											>
												Phản hồi
											</span>
											{auth?.id == comment.user.id && (
												<DeleteButton
													description="Bạn chắc chắn muốn xóa bình luận này?"
													item={comment}
													deletefn={
														deleteCommentHandler
													}
													type="text"
													customClass={
														'ms-4 font-semibold text-[11px] text-gray-400 mt-1 hover:text-red-600 cursor-pointer inline-block'
													}
												/>
											)}
											<form
												className="hidden replyBox"
												method="post"
												onSubmit={(e) =>
													addCommentHandler(
														e,
														product.id,
														repComment,
														comment.id
													)
												}
											>
												<textarea
													name="repComment"
													className="p-3 border border-gray-300 rounded-md focus:outline-none w-3/4 block mb-1.5"
													placeholder="Phản hồi..."
													disabled={
														auth ? false : true
													}
													value={repComment}
													onChange={(e) =>
														setRepComment(
															e.target.value
														)
													}
												></textarea>
												<button className="p-2 rounded-md bg-black text-white border border-gray-500 hover:bg-zinc-600 duration-150">
													Phản hồi
												</button>
												<button
													onClick={(e) => {
														e.preventDefault();
														document
															.querySelectorAll(
																'.replyBox'
															)
															.forEach(
																(replyBox) =>
																	replyBox.classList.add(
																		'hidden'
																	)
															);
													}}
													className="p-2 ms-1 rounded-md bg-red-600 text-white border border-red-500 hover:bg-red-800 cursor-pointer duration-150"
												>
													Hủy
												</button>
											</form>
											{/* REPLY */}
											{comment.reply &&
												comment.reply?.map((rep) => (
													<div
														className="my-4 ms-10"
														key={rep.id}
													>
														<p className="font-bold">
															{rep.user.name}{' '}
															<span className="text-xs text-gray-400 font-normal">
																-{' '}
																<RelativeTime
																	date={
																		new Date(
																			rep.createdAt
																		)
																	}
																/>
															</span>
														</p>
														<p className="text-sm">
															{rep.content}
														</p>
														<span
															className="text-xs text-gray-400 mt-1 hover:text-black cursor-pointer"
															onClick={
																showReplyBox
															}
														>
															Phản hồi
														</span>
														{auth?.id ==
															rep.user.id && (
															<DeleteButton
																description="Bạn chắc chắn muốn xóa bình luận này?"
																item={rep}
																deletefn={
																	deleteCommentHandler
																}
																type="text"
																customClass={
																	'ms-4 font-semibold text-[11px] text-gray-400 mt-1 hover:text-red-600 cursor-pointer inline-block'
																}
															/>
														)}
														<form
															className="hidden replyBox"
															method="post"
															onSubmit={(e) =>
																addCommentHandler(
																	e,
																	product.id,
																	repComment,
																	comment.id
																)
															}
														>
															<textarea
																name="repComment"
																className="p-3 border border-gray-300 rounded-md focus:outline-none w-3/4 block mb-1.5"
																placeholder="Phản hồi..."
																disabled={
																	auth
																		? false
																		: true
																}
																value={
																	repComment
																}
																onChange={(e) =>
																	setRepComment(
																		e.target
																			.value
																	)
																}
															></textarea>
															<button className="p-2 rounded-md bg-black text-white border border-gray-500 hover:bg-zinc-600 duration-150">
																Phản hồi
															</button>
															<button
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	document
																		.querySelectorAll(
																			'.replyBox'
																		)
																		.forEach(
																			(
																				replyBox
																			) =>
																				replyBox.classList.add(
																					'hidden'
																				)
																		);
																}}
																className="p-2 ms-1 rounded-md bg-red-600 text-white border border-red-500 hover:bg-red-800 cursor-pointer duration-150"
															>
																Hủy
															</button>
														</form>
													</div>
												))}
										</div>
									)
							)}
						</div>
						<div className="w-1/4">
							<p className="font-bold mt-8 ms-4">
								Sản phẩm bạn đã xem gần đây
							</p>
							{visitedProducts?.map((prod) => {
								if (prod.id != product.id)
									return (
										<ProductCard
											key={prod.id}
											product={prod}
										/>
									);
							})}
						</div>
					</div>
				</div>
			</div>

			<Lightbox
				slides={photos}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				// enable optional lightbox plugins
				plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
			/>
		</div>
	);
}

export default ProductDetail;

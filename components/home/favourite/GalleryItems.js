import { Icon } from '@iconify/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from "react-query";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loaderIcon from '../../../assets/images/icons/double-ring.svg';
import premium from '../../../assets/images/icons/noun-premium.svg';
import { modalOpen } from '../../../redux/features/board/boardSlice';
import { favouriteStore } from '../../../redux/features/Favourite/favouriteSlice';

const fetchProducts = async (id) => {
  return await axios.get(`/most-download-products/${id}`)
}
const GalleryItems = ({ id }) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const { isLoading, data } = useQuery(["most-favourite", id], () => fetchProducts(id))

  if (isLoading) {
    return (<div className='loading-gif'>
      <img src={loaderIcon} alt="icon" />
    </div>)
  }
  const { products } = data?.data
  return (
    <div className="row g-4 gallery">
      {products.length === 0 ? (<h2 className='text-center pt-5'>{t("No Data Found")}</h2>) : products.map(({ id, thumbnail_image, slug, accessibility, product_type_id, main_file, favourite_by_auth_customer }) => (<div key={id} className="col-md-6 col-xl-4">
        {product_type_id === 5 ? (<div className='audioContainer'>
          <div className='audioImgContainer'>
            {accessibility === 1 && (
              <div className="premium-icon">
                <img src={premium} alt="icon" />
              </div>)}
            <Link className='product-link' to={`/product-details/${slug}`}>
              <img className='audio-img' src={thumbnail_image} alt="img" />
            </Link>
            <div className="product-btns">
              <button onClick={(e) => dispatch(favouriteStore({ product_id: id, target: e.currentTarget }))} className={`favorite ${favourite_by_auth_customer ? "fill" : ""}`}>
                <Icon icon="ant-design:heart-filled" className='filled' color='red' width="20" height="20" />
                <Icon icon="ant-design:heart-outlined" className='outlined' width="20" height="20" />
              </button>
              <button onClick={() => dispatch(modalOpen())} className="btn-save">+ {t("Save")} </button>
            </div>
          </div>
          <audio controls controlsList="nodownload noplaybackrate">
            <source src={main_file} type="audio/mpeg" />
          </audio>
        </div>) : product_type_id === 3 ? (<div className='videoContainer'>
          {accessibility === 1 && (
            <div className="premium-icon">
              <img src={premium} alt="icon" />
            </div>)}
          <Link className='product-link' to={`/product-details/${slug}`}>
            <video onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} className='video' width="100%" height="100%">
              <source src={main_file} type="video/mp4" />
            </video>
          </Link>
          <div className="product-btns">
            <button onClick={(e) => dispatch(favouriteStore({ product_id: id, target: e.currentTarget }))} className={`favorite ${favourite_by_auth_customer ? "fill" : ""}`}>
              <Icon icon="ant-design:heart-filled" className='filled' color='red' width="20" height="20" />
              <Icon icon="ant-design:heart-outlined" className='outlined' width="20" height="20" />
            </button>
            <button onClick={() => dispatch(modalOpen())} className="btn-save">+ {t("Save")} </button>
          </div>
        </div>) : (<div className="imgContainer">
          {accessibility === 1 && (
            <div className="premium-icon">
              <img src={premium} alt="icon" />
            </div>)}
          <Link className='product-link' to={`/product-details/${slug}`}>
            <img className='product-img' src={thumbnail_image} alt="" />
          </Link>
          <div className="product-btns">
            <button onClick={(e) => dispatch(favouriteStore({ product_id: id, target: e.currentTarget }))} className={`favorite ${favourite_by_auth_customer ? "fill" : ""}`}>
              <Icon icon="ant-design:heart-filled" className='filled' color='red' width="20" height="20" />
              <Icon icon="ant-design:heart-outlined" className='outlined' width="20" height="20" />
            </button>
            <button onClick={() => dispatch(modalOpen())} className="btn-save">+ {t("Save")} </button>
          </div>
        </div>)}
      </div>))}
    </div>
  )
}

export default GalleryItems;
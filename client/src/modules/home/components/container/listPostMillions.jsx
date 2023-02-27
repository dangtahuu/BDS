import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Empty } from 'antd';
import { Link } from 'react-router-dom';

import { FormatMoney } from "../../../../helpers/formatCurrency"
import { getFullAddress } from '../../../../helpers/formatAddress';
import { slug } from '../../../../helpers/slug'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostActions } from "../../../post/redux/actions"

SwiperCore.use([EffectCoverflow, Pagination]);

const ListPostMillion = (props) => {
    const { post } = props
    const [queryData, setQueryData] = useState({
        limit: 100,
        page: 1,
        status: 2,
    })
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])
    return <React.Fragment>
        <div
            className="section home-properties"
        >
            <div className="home-properties__banner">
                <img
                    className="home-properties__banner"
                    src="https://nhaphonet.vn/wp-content/themes/nhaphonet/vendor-assets/images/home-millions.png"
                    alt=""
                    data-src="https://nhaphonet.vn/wp-content/themes/nhaphonet/vendor-assets/images/home-millions.png"
                />
            </div>
            <div className="section__header">
                <div
                    className="home-properties__header-title"
                >
                    <h2 className="">
                        <span
                        >Nhà phố triệu đô</span
                        >
                    </h2>

                </div>
                {/* <div className="home-properties__nav">
                    <ul className="nav">
                        <li className="nav-item mr-1" role="presentation">
                            <button
                                className="nav-link home-properties__nav-link active"

                                type="button"

                            >
                                Nổi bật
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link js-button home-properties__nav-link"

                                type="button"

                            >
                                Mới nhất
                            </button>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div>
                <Swiper
                    pagination={{ clickable: true, dynamicBullets: true, }}
                    slidesPerView={4}
                    spaceBetween={20}
                    className="mySwiper"
                    style={{ height: '520px' }}
                >
                    {post?.listPosts?.length !== 0 ?
                        post?.listPosts.filter(postItem => postItem.price > 20000000000).map((postItem, i) => {
                            return (
                                <SwiperSlide key={i} >

                                    <article className="millions-card">
                                        <div className="millions-card__overlay"></div>
                                        {/* <a
                                            className="millions-card__link"
                                            href="https://nhaphonet.vn/tin-dang/ban-nha-mat-tien-khu-kinh-doanh-trung-tam-quan-1/"
                                            title={postItem.title}
                                        ></a> */}
                                        <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`}></Link>
                                        <figure className="millions-card__media">
                                            <img
                                                width="370"
                                                height="800"
                                                src={postItem.avatar ? postItem.avatar : 'no-photos.png'}
                                                className="thumbnail-component millions-card__media-image is-not-lazyload"
                                                alt=""
                                                decoding="async"
                                            />
                                        </figure>
                                        <div
                                            className="millions-card__info"
                                        >
                                            <h3 className="millions-card__title">
                                                {postItem.title}
                                            </h3>
                                            <div className="millions-card__if">
                                                <span style={{ marginRight: "1rem" }}>{FormatMoney(postItem.price)}</span>
                                                <span >{postItem.acreage} m<sup>2</sup></span>
                                            </div>
                                            <p className="millions-card__address">
                                                {postItem.province.name === 'Thành phố Hồ Chí Minh' ? getFullAddress('', postItem.ward, postItem.district, postItem.province).replace('Phường', "").replace('Xã', "").replace('Huyện', "").replace('Tỉnh', "").replace('Thành phố', "") : getFullAddress('', postItem.ward, postItem.district, postItem.province).replace('Phường', "").replace('Xã', "").replace('Quận', "").replace('Huyện', "").replace('Tỉnh', "").replace('Thành phố', "")}


                                            </p>
                                        </div>
                                    </article>



                                </SwiperSlide>

                            );
                        }) : <Empty description="Không có dữ liệu" />}

                </Swiper>
            </div>
        </div >
    </React.Fragment>

};

const mapStateToProps = state => {
    const { post } = state
    return { post };
}

const mapDispatchToProps = {

    getAllPosts: PostActions.getAllPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPostMillion);


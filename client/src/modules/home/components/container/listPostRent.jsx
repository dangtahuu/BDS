import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';
import { FormatMoney } from "../../../../helpers/formatCurrency"
import { getFullAddress } from '../../../../helpers/formatAddress';
import { slug } from '../../../../helpers/slug'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostActions } from "../../../post/redux/actions"

SwiperCore.use([EffectCoverflow, Pagination]);

const ListPostRent = (props) => {
    const { post } = props
    console.log(post);
    const [queryData, setQueryData] = useState({
        limit: 100,
        page: 1,
        status: 2,
    })
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])
    return (
        <div
            className="section home-properties"
        >

            <div className="section__header">
                <div
                    className="home-properties__header-title"
                >
                    <h2 className="" >
                        <span style={{ color: '#2a59c6' }}
                        >Tin cho thuê mới nhất</span
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
                    style={{ height: '420px' }}
                >
                    {post?.listPosts?.length !== 0 ?
                        post?.listPosts.filter(postItem => postItem.type === 2).map((postItem, i) => {
                            return (
                                <SwiperSlide key={i} >

                                    <article className="property-card">

                                        <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`}>
                                            <figure className="property-card__media">
                                                <img
                                                    width="370"
                                                    height="800"
                                                    src={postItem.avatar ? postItem.avatar : 'no-photos.png'}
                                                    className="thumbnail-component property-card__media-image is-not-lazyload"
                                                    alt=""
                                                    decoding="async"
                                                />
                                            </figure>
                                            <div
                                                className="property-card__info"
                                            >
                                                <h3 className="property-card__title" style={{ color: postItem.vipPoint ? postItem?.feeId?.colorText : {} }}>
                                                    <span>

                                                        {postItem.title}
                                                    </span>
                                                </h3>
                                                <p className="property-card__address">
                                                    {getFullAddress('', postItem.ward, postItem.district, postItem.province)}

                                                </p>
                                                <div className="property-card__if">
                                                    <span style={{ marginRight: "1rem" }}>{FormatMoney(postItem.price)} / tháng</span>
                                                    <span >{postItem.acreage} m<sup>2</sup></span>

                                                </div>
                                                <div className="property-card__footer">
                                                    <div className="property-card__time">
                                                        <span className='time'><i className='bx bx-history' style={{ marginRight: '5px', fontSize: '15px', color: 'red' }}></i> {moment(postItem.createdAt).fromNow()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>



                                </SwiperSlide>

                            );
                        }) : <Empty description="Không có dữ liệu" />}

                </Swiper>
            </div>
        </div >


    )
};

const mapStateToProps = state => {
    const { post } = state
    return { post };
}

const mapDispatchToProps = {

    getAllPosts: PostActions.getAllPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPostRent);


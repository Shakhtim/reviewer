import React from "react";
import { formatDate } from "../../scripts/utils.ts";
import commentAuthor from '../../../src/assets/img/author/author.webp';

const ReviewList = ({reviews}) => {
    return (
        <>
            <div className="vs-comments-wrap">
                <h2 className="blog-inner-title">Количество отзывов ({reviews.length})</h2>
                <ul className="comment-list">
                {reviews.map((review) => (
                    <li className="vs-comment-item" key={review._id}>
                    <div className="vs-post-comment">
                        <div className="comment-avater">
                        <img src={commentAuthor} alt="Comment Author"/>
                        </div>
                        <div className="comment-content">
                        <span className="commented-on">
                            <i className="fal fa-calendar-alt"></i> 
                        {formatDate(review.datePublished)}
                        </span>
                        <h4 className="name h4">{review.author}</h4>
                        <p className="text">{review.text}</p>
                        <div className="reply_and_edit">
                            {/* <a href="#" className="replay-btn">Reply <i className="fas fa-reply"></i></a> */}
                        </div>
                        </div>
                    </div>
                    </li>
                    ))}
                </ul>
                </div>
        </>
    )
}

export default ReviewList;